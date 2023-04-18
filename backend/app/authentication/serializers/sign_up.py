from rest_framework import serializers


class SignUpSerializer(serializers.Serializer):  # type: ignore [type-arg]
    name = serializers.CharField(write_only=True, min_length=1)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
