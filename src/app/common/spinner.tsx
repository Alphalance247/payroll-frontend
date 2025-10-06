const Spinner = ({ spinnerSmall = false }: { spinnerSmall?: boolean }) => {
  return (
    <div
      className={
        spinnerSmall
          ? "py-10 flex items-center "
          : // "py-10 flex justify-center items-center"
            "flex items-center"
        // "flex justify-center items-center h-screen"
      }
    >
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>

      {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div> */}
    </div>
  );
};

export default Spinner;
