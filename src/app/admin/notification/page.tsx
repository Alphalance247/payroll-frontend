import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import TopBar from "../../common/topBar";
import MessageNotification from "../../components/notification/messageNotification";

const Notification = () => {
  return (
    <section className="">
      <TopBar />
      <div className="h-full bg-white py-20 max-w-[807px] mx-auto">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl px-6 font-semibold text-[#2F2F33] mb-3">
            Notifications
          </h2>
          <p className="text-[#E37915] text-sm font-semibold flex gap-x-2">
            <IoMdCheckmarkCircleOutline fill="#E37915" size={18} /> Mark all as
            read
          </p>
        </div>

        <MessageNotification isMobile={false} />
      </div>
    </section>
  );
};

export default Notification;
