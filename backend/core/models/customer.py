from django.db import models

from django_react_template.models import BaseModel, BaseModelManager, BaseModelQuerySet


class CustomerQuerySet(BaseModelQuerySet):
    pass


class CustomerManager(BaseModelManager.from_queryset(CustomerQuerySet)):
    pass


class Customer(BaseModel):
    name = models.TextField(null=False, db_index=True, unique=True)

    auth0_id = models.TextField(null=False, db_index=True, unique=True)
    stripe_id = models.TextField(null=False, db_index=True, unique=True)

    objects = CustomerManager()

    class Meta:
        db_table = "customer"
        verbose_name = "Customer"
        verbose_name_plural = "Customers"
