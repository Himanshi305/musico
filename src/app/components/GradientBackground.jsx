export default function GradientBackground({ 
  variant = "default", 
  dynamicColor = null,
  children, 
  className = "" 
}) {
  const variants = {
    default: {
      gradient: "bg-gradient-to-br from-black via-red-700 to-black"
    },
    minimal: {
      gradient: "bg-gradient-to-br from-black via-red-900 to-black"
    },
    intense: {
      gradient: "bg-gradient-to-br from-black via-red-600 to-black"
    }
  };

  // Dynamic color gradients
  const dynamicGradients = {
    red: "bg-gradient-to-br from-black via-red-700 to-black",
    pink: "bg-gradient-to-br from-black via-pink-700 to-black",
    purple: "bg-gradient-to-br from-black via-purple-700 to-black",
    blue: "bg-gradient-to-br from-black via-blue-700 to-black",
    green: "bg-gradient-to-br from-black via-green-700 to-black",
    yellow: "bg-gradient-to-br from-black via-yellow-700 to-black",
    orange: "bg-gradient-to-br from-black via-orange-700 to-black",
    cyan: "bg-gradient-to-br from-black via-cyan-700 to-black"
  };

  // Use dynamic color if provided, otherwise use variant
  const gradient = dynamicColor && dynamicGradients[dynamicColor] 
    ? dynamicGradients[dynamicColor] 
    : (variants[variant] || variants.default).gradient;

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Gradient Background Layer */}
      <div className={`absolute inset-0 transition-all duration-500 ${gradient}`}></div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}