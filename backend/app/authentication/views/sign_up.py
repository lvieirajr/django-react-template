from dataclasses import asdict

from django.http import HttpRequest, JsonResponse
from django.views.generic import View
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from app.authentication.controllers import AuthenticationController


class SignUpView(View):
    def post(self: "SignUpView", request: HttpRequest) -> JsonResponse:
        try:
            user = AuthenticationController(request=request).sign_up()
        except ValidationError as exception:
            return JsonResponse(data=exception.detail, status=HTTP_400_BAD_REQUEST)

        return JsonResponse(data=asdict(user), status=HTTP_201_CREATED)
