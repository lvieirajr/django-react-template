class S3Error(Exception):
    pass


class S3UploadError(S3Error):
    pass


class S3DownloadError(S3Error):
    pass


class S3UploadURLError(S3Error):
    pass


class S3DownloadURLError(S3Error):
    pass
