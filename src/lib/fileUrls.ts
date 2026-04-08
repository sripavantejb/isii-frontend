const S3_BUCKET_HOST = "isii-v2.s3.ap-south-1.amazonaws.com";
const PRESS_NEWS_S3_PREFIX = "news/";
const PRESS_NEWS_PUBLIC_PREFIX = "press-and-news/";

const isLocalHost = (hostname: string) =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "::1";

const shouldBypassMasking = () =>
  typeof window !== "undefined" && isLocalHost(window.location.hostname);

const getRuntimeOrigin = () => {
  if (typeof window === "undefined") {
    return "https://www.isii.global";
  }

  return window.location.origin;
};

const buildMaskedFileUrl = (path: string) =>
  `${getRuntimeOrigin()}/files/${path}`;

const getNormalizedS3Path = (value = "") => {
  if (!value) {
    return null;
  }

  try {
    const parsedUrl = new URL(value);

    if (parsedUrl.hostname !== S3_BUCKET_HOST) {
      return null;
    }

    return parsedUrl.pathname.replace(/^\/+/, "");
  } catch {
    return null;
  }
};

export const getMaskedFileUrl = (value = "") => {
  if (!value) {
    return value;
  }

  if (shouldBypassMasking()) {
    return value;
  }

  const normalizedPath = getNormalizedS3Path(value);

  if (!normalizedPath) {
    return value;
  }

  return buildMaskedFileUrl(normalizedPath);
};

export const getPressNewsMaskedFileUrl = (value = "") => {
  if (!value) {
    return value;
  }

  if (shouldBypassMasking()) {
    return value;
  }

  const normalizedPath = getNormalizedS3Path(value);

  if (!normalizedPath) {
    return value;
  }

  if (!normalizedPath.startsWith(PRESS_NEWS_S3_PREFIX)) {
    return buildMaskedFileUrl(normalizedPath);
  }

  const pressNewsPath = normalizedPath.replace(
    PRESS_NEWS_S3_PREFIX,
    PRESS_NEWS_PUBLIC_PREFIX
  );

  return buildMaskedFileUrl(pressNewsPath);
};
