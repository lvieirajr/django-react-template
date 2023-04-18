from io import BytesIO
from typing import TYPE_CHECKING
from urllib.parse import quote

from boto3 import client as boto3_client
from boto3.exceptions import Boto3Error
from botocore.config import Config
from django.conf import settings
from loguru import logger

from app.common.integrations.s3.exceptions import (
    S3DownloadError,
    S3DownloadURLError,
    S3UploadError,
)

if TYPE_CHECKING:
    from mypy_boto3_s3.client import S3Client as S3ClientType


class S3Client:
    def __init__(self: "S3Client", *, client: "S3ClientType" | None = None) -> None:
        self._client = client or boto3_client(
            service_name="s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_DEFAULT_REGION,
            endpoint_url=settings.AWS_S3_ENDPOINT_URL or None,
            config=Config(s3={"addressing_style": "path"}, signature_version="s3v4"),
        )

    def upload_file(self: "S3Client", *, key: str, file_contents: bytes) -> None:
        with BytesIO(initial_bytes=file_contents) as buffer:
            try:
                self._client.upload_fileobj(
                    Bucket=settings.AWS_S3_BUCKET_NAME,
                    Key=key,
                    Fileobj=buffer,
                )
            except Boto3Error as exception:
                logger.bind(key=key, exception=str(exception)).error(
                    f"Error uploading file {key} to S3",
                )

                raise S3UploadError from None

    def download_file(self: "S3Client", *, key: str) -> bytes:
        with BytesIO() as buffer:
            try:
                self._client.download_fileobj(
                    Bucket=settings.AWS_S3_BUCKET_NAME,
                    Key=key,
                    Fileobj=buffer,
                )
            except Boto3Error as exception:
                logger.bind(key=key, exception=str(exception)).error(
                    f"Error downloading file {key} from S3",
                )

                raise S3DownloadError from None

            return buffer.getvalue()

    def get_download_url(
        self: "S3Client",
        *,
        key: str,
        name: str | None = None,
        expiration: int = 60,
        content_disposition: str = "attachment",
        content_type: str | None = None,
    ) -> str:
        params = {
            "Bucket": settings.AWS_S3_BUCKET_NAME,
            "Key": key,
            "ResponseContentDisposition": (
                f"{content_disposition}; filename={quote(name or key)}"
            ),
            "ResponseContentType": content_type,
        }

        try:
            return self._client.generate_presigned_url(
                ClientMethod="get_object",
                Params=params,
                ExpiresIn=expiration,
            )
        except Boto3Error as exception:
            logger.bind(key=key, exception=str(exception)).error(
                f"Error generating S3 download URL for file {key}",
            )

            raise S3DownloadURLError from None
