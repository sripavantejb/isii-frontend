const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  // Use the new logo images for header (dark variant) and footer (light variant)
  const logoImage = variant === "light" 
    ? "https://res.cloudinary.com/dqataciy5/image/upload/v1769516565/Group_9_1_atvqck.png"
    : "https://res.cloudinary.com/dqataciy5/image/upload/v1769516567/Group_8_1_moihuw.png";
  
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="ISII Logo" 
        className="h-12 object-contain"
      />
    </div>
  );
};

export default Logo;
