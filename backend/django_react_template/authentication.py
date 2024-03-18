from functools import cached_property

from rest_framework_simplejwt.tokens import AccessToken as SimpleJWTAccessToken
from rest_framework_simplejwt.authentication import TokenUser as SimpleJWTTokenUser


class AccessToken(SimpleJWTAccessToken):
    def verify(self: "AccessToken") -> None:
        return self.check_exp()


class TokenUser(SimpleJWTTokenUser):
    @cached_property
    def email(self: "TokenUser") -> str:
        return self.token.get("email", "")

    @cached_property
    def name(self: "TokenUser") -> str:
        return self.token.get("name", "")
