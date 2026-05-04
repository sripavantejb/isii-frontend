# S3 Static Asset Migration

This project still has a small set of frontend-only images that fall back to Cloudinary.

After you upload them to the `isii-static` area in S3, set:

```env
VITE_STATIC_ASSET_BASE_URL=https://<your-bucket-or-cloudfront-domain>/isii-static
```

The frontend asset module at [src/lib/cloudinary.ts](./src/lib/cloudinary.ts) will then resolve to S3 automatically without more code changes.

## What We Verified

- API-fetched article/news image URLs are already mostly AWS-backed.
- Remaining Cloudinary usage is the static frontend image set plus metadata icons/images.
- `index.html` and `public/manifest.json` still need a manual follow-up because they cannot import the TypeScript asset module.

## Suggested S3 Structure

Use keys under the `isii-static` prefix like this:

```text
isii-static/
  static/
    about/
      context/
      mission/
      people/
    brand/
    experience/
    home/
    meta/
      icons/
      og/
    pivotal-thinking/
    shared/
    strategic-counsel/
      growth-and-prosperity/
      mandates/
      mobilising-transition/
      securing-sovereignty/
    systemic-intervention/
```

## Upload List

Set `VITE_STATIC_ASSET_BASE_URL` to the parent of the `static/` folder. Example:

```text
https://cdn.example.com/isii-static
```

Then upload these source images to the matching target keys:

