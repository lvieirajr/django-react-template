from django.urls import include, re_path

urlpatterns = [
    re_path(
        route=r"^authentication/",
        view=include(
            ("app.authentication.urls", "authentication"),
            namespace="authentication",
        ),
        name="authentication",
    ),
    re_path(
        route="^",
        view=include(
            ("app.common.urls", "common"),
            namespace="common",
        ),
        name="common",
    ),
]
