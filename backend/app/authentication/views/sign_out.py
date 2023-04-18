from django.http import HttpRequest, JsonResponse
from django.views.generic import View
from rest_framework.status import HTTP_200_OK

from app.authentication.controllers import AuthenticationController


class SignOutView(View):
    def post(self: "SignOutView", request: HttpRequest) -> JsonResponse:
        AuthenticationController(request=request).sign_out()
        return JsonResponse(data={}, status=HTTP_200_OK)