| Asset key | Target S3 key | Current source URL |
| --- | --- | --- |
| `aboutGarryJacobs` | `static/about/people/garry-jacobs.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1768300215/2066_fsynfy.png` |
| `aboutKetanPatel` | `static/about/people/ketan-patel.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767874523/image_17_ib3vam.png` |
| `aboutJonMiller` | `static/about/people/jon-miller.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_20_jqhgll.png` |
| `aboutGlennGaffney` | `static/about/people/glenn-gaffney.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1768293957/Glenn_jogrhw.jpg` |
| `aboutShauryaDoval` | `static/about/people/shaurya-doval.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767874516/image_26_b0ilzr.png` |
| `contextCapital` | `static/about/context/capital.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770198768/Frame_1707483195_3_kausk6.png` |
| `contextGeopolitics` | `static/about/context/geopolitics.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770198726/Frame_1707483195_ae3e0x.png` |
| `contextGlobePrimary` | `static/about/context/globe-primary.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770386526/1925_v7zozq.png` |
| `contextGlobeSecondary` | `static/about/context/globe-secondary.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770386536/1926_q4rq4q.png` |
| `contextGlobeTertiary` | `static/about/context/globe-tertiary.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769084678/image_2_zfw9mn.png` |
| `contextTechnology` | `static/about/context/technology.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770198764/Frame_1707483195_2_mz7yjs.png` |
| `experienceGlobe` | `static/experience/atlas-thinking.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1768367927/Atlas_ThnikingPic_lypsyh.jpg` |
| `growthAndProsperityEarth` | `static/strategic-counsel/growth-and-prosperity/earth.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769086588/d192a568-c9df-4990-8b1b-c880eed01c20_ra0gc8.jpg` |
| `homeBanner` | `static/home/banner-desktop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1768294682/2_1_zagbfj.png` |
| `homeBannerMobile` | `static/home/banner-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1768320216/2_3_kzpn34.png` |
| `homeCapabilityIntervention` | `static/home/capability-intervention.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767762861/65e9eeed-8441-41e9-a7d6-2d19643f86be_x3kheg.jpg` |
| `homeCapabilityPivotalThinking` | `static/home/capability-pivotal-thinking.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767762856/835eebcd-2fca-4b77-810e-cd5ed443293a_zjmxv6.jpg` |
| `homeCapabilityStrategicCounsel` | `static/home/capability-strategic-counsel.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767769363/4_quwrrz.png` |
| `homeHeroDesktopLarge` | `static/home/hero-desktop-large.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372149/1920_aiorj9.png` |
| `homeHeroDesktopMedium` | `static/home/hero-desktop-medium.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372252/1440_1_qknuh7.png` |
| `homeHeroMobile` | `static/home/hero-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372262/Mobile_1_gbog00.png` |
| `homeHeroTablet` | `static/home/hero-tablet.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372260/Tab_1_diqfl3.png` |
| `logoDark` | `static/brand/logo-dark-crop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/c_crop,w_586,h_546,x_0,y_0/v1769516567/Group_8_1_moihuw.png` |
| `logoLight` | `static/brand/logo-light-crop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/c_crop,w_586,h_546,x_0,y_0/v1769516565/Group_9_1_atvqck.png` |
| `missionHeroDesktop` | `static/about/mission/hero-desktop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372479/Our_Mission_2_ag9sgv.png` |
| `missionHeroMobile` | `static/about/mission/hero-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770373042/3_2_ndtwij.png` |
| `mobilisingTransitionEarth` | `static/strategic-counsel/mobilising-transition/earth.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769086630/658a2ecd-cf61-4c81-9e08-49a6f6a16a0f_noyslt.jpg` |
| `participationIcon` | `static/shared/participation-icon.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767882344/Frame_1707483199_ywq4kx.png` |
| `peopleGlennGaffney` | `static/about/people/glenn-gaffney-profile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_18_a1swd8.png` |
| `perspectivesHeroDesktop` | `static/pivotal-thinking/hero-desktop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372554/Pivotal_Thinking_3_feszon.png` |
| `perspectivesHeroMobile` | `static/pivotal-thinking/hero-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770375937/Frame_1707483159_2_z3ycdd.png` |
| `securingSovereigntyEarth` | `static/strategic-counsel/securing-sovereignty/earth.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769086628/9d79d5d0-c58c-4ef0-9ea9-030fcc716cd6_er6gdv.jpg` |
| `strategicCounselHeroDesktop` | `static/strategic-counsel/hero-desktop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372589/Strategic_Counsel_8_ydkel5.png` |
| `strategicCounselHeroMobile` | `static/strategic-counsel/hero-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770375901/1921_t2dsja.png` |
| `strategicCounselMandateGrowth` | `static/strategic-counsel/mandates/growth.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767763191/45b069aa-f21e-4757-a97f-429e4850d21a_wggjd4.png` |
| `strategicCounselMandateMobilising` | `static/strategic-counsel/mandates/mobilising.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767763200/e83f258e-eafe-4cd0-ac50-c1b2ede86f8a_tjst81.png` |
| `strategicCounselMandateSovereignty` | `static/strategic-counsel/mandates/sovereignty.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769082442/5_1_qtrdmf.png` |
| `systemicInterventionCardFinancialInclusion` | `static/systemic-intervention/financial-inclusion.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1769153348/d6748c4d-3deb-467e-9c54-856f765c9fbc_qar1fs.jpg` |
| `systemicInterventionCardHumanPerformance` | `static/systemic-intervention/human-performance.jpg` | `https://res.cloudinary.com/dqataciy5/image/upload/v1767763690/7dc36b61-2f91-44de-a627-87adedcbe979_we1o4y.jpg` |
| `systemicInterventionHeroDesktop` | `static/systemic-intervention/hero-desktop.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372546/Systemic_Interventions_and_Investments_3_xejyih.png` |
| `systemicInterventionHeroMobile` | `static/systemic-intervention/hero-mobile.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770375856/1922_evdf29.png` |
| `metaImage` | `static/meta/og/og-image.png` | `https://res.cloudinary.com/dqataciy5/image/upload/v1770372759/01002A_lpzwc4.png` |
| `shortcutIcon` | `static/meta/icons/shortcut-icon.png` | `https://res.cloudinary.com/dja7l3iq8/image/upload/v1770873331/Screenshot_2026-02-11_183122_hwu2qj.png` |
| `favicon180` | `static/meta/icons/favicon-180.png` | `https://res.cloudinary.com/dja7l3iq8/image/upload/c_fill,g_center,w_180,h_180/v1770873331/Screenshot_2026-02-11_183122_hwu2qj.png` |
| `manifest192` | `static/meta/icons/manifest-192.png` | `https://res.cloudinary.com/dja7l3iq8/image/upload/c_fill,g_center,w_192,h_192/v1770873331/Screenshot_2026-02-11_183122_hwu2qj.png` |
| `manifest512` | `static/meta/icons/manifest-512.png` | `https://res.cloudinary.com/dja7l3iq8/image/upload/c_fill,g_center,w_512,h_512/v1770873331/Screenshot_2026-02-11_183122_hwu2qj.png` |

## Important Checks So We Do Not Miss Anything

1. The `logoDark`, `logoLight`, `favicon180`, `manifest192`, and `manifest512` assets are transformed Cloudinary outputs.
   Upload the already-transformed image files to S3, not the original raw source, otherwise the look will change.

2. `index.html` and `public/manifest.json` still point directly at Cloudinary today.
   After upload, update those files manually to the new S3 or CloudFront URLs for:
   - `metaImage`
   - `shortcutIcon`
   - `favicon180`
   - `manifest192`
   - `manifest512`

3. Keep the `static/...` filenames exactly as listed unless you also update `src/lib/cloudinary.ts`.

4. After upload, test:
   - home hero images on desktop, tablet, and mobile
   - logo in both light and dark variants
   - strategic counsel banners/cards
   - systemic intervention hero and cards
   - OG image, favicon, and manifest icons
