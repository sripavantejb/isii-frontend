const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  // Crop to the left emblem only (no institute text lockup on the right).
  const logoImage =
    variant === "light"
      ? "https://res.cloudinary.com/dqataciy5/image/upload/c_crop,w_586,h_546,x_0,y_0/v1769516565/Group_9_1_atvqck.png"
      : "https://res.cloudinary.com/dqataciy5/image/upload/c_crop,w_586,h_546,x_0,y_0/v1769516567/Group_8_1_moihuw.png";

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
