from time import time
from typing import Callable

from ipware import get_client_ip
from loguru import logger
from rest_framework.request import Request
from rest_framework.response import Response


class LoggingMiddleware:
    def __init__(
        self: "LoggingMiddleware",
        get_response: Callable[[Request], Response],
    ) -> None:
        self.get_response = get_response

    def __call__(self: "LoggingMiddleware", request: Request) -> Response:
        request_id = request.META["HTTP_X_REQUEST_ID"]

        with logger.contextualize(request_id=request_id):
            request_start_time = time()
            ip, _ = get_client_ip(request)

            logger.bind(
                method=request.method,
                path=request.path,
                ip=ip,
                request_id=request_id,
            ).info(f"Request {request_id}: {request.method} {request.path}")

            response = self.get_response(request)

            logger.bind(
                method=request.method,
                path=request.path,
                ip=ip,
                request_id=request_id,
                duration=round(time() - request_start_time, 3),
            ).info(
                f"Response {request_id}: "
                f"{request.method} {request.path} {response.status_code}",
            )

        return response
