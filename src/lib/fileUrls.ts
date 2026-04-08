const S3_BUCKET_HOST = "isii-v2.s3.ap-south-1.amazonaws.com";

const isLocalHost = (hostname: string) =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "::1";

const getRuntimeOrigin = () => {
  if (typeof window === "undefined") {
    return "https://www.isii.global";
  }

  return window.location.origin;
};

export const getMaskedFileUrl = (value = "") => {
  if (!value) {
    return value;
  }

  try {
    const parsedUrl = new URL(value);

    if (parsedUrl.hostname !== S3_BUCKET_HOST) {
      return value;
    }

    if (
      typeof window !== "undefined" &&
      isLocalHost(window.location.hostname)
    ) {
      return value;
    }

    const normalizedPath = parsedUrl.pathname.replace(/^\/+/, "");
    return `${getRuntimeOrigin()}/files/${normalizedPath}`;
  } catch (error) {
    return value;
  }
};

