import ModalOverlay from "@/app/common/modal/modal";
import { ImagesIcon } from "lucide-react";
import { BiImages } from "react-icons/bi";
import { BsImage, BsImages } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { FaImagePortrait } from "react-icons/fa6";
import { LuImages } from "react-icons/lu";
// import { ImageIcon } from "lucide-react";
const EditHouseAddress = ({ onModalClose }: { onModalClose: () => void }) => {
  return (
    <ModalOverlay onClose={onModalClose} className="relative">
      <div className="w-[528px] h-[820px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white absolute z-50 right-[615px] shadow-lg mt-20   ">
        {" "}
        <form action="submit" className="absolute z-50 w-[528px]">
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Housing Address
            </h2>
          </div>
          <div className="grid gap-y-4 p-6">
            <div className="">
              <label
                htmlFor="country"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Country
              </label>
              <br />
              <input
                type="text"
                name="country"
                value="Nigeria"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="state"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                State
              </label>
              <br />
              <input
                type="text"
                name="state"
                value="Lagos"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="city"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                City
              </label>
              <br />
              <input
                type="text"
                name="city"
                value="ikeja"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="street address"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Street Address
              </label>
              <br />
              <input
                type="text"
                name="street address"
                value="2, Abraham Adesanya"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="postal code"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Postal Code
              </label>
              <br />
              <input
                type="text"
                name="postal code"
                value="100000001"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor=" Upload proof "
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Upload Proof of Address
              </label>
              <br />
              <div className="flex justify-center items-center ">
                <div className="flex flex-col justify-center items-center rounded-[8px]  bg-[#F7F7F7] border-[1px] border-[#E3E3E5]  w-full mt-2 h-[168px] text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2]  border-dashed cursor-pointer">
                  <div className=" flex flex-col items-center justify-center h-[120px]  ">
                    {" "}
                    <svg
                      className="mb-4"
                      width="44"
                      height="42"
                      viewBox="0 0 44 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.57812 26.0972C4.57812 26.7274 4.67189 27.3579 4.89551 28.1069L4.95996 28.3198C5.90809 31.1482 8.51833 33.0482 11.4531 33.0483H38.0684L36.417 38.3579C35.9493 40.1635 34.2809 41.3891 32.4551 41.3892C32.0987 41.3889 31.7433 41.3432 31.3984 41.2524L3.04883 33.5767C0.861852 32.9667 -0.44114 30.677 0.130859 28.4692L4.57812 13.4595V26.0972ZM39.4102 0.61084C41.9365 0.610901 43.9939 2.69056 43.9941 5.24463V25.6343C43.994 28.1885 41.9365 30.268 39.4102 30.2681H11.9092C9.38325 30.268 7.32633 28.1884 7.32617 25.6343V5.24463C7.32636 2.69058 9.38327 0.610935 11.9092 0.61084H39.4102ZM11.9092 4.31787C11.4035 4.31797 10.9933 4.73305 10.9932 5.24463V22.7407L16.0527 17.6265C17.3049 16.3588 19.3457 16.3589 20.5996 17.6265L22.8184 19.8638L29.627 11.6011C30.2355 10.8634 31.1267 10.4367 32.0762 10.4312C33.0312 10.4531 33.9208 10.8426 34.5352 11.5708L40.3271 18.4038V5.24463C40.327 4.73307 39.9163 4.31793 39.4102 4.31787H11.9092ZM16.4951 6.17139C18.5174 6.17139 20.1621 7.83392 20.1621 9.87842C20.1621 11.9229 18.5174 13.5854 16.4951 13.5854C14.473 13.5853 12.8281 11.9228 12.8281 9.87842C12.8281 7.83408 14.4729 6.17151 16.4951 6.17139Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                    {/* <Images className="text-[#A3A3A3]" /> */}
                    <div>
                      <p className="text-[16px] font-Inter text-[#525252]">
                        <span className="text-[#CF6E13] pr-1 ">
                          Click to upload
                        </span>
                        or drag and drop
                      </p>
                      <p className="text-[#A3A3A3] text-[16.5px]">
                        JPG, JPEG, PNG less than 1MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="reason"
                    // value={"Tell us why you are requesting this changes"}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 px-6 border-t-[1px] h-[68px]  border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
            <button
              className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
              onClick={onModalClose}
            >
              Cancel
            </button>
            <button className="bg-[#E37915] w-[156px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm">
              Submit Request{" "}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditHouseAddress;
