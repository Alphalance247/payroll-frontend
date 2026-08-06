interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({
  message = "Loading...",
  className = "",
}: LoadingStateProps) => {
  return (
    <div
      className={`flex items-center justify-center py-20 ${className}`}
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E37915]" />
        <p className="mt-4 text-sm text-[#71717A]">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
