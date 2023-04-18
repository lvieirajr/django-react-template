from typing import Callable
from uuid import uuid4

from rest_framework.request import Request
from rest_framework.response import Response


class RequestIDMiddleware:
    def __init__(
        self: "RequestIDMiddleware",
        get_response: Callable[[Request], Response],
    ) -> None:
        self.get_response = get_response

    def __call__(self: "RequestIDMiddleware", request: Request) -> Response:
        request.META["HTTP_X_REQUEST_ID"] = str(uuid4())

        response = self.get_response(request)

        response["X-Request-ID"] = request.META["HTTP_X_REQUEST_ID"]

        return response
