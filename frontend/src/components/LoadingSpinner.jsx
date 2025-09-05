const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200`}>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
