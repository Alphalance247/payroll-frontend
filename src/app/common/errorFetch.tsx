import Button from "./Button";

const ErrorFetch = ({
  onRefetch,
  smallWindow = false,
  message,
}: {
  onRefetch: () => void;
  smallWindow?: boolean;
  message: string;
}) => {
  return (
    <div
      className={`flex justify-center items-center flex-col ${
        smallWindow ? "py-10" : " h-full"
      }`}
    >
      <p className="text-center text-gray-500 mt-4 flex content-center">
        {message}
      </p>

      <Button
        className="flex items-center gap-x-1 mt-4"
        onButtonClick={onRefetch}
      >
        Retry
      </Button>
    </div>
  );
};

export default ErrorFetch;
