const DEFAULT_STATIC_ASSET_BASE_URL =
  "https://d1gbpolz5fkmu.cloudfront.net/files/isii-static";

const STATIC_ASSET_BASE_URL = (
  import.meta.env.VITE_STATIC_ASSET_BASE_URL || DEFAULT_STATIC_ASSET_BASE_URL
).replace(/\/+$/, "");

const buildStaticAssetUrl = (path: string) =>
  `${STATIC_ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;

const STATIC_ASSET_PATHS = {
  aboutGarryJacobs: "static/about/people/garry-jacobs.png",
  aboutKetanPatel: "static/about/people/ketan-patel.png",
  aboutJonMiller: "static/about/people/jon-miller.png",
  aboutGlennGaffney: "static/about/people/glenn-gaffney.png",
  aboutShauryaDoval: "static/about/people/shaurya-doval.png",
  contextCapital: "static/about/context/capital.png",
  contextGeopolitics: "static/about/context/geopolitics.png",
  contextGlobePrimary: "static/about/context/globe-primary.png",
  contextGlobeSecondary: "static/about/context/globe-secondary.png",
  contextGlobeTertiary: "static/about/context/globe-tertiary.png",
  contextTechnology: "static/about/context/technology.png",
  experienceGlobe: "static/experience/atlas-thinking.jpg",
  growthAndProsperityEarth:
    "static/strategic-counsel/growth-and-prosperity/earth.jpg",
  homeBanner: "static/home/banner-desktop.png",
  homeBannerMobile: "static/home/banner-mobile.png",
  homeCapabilityIntervention: "static/home/capability-intervention.jpg",
  homeCapabilityPivotalThinking:
    "static/home/capability-pivotal-thinking.jpg",
  homeCapabilityStrategicCounsel:
    "static/home/capability-strategic-counsel.png",
  homeHeroDesktopLarge: "static/home/hero-desktop-large.png",
  homeHeroDesktopMedium: "static/home/hero-desktop-medium.png",
  homeHeroMobile: "static/home/hero-mobile.png",
  homeHeroTablet: "static/home/hero-tablet.png",
  logoDark: "static/brand/logo-dark-crop.png",
  logoLight: "static/brand/logo-light-crop.png",
  missionHeroDesktop: "static/about/mission/hero-desktop.png",
  missionHeroMobile: "static/about/mission/hero-mobile.png",
  mobilisingTransitionEarth:
    "static/strategic-counsel/mobilising-transition/earth.jpg",
  participationIcon: "static/shared/participation-icon.png",
  peopleGlennGaffney: "static/about/people/glenn-gaffney-profile.png",
  perspectivesHeroDesktop: "static/pivotal-thinking/hero-desktop.png",
  perspectivesHeroMobile: "static/pivotal-thinking/hero-mobile.png",
  securingSovereigntyEarth:
    "static/strategic-counsel/securing-sovereignty/earth.jpg",
  strategicCounselHeroDesktop: "static/strategic-counsel/hero-desktop.png",
  strategicCounselHeroMobile: "static/strategic-counsel/hero-mobile.png",
  strategicCounselMandateGrowth:
    "static/strategic-counsel/mandates/growth.png",
  strategicCounselMandateMobilising:
    "static/strategic-counsel/mandates/mobilising.png",
  strategicCounselMandateSovereignty:
    "static/strategic-counsel/mandates/sovereignty.png",
  systemicInterventionCardFinancialInclusion:
    "static/systemic-intervention/financial-inclusion.jpg",
  systemicInterventionCardHumanPerformance:
    "static/systemic-intervention/human-performance.jpg",
  systemicInterventionHeroDesktop: "static/systemic-intervention/hero-desktop.png",
  systemicInterventionHeroMobile: "static/systemic-intervention/hero-mobile.png",
} as const;

const STATIC_META_PATHS = {
  favicon180: "static/meta/icons/favicon-180.png",
  manifest192: "static/meta/icons/manifest-192.png",
  manifest512: "static/meta/icons/manifest-512.png",
  metaImage: "static/meta/og/og-image.png",
  shortcutIcon: "static/meta/icons/shortcut-icon.png",
} as const;

const buildAssetMap = <T extends Record<string, string>>(paths: T) =>
  Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, buildStaticAssetUrl(value)]),
  ) as { [K in keyof T]: string };

export const STATIC_IMAGES = buildAssetMap(STATIC_ASSET_PATHS);
export const STATIC_META_IMAGES = buildAssetMap(STATIC_META_PATHS);

export {
  STATIC_ASSET_BASE_URL,
  STATIC_ASSET_PATHS,
  STATIC_META_PATHS,
  buildStaticAssetUrl,
};
