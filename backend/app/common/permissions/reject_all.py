from typing import TYPE_CHECKING

from rest_framework.permissions import BasePermission
from rest_framework.request import Request

if TYPE_CHECKING:
    from rest_framework.views import APIView


class RejectAll(BasePermission):
    def has_permission(self: "RejectAll", request: Request, view: "APIView") -> bool:
        return False
