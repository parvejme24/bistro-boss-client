import React from "react";

const Avatar = ({ 
  user, 
  size = "md", 
  className = "", 
  showBorder = true,
  borderColor = "border-red-600"
}) => {
  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-sm", 
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  // Get user initials
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Get user image
  const userImage = user?.photoURL || user?.image;

  if (userImage) {
    return (
      <img
        src={userImage}
        alt={`${user?.name || user?.displayName || 'User'} Avatar`}
        className={`${sizeClasses[size]} rounded-full object-cover ${showBorder ? `border-2 ${borderColor}` : ''} ${className}`}
      />
    );
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-red-600 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold 
        ${showBorder ? `border-2 ${borderColor}` : ''} 
        ${className}
      `}
    >
      {getInitials()}
    </div>
  );
};

export default Avatar;

