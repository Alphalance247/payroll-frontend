const SideDrawer = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed top-0 right-0 w-full h-full z-50 flex flex-col items-end`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>
      {children}
    </div>
  );
};

export default SideDrawer;
