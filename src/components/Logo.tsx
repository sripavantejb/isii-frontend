import { STATIC_IMAGES } from "@/lib/staticAssets";

const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  // Crop to the left emblem only (no institute text lockup on the right).
  const logoImage =
    variant === "light"
      ? STATIC_IMAGES.logoLight
      : STATIC_IMAGES.logoDark;

  return (
    <div className="flex items-center">
      <img
        src={logoImage}
        alt="ISII Logo"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
