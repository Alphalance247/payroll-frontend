"use client";
import Button from "@/app/common/Button";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import ProtectedRoute from "@/app/common/protectedRoute";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Configure = () => {
  const [token, setToken] = useState("");
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!token) {
      toast.error("please provide the token");
    } else
      try {
        setIsLoading(true);

        const res = await axiosInstance.patch(`/company/env/`, {
          paystack_secret: token,
        });

        if (res.status === 200 || res.status === 201) {
          toast.success(
            res?.data?.statusmessage || "Holiday deleted successfully"
          );
          router.push("/admin/settings/integrations");
        }

        setIsLoading(false);
      } catch (err) {
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 bg-[#F7F7F7] overflow-y-scroll">
          <div className="relative w-[500px] mx-auto z-50 mt-8">
            <div className="px-4  py-5 grid gap-y-2">
              <div className="text-large text-[#2F2F33] font-semibold font-Graphik">
                Flutterwave Token
              </div>
              <p className="text-sm text-[#2F2F33] font-normal font-Graphik">
                Lorem ipsum dolor sit amet consectetur. Vestibulum pellentesque
                rutrum sit pellentesque vulputate lorem
              </p>
            </div>

            <div className="px-4  pb-5">
              <div>
                <Label
                  id="token"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  Token
                </Label>
                <br />
                <Input
                  id="token"
                  type="text"
                  name="token"
                  value={token || ""}
                  onChange={(e) => setToken(e.target.value)}
                  className="text-black border-[#D7DEDD] border w-full p-3 text-sm rounded-lg outline-none bg-white"
                />
              </div>

              <p className="px-4 py-3 bg-[#E7E7E7] text-sm mt-3 rounded-md">
                pellentesque rutrum sit pellentesque vulputate lorem fames
                libero sit. Dictum tellus ut id arcu est leo varius.
              </p>
            </div>
            <div className="flex justify-start bg-[#F7F7F7] mt-1 p-4 rounded-b-[8px]">
              <Button
                className="w-[203px] text-[#F7F7F7] text-sm font-semibold font-Graphik"
                onButtonClick={() => handleSubmit()}
              >
                {loading ? "connecting...." : "Connect Flutterwave"}
              </Button>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Configure;
