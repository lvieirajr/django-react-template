from rest_framework import serializers


class SignInSerializer(serializers.Serializer):  # type: ignore [type-arg]
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
