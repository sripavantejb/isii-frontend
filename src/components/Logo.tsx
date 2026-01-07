const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const logoImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767768459/Link_3_rh7ota.png";
  
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
