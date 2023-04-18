from django.urls import re_path

from app.common.views import GetCSRFView

urlpatterns = [
    re_path(route=r"^csrf/?$", view=GetCSRFView.as_view(), name="csrf"),
]
