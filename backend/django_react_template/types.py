from django.db.models import TextChoices


class Environment(TextChoices):
    DEVELOPMENT = "development"
    TEST = "test"
    CI = "ci"
    STAGING = "staging"
    PRODUCTION = "production"


class Plans(TextChoices):
    FREE = "free"
    BASIC = "basic"
    BUSINESS = "business"
    ENTERPRISE = "enterprise"
