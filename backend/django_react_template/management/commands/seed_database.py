from django.core.management import BaseCommand
from django_extensions.management.utils import signalcommand
from structlog import get_logger


class Command(BaseCommand):
    help = "Seeds the database with initial data"
    logger = get_logger("seed_database")

    @signalcommand
    def handle(self, *args, **options):
        pass
