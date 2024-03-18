from django.urls import include, path
from django.views.generic.base import TemplateView


urlpatterns = [
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
    ),
    path(
        "health/",
        include("health_check.urls"),
    ),
]
