from dataclasses import asdict

from django.http import HttpRequest, JsonResponse
from django.views.generic import View
from rest_framework.exceptions import ValidationError
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

from app.authentication.controllers import AuthenticationController


class SignInView(View):
    def post(self: "SignInView", request: HttpRequest) -> JsonResponse:
        try:
            user = AuthenticationController(request=request).sign_in()
        except ValidationError as exception:
            return JsonResponse(data=exception.detail, status=HTTP_400_BAD_REQUEST)

        if user:
            return JsonResponse(data=asdict(user), status=HTTP_200_OK)

        return JsonResponse(
            data={"detail": "Invalid credentials"},
            status=HTTP_401_UNAUTHORIZED,
        )
