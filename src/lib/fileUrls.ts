const CLOUDFRONT_BASE_URL = "https://www.isii.global";
const MASKED_FILE_PREFIXES = new Set(["files", "dev", "staging"]);

const S3_HOST_TO_PREFIX: Record<string, string> = {
  "isii-v2.s3.ap-south-1.amazonaws.com": "files",
  "isii-dev.s3.ap-south-1.amazonaws.com": "dev",
  "isii-staging.s3.ap-south-1.amazonaws.com": "staging",
};

const buildMaskedFileUrl = (prefix: string, path: string) =>
  `${CLOUDFRONT_BASE_URL}/${prefix}/${path}`;

const getPathPrefixForMaskedUrl = (value = "") => {
  try {
    const parsedUrl = new URL(value);

    if (parsedUrl.origin !== CLOUDFRONT_BASE_URL) {
      return null;
    }

    const [prefix] = parsedUrl.pathname.replace(/^\/+/, "").split("/");
    return prefix && MASKED_FILE_PREFIXES.has(prefix) ? prefix : null;
  } catch {
    return null;
  }
};

const isAlreadyMaskedFileUrl = (value = "") => {
  return Boolean(getPathPrefixForMaskedUrl(value));
};

const getNormalizedS3Path = (value = "") => {
  if (!value) {
    return null;
  }

  try {
    const parsedUrl = new URL(value);
    const prefix = S3_HOST_TO_PREFIX[parsedUrl.hostname];

    if (!prefix) {
      return null;
    }

    return {
      prefix,
      path: parsedUrl.pathname.replace(/^\/+/, ""),
    };
  } catch {
    return null;
  }
};

export const getMaskedFileUrl = (value = "") => {
  if (!value) {
    return value;
  }

  if (isAlreadyMaskedFileUrl(value)) {
    return value;
  }

  const normalizedS3Url = getNormalizedS3Path(value);

  if (!normalizedS3Url) {
    return value;
  }

  return buildMaskedFileUrl(normalizedS3Url.prefix, normalizedS3Url.path);
};
