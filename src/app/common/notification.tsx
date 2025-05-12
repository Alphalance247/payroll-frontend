import { Toaster } from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";

export const warningConfig = {
  duration: 3000,
  style: { background: "rgba(234, 88, 12, 0.9)" },
  icon: (
    <RiErrorWarningFill
      className="w-6 h-6"
      style={{ color: "white", padding: "0" }}
    />
  ),
};

const Notification = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          // theme: {
          //     primary: 'green',
          //     secondary: 'black',
          // },
        },
        custom: {
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          iconTheme: {
            primary: "red",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default Notification;
