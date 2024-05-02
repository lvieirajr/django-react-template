from django.db import models

from django_react_template.models import BaseModel, BaseModelManager, BaseModelQuerySet


class OrganizationQuerySet(BaseModelQuerySet):
    pass


class OrganizationManager(BaseModelManager.from_queryset(OrganizationQuerySet)):
    pass


class Organization(BaseModel):
    name = models.TextField(null=False, db_index=True, unique=True)

    auth0_id = models.TextField(null=False, db_index=True, unique=True)
    stripe_id = models.TextField(null=False, db_index=True, unique=True)

    objects = OrganizationManager()

    class Meta:
        db_table = "organization"
        verbose_name = "Organization"
        verbose_name_plural = "Organizations"
