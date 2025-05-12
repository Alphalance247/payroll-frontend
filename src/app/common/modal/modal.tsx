const ModalOverlay = ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    return (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-50 m-auto">
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
  