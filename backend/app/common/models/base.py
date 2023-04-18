from uuid import uuid4

from django.db import models
from django_extensions.db.models import TimeStampedModel


class BaseQuerySet(models.QuerySet["BaseModel"]):
    def ids(self: "BaseQuerySet") -> "BaseQuerySet":
        return self.values_list("id", flat=True)  # type: ignore [no-any-return]


class BaseManager(models.Manager.from_queryset(BaseQuerySet)):  # type: ignore [misc]
    pass


class BaseModel(TimeStampedModel):  # type: ignore [misc]
    id = models.UUIDField(
        verbose_name="ID",
        primary_key=True,
        default=uuid4,
        blank=False,
        null=False,
        db_index=True,
        unique=True,
        serialize=False,
        editable=False,
    )

    objects = BaseManager()

    class Meta:
        abstract = True
