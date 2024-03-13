from typing import List, Union
from uuid import UUID, uuid4

from django.db import models
from django_extensions.db.fields import CreationDateTimeField, ModificationDateTimeField
from django_extensions.db.models import TimeStampedModel


class BaseModelQuerySet(models.QuerySet["BaseModel"]):
    def retrieve(
        self: "BaseModelQuerySet",
        obj: Union["BaseModel", UUID, str],
    ) -> "BaseModel":
        return self.get(id=self._to_uuid(obj))

    def list(
        self: "BaseModelQuerySet",
        objs: List[Union["BaseModel", UUID, str]],
    ) -> "BaseModelQuerySet":
        return self.filter(id__in=self._to_uuid_list(objs))

    def ids(self: "BaseModelQuerySet") -> models.query.ModelIterable:
        return self.values_list("id", flat=True)

    def _to_uuid(
        self: "BaseModelQuerySet",
        obj: Union["BaseModel", UUID, str],
    ) -> UUID:
        return obj.id if isinstance(obj, BaseModel) else UUID(str(obj))

    def _to_uuid_list(
        self: "BaseModelQuerySet",
        objs: List[Union["BaseModel", UUID, str]],
    ) -> List[UUID]:
        return [self._to_uuid(obj) for obj in objs]


class BaseModelManager(models.Manager.from_queryset(BaseModelQuerySet)):
    pass


class BaseModel(TimeStampedModel):
    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid4,
        db_index=True,
        unique=True,
    )

    created = CreationDateTimeField(null=False, db_index=True)
    modified = ModificationDateTimeField(null=False, db_index=True)

    objects = BaseModelManager()

    class Meta:
        abstract = True

    def __repr__(self: "BaseModel") -> str:
        return f"{type(self).__name__}(id='{str(self.id)}')"

    def __str__(self: "BaseModel") -> str:
        return repr(self)
