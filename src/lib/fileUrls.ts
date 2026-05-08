const DEFAULT_PUBLIC_FILES_BASE_URL = "https://www.isii.global/files";
const PUBLIC_FILES_BASE_URL =
  import.meta.env.VITE_PUBLIC_FILES_BASE_URL || DEFAULT_PUBLIC_FILES_BASE_URL;
const PUBLIC_FILES_ORIGIN = (() => {
  try {
    return new URL(PUBLIC_FILES_BASE_URL).origin;
  } catch {
    return "https://www.isii.global";
  }
})();
const PUBLIC_FILES_BASE_PATH = (() => {
  try {
    const normalizedPath = new URL(PUBLIC_FILES_BASE_URL).pathname.replace(/\/+$/, "");
    return normalizedPath || "/files";
  } catch {
    return "/files";
  }
})();
const MASKED_FILE_PREFIXES = new Set(["files", "dev", "staging", "prod"]);

const LEGACY_S3_HOST_TO_PREFIX: Record<string, string> = {
  "isii-v2.s3.ap-south-1.amazonaws.com": "files",
  "isii-dev.s3.ap-south-1.amazonaws.com": "dev",
  "isii-staging.s3.ap-south-1.amazonaws.com": "staging",
};

const NEW_RAW_S3_PREFIX = "https://s3.ap-south-2.amazonaws.com/www.isii.global/";

const buildMaskedFileUrl = (path: string) =>
  `${PUBLIC_FILES_BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

const getPathPrefixForMaskedUrl = (value = "") => {
  try {
    const parsedUrl = new URL(value);

    if (parsedUrl.origin !== PUBLIC_FILES_ORIGIN) {
      return null;
    }

    const normalizedBasePath = PUBLIC_FILES_BASE_PATH.replace(/^\/+/, "");
    const normalizedPath = parsedUrl.pathname.replace(/^\/+/, "");

    if (!normalizedPath.startsWith(normalizedBasePath)) {
      return null;
    }

    const relativePath = normalizedPath.slice(normalizedBasePath.length).replace(/^\/+/, "");
    const [prefix] = relativePath.split("/");
    return prefix && MASKED_FILE_PREFIXES.has(prefix) ? prefix : null;
  } catch {
    return null;
  }
};

const isAlreadyMaskedFileUrl = (value = "") => {
  return Boolean(getPathPrefixForMaskedUrl(value));
};

const normalizePrefixedPath = (value = "") => {
  if (!value) {
    return null;
  }

  if (value.startsWith("prod/")) {
    return value.slice("prod/".length);
  }

  if (value.startsWith("staging/")) {
    return value;
  }

  if (value.startsWith("dev/")) {
    return value;
  }

  return `prod/${value}`;
};

const getNormalizedS3Path = (value = "") => {
  if (!value) {
    return null;
  }

  if (value.startsWith(NEW_RAW_S3_PREFIX)) {
    const relativePath = value.slice(NEW_RAW_S3_PREFIX.length);
    return normalizePrefixedPath(relativePath);
  }

  try {
    const parsedUrl = new URL(value);
    const prefix = LEGACY_S3_HOST_TO_PREFIX[parsedUrl.hostname];

    if (!prefix) {
      return null;
    }

    const normalizedPath = parsedUrl.pathname.replace(/^\/+/, "");

    if (prefix === "files") {
      return normalizePrefixedPath(normalizedPath);
    }

    return `${prefix}/${normalizedPath}`;
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

  const normalizedPath = getNormalizedS3Path(value);

  if (!normalizedPath) {
    return value;
  }

  return buildMaskedFileUrl(normalizedPath);
};
