from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView


class GetCSRFView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self: "GetCSRFView", request: Request) -> Response:
        csrf_token = get_token(request)

        return Response(
            data={"csrf_token": csrf_token},
            headers={"X-CSRFToken": csrf_token},
            status=HTTP_200_OK,
        )
