from json import JSONDecodeError, loads

from django.contrib.auth import login, logout
from django.db.utils import IntegrityError
from django.http import HttpRequest
from rest_framework.exceptions import ValidationError

from app.authentication.dto import UserDTO
from app.authentication.models import User
from app.authentication.serializers import SignInSerializer, SignUpSerializer


class AuthenticationController:
    def __init__(self: "AuthenticationController", *, request: HttpRequest) -> None:
        self._request = request

        try:
            self._data = loads(request.body)
        except JSONDecodeError:
            self._data = {}

    def sign_up(self: "AuthenticationController") -> UserDTO:
        serializer = SignUpSerializer(data=self._data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user = User(name=data["name"], email=data["email"].lower())
        user.set_password(raw_password=data["password"])

        try:
            user.save()
        except IntegrityError as exception:
            if "key (email)" in str(exception).lower():
                raise ValidationError(
                    {"email": ["This email is already in use"]},
                ) from None

        login(self._request, user=user)

        return user.to_dto()

    def sign_in(self: "AuthenticationController") -> UserDTO | None:
        serializer = SignInSerializer(data=self._data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            user = User.objects.get(email=data["email"].lower())
        except User.DoesNotExist:
            user = None

        if user and user.check_password(raw_password=data["password"]):
            login(request=self._request, user=user)
            return user.to_dto()

        return None

    def sign_out(self: "AuthenticationController") -> None:
        logout(self._request)
        return None
