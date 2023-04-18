from django.urls import re_path

from app.authentication.views import (
    SignInView,
    SignOutView,
    SignUpView,
    WhoAmIView,
)

urlpatterns = [
    re_path(route=r"^sign-in/?$", view=SignInView.as_view(), name="sign-in"),
    re_path(route=r"^sign-out/?$", view=SignOutView.as_view(), name="sign-out"),
    re_path(route=r"^sign-up/?$", view=SignUpView.as_view(), name="sign-up"),
    re_path(route=r"^whoami/?$", view=WhoAmIView.as_view(), name="whoami"),
]
