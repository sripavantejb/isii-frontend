const DEFAULT_PUBLIC_FILES_BASE_URL = "https://www.isii.global/files";
const PUBLIC_FILES_BASE_URL =
  import.meta.env.VITE_PUBLIC_FILES_BASE_URL || DEFAULT_PUBLIC_FILES_BASE_URL;

const PUBLIC_FILES_BASE_PATH = (() => {
  try {
    const normalizedPath = new URL(PUBLIC_FILES_BASE_URL).pathname.replace(/\/+$/, "");
    return normalizedPath || "/files";
  } catch {
    return "/files";
  }
})();

// Legacy env folders from the old single-bucket layout (www.isii.global/<env>/...).
// The buckets are now segregated (isii-files-<env>) with content at the root, so any
// stored URL that still carries one of these leading folders must have it stripped.
const LEGACY_ENV_PREFIXES = ["dev/", "staging/", "prod/"];

const trimLeadingSlashes = (value: string) => value.replace(/^\/+/, "");

const stripLegacyEnvPrefix = (key: string) => {
  const cleaned = trimLeadingSlashes(key);
  for (const prefix of LEGACY_ENV_PREFIXES) {
    if (cleaned.startsWith(prefix)) {
      return cleaned.slice(prefix.length);
    }
  }
  return cleaned;
};

const buildMaskedFileUrl = (key: string) =>
  `${PUBLIC_FILES_BASE_URL.replace(/\/+$/, "")}/${trimLeadingSlashes(key)}`;

// Detects an already-masked "/files/..." URL on ANY host (the current env distribution
// or an older one) and returns the object key after the base path. Returns null otherwise.
const getKeyFromMaskedUrl = (value: string): string | null => {
  try {
    const parsed = new URL(value);
    const basePath = trimLeadingSlashes(PUBLIC_FILES_BASE_PATH);
    const path = trimLeadingSlashes(parsed.pathname);

    if (path === basePath) return "";
    if (path.startsWith(`${basePath}/`)) {
      return path.slice(basePath.length + 1);
    }
    return null;
  } catch {
    return null;
  }
};

// Detects a raw S3 URL (path-style or virtual-hosted) and returns the object key.
//   path-style:      https://s3.<region>.amazonaws.com/<bucket>/<key>
//   virtual-hosted:  https://<bucket>.s3.<region>.amazonaws.com/<key>
const getKeyFromRawS3Url = (value: string): string | null => {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  const host = parsed.hostname;
  const path = trimLeadingSlashes(parsed.pathname);

  // path-style: first path segment is the bucket, drop it.
  if (/^s3([.-][a-z0-9-]+)?\.amazonaws\.com$/.test(host)) {
    const slash = path.indexOf("/");
    return slash === -1 ? null : path.slice(slash + 1);
  }

  // virtual-hosted: bucket is in the host, the whole path is the key.
  if (/\.s3([.-][a-z0-9-]+)?\.amazonaws\.com$/.test(host)) {
    return path;
  }

  return null;
};

/**
 * Normalizes any stored file URL to the current environment's masked CloudFront URL.
 *
 * Handles, in order:
 *  1. Already-masked "/files/..." URLs (any distribution) → re-point onto the current
 *     env distribution and drop any leftover dev/ staging/ prod/ folder.
 *  2. Raw S3 URLs (old shared bucket or new per-env bucket) → extract the object key,
 *     drop any legacy env folder, and mask onto the current distribution.
 *  3. Anything else (external links, already-correct URLs, relative paths) → unchanged.
 */
export const getMaskedFileUrl = (value = "") => {
  if (!value) return value;

  const maskedKey = getKeyFromMaskedUrl(value);
  if (maskedKey !== null) {
    return buildMaskedFileUrl(stripLegacyEnvPrefix(maskedKey));
  }

  const s3Key = getKeyFromRawS3Url(value);
  if (s3Key !== null) {
    return buildMaskedFileUrl(stripLegacyEnvPrefix(s3Key));
  }

  return value;
};
