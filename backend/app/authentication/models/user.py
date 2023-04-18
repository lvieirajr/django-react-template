from dataclasses import fields

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

from app.authentication.dto import UserDTO
from app.common.models import BaseManager, BaseModel
from app.constants import DEFAULT_ORDER_BY


class UserManager(BaseUserManager["User"], BaseManager):
    pass


class User(AbstractBaseUser, BaseModel):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    email = models.EmailField(
        blank=False,
        null=False,
        db_index=True,
        unique=True,
    )

    name = models.TextField(
        blank=False,
        null=False,
        db_index=True,
    )

    is_active = models.BooleanField(
        blank=False,
        null=False,
        default=True,
        db_index=True,
    )

    is_staff = models.BooleanField(
        blank=False,
        null=False,
        default=False,
        db_index=True,
    )

    objects = UserManager()

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = [DEFAULT_ORDER_BY]

    def __repr__(self: "User") -> str:
        return str(self)

    def __str__(self: "User") -> str:
        return f"User(id={self.id}, email={self.email} name={self.name})"

    def to_dto(self) -> UserDTO:
        return UserDTO(
            **{field.name: getattr(self, field.name) for field in fields(UserDTO)},
        )
