const Label = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <label
      id={id}
      className={`text-sm font-medium text-[#333333] ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
