const ModalOverlay = ({
  children,
  onClose,
  centeredClassName = true,
  className,
}: {
  children: React.ReactNode;
  onClose: () => void;
  centeredClassName?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh]  z-50 m-auto ${
        centeredClassName ? "flex items-center justify-center" : className
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>
      {children}
    </div>
  );
};

export default ModalOverlay;
