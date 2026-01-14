const CommentLoadingState = () => {
  return (
    <div className="w-full space-y-4 p-4">
      {/* Chat Header Skeleton */}
      <div className="border-b pb-4">
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Chat Messages Container */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Admin Message 1 - Left aligned */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Employee Message - Right aligned */}
        <div className="flex items-start gap-3 justify-end">
          <div className="flex-1 space-y-2 text-right">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse ml-auto"></div>
            <div className="h-12 w-full bg-orange-100 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse ml-auto"></div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
        </div>

        {/* Admin Message 2 - Left aligned */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Employee Message 2 - Right aligned */}
        <div className="flex items-start gap-3 justify-end">
          <div className="flex-1 space-y-2 text-right">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse ml-auto"></div>
            <div className="h-10 w-2/3 bg-orange-100 rounded animate-pulse ml-auto"></div>
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse ml-auto"></div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
        </div>
      </div>

      {/* Input Field Skeleton */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentLoadingState;
