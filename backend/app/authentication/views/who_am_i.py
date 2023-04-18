from dataclasses import asdict

from django.http import HttpRequest, JsonResponse
from django.views.generic import View
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED


class WhoAmIView(View):
    def get(self: "WhoAmIView", request: HttpRequest) -> JsonResponse:
        if request.user.is_authenticated:
            return JsonResponse(data=asdict(request.user.to_dto()), status=HTTP_200_OK)

        return JsonResponse(
            data={"detail": "Invalid session"},
            status=HTTP_401_UNAUTHORIZED,
        )
