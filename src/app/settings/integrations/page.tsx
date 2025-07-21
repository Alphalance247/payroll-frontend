"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import DashboardLayout from "../../common/DashBoardLayout";
import ProtectedRoute from "../../common/protectedRoute";
import Image from "next/image";
import Button from "@/app/common/Button";
import ModalOverlay from "@/app/common/modal/modal";
import { GoPeople } from "react-icons/go";
import { useState } from "react";

const Integrations = () => {
  const [isSuccessFull, setIsSuccessful] = useState(true);
  const plugins = [
    {
      img: "/assets/settings/remita.svg",
      status: "connected",
      name: "Remita",
      description:
        "Lorem ipsum dolor sit amet consecte tetur. Lorem at elementum.",
      btnText: "Connect Remita",
    },
    {
      img: "/assets/settings/paystack.svg",
      status: "connected",
      name: "Paystack",
      description:
        "Lorem ipsum dolor sit amet consecte tetur. Lorem at elementum.",
      btnText: "Disconnect Paystack",
    },
    {
      img: "/assets/settings/stripe.svg",
      status: "connected",
      name: "Stripe",
      description:
        "Lorem ipsum dolor sit amet consecte tetur. Lorem at elementum.",
      btnText: "Disconnect Stripe",
    },
  ];

  const Otherplugins = [
    {
      img: "/assets/settings/tempo.svg",
      name: "Tempo",
      description:
        "Integrate Paystack with your company’s payroll account to power secure and fast salary disbursements across Africa.",
    },
    {
      img: "/assets/settings/googleCalendar.svg",
      name: "Google Calendar",
      description:
        "Sync Google Calendar with Alluvium to track public holidays, time-off requests, and key payroll dates.",
    },
    {
      img: "/assets/settings/flutter.svg",
      name: "Flutterwave",
      description:
        "Integrate Paystack with your company’s payroll account to power secure and fast salary disbursements across Africa.",
    },
    {
      img: "/assets/settings/outlook.svg",
      name: "Outlook Calendar",
      description:
        "Sync Google Calendar with Alluvium to track public holidays, time-off requests, and key payroll dates.",
    },
    {
      img: "/assets/settings/slack.svg",
      name: "Slack",
      description:
        "Connect Slack to Alluvium to get instant notifications for leave approvals, payroll updates, and system alerts.",
    },
    {
      img: "/assets/settings/outlook.svg",
      name: "Google Calendar",
      description:
        "Sync Google Calendar with Alluvium to track public holidays, time-off requests, and key payroll dates.",
    },
  ];
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ModalOverlay onClose={() => {}}>
          <div className="relative z-50 bg-[#F7F7F7] flex flex-col justify-center h-screen w-full pt-20 pb-10 overflow-y-scroll">
            <div className="flex gap-x-6 items-center justify-center mb-14">
              <Image
                src="/assets/Home/alluvium.svg"
                width={121}
                height={25}
                alt="alluviumlogo"
              />
              <Image
                src="/assets/settings/Filter.svg"
                width={40}
                height={40}
                alt="filter"
              />
              <Image
                src="/assets/settings/flutterConfirm.svg"
                width={121}
                height={25}
                alt="integration company logo"
              />
            </div>

            {isSuccessFull ? (
              <div>
                <div className="mb-6 text-center">
                  <h4 className="text-[#2F2F33] font-semibold text-xl text-center">
                    {" "}
                    You have successfully connected to Alluvium
                  </h4>
                  <p className="text-[#71717A] text-base">
                    Please connect Alluvium Payroll to Flutterwave to use this
                    app.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Button className="">Open Flutterwave</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <h4 className="text-[#2F2F33] font-semibold text-xl text-center">
                    {" "}
                    Allow Alluvium Payroll to Acess Flutterwave
                  </h4>
                  <p className="text-[#71717A] text-base">
                    Please connect Alluvium Payroll to Flutterwave to use this
                    app.
                  </p>
                </div>

                <div className="p-6 border-[#E3E3E5] border rounded-md shadow-md w-[560px] bg-white mx-auto">
                  <h5 className="text-[#2F2F33] text-base font-semibold mb-1">
                    About Flutterwave
                  </h5>
                  <p className="text-base text-[#71717A]">
                    Lorem ipsum dolor sit amet consectetur. Consectetur habitant
                    porta ultrices nunc dolor. Semper vel et viverra scelerisque
                    orci morbi risus tincidunt. Volutpat quam sit dignissim
                    etiam non sit dolor dictum aliquam. Pulvinar amet mi mauris
                    cursus.
                  </p>

                  <div className="mt-6 flex flex-col gap-y-4 pb-6 border-[#E3E3E5] border-b">
                    <div className="flex gap-x-6">
                      <GoPeople size={24} color="#595959" />
                      <p className="text-[#595959] text-base">
                        Lorem ipsum dolor sit amet consectetur. Consectetur
                        habitant porta ultrices nunc dolor. Semper vel et
                        viverra{" "}
                      </p>
                    </div>
                    <div className="flex gap-x-6">
                      <GoPeople size={24} color="#595959" />
                      <p className="text-[#595959] text-base">
                        Lorem ipsum dolor sit amet consectetur. Consectetur
                        habitant porta ultrices nunc dolor. Semper vel et
                        viverra{" "}
                      </p>
                    </div>
                    <div className="flex gap-x-6">
                      <GoPeople size={24} color="#595959" />
                      <p className="text-[#595959] text-base">
                        Lorem ipsum dolor sit amet consectetur. Consectetur
                        habitant porta ultrices nunc dolor. Semper vel et
                        viverra{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex pt-6 items-center gap-x-2">
                    <Button variant="primary" className="w-full">
                      Allow Access
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Cancel
                    </Button>
                  </div>
                </div>

                <p className="mt-10 text-sm text-[#71717A] w-[35%] mx-auto text-center">
                  By connecting, you agree to Alluvium’s Privacy Policy and
                  authorize the Flutterwave to access your account.
                </p>
              </>
            )}
          </div>
        </ModalOverlay>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <HeadingSubHead
            heading="Integrations"
            withSubHead={true}
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
          />

          <div className="mt-10 bg-[#F7F7F7] rounded-2xl p-8">
            <h4 className="text-base font-semibold text-[#2F2F33] mb-4">
              Your Integrations
            </h4>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plugins.map((el, i) => (
                <div
                  className="p-6 rounded-2xl border border-[#E3E3E5]"
                  key={i}
                >
                  <div className="flex justify-between mb-4 items-start ">
                    <Image
                      alt={el?.name}
                      src={el?.img || "/assets/settings/remita.svg"}
                      width={56}
                      height={56}
                    />

                    <p className="bg-[#E9F9EF] rounded-2xl text-[#188C43] text-xs font-medium border border-[#188C43] px-2 py-[2px] w-fit">
                      connected
                    </p>
                  </div>

                  <h5 className="text-base font-semibold mb-1 text-[#2F2F33]">
                    {el?.name}
                  </h5>
                  <p className="text-base text-[#71717A] mb-8">
                    Lorem ipsum dolor sit amet consecte tetur. Lorem at
                    elementum.
                  </p>

                  <Button variant="pluginDisconnect" className="w-full">
                    {el?.btnText}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-lg font-semibold text-[#2F2F33] mb-6">
              Connect to Other Tools
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              {Otherplugins.map((el, i) => (
                <div
                  className="p-6 rounded-2xl border border-[#E3E3E5]"
                  key={i}
                >
                  <Image
                    alt=""
                    src={el?.img || "/assets/settings/remita.svg"}
                    width={56}
                    height={56}
                    className="mb-4"
                  />

                  <h5 className="text-base font-semibold mb-1 text-[#2F2F33]">
                    {el?.name}
                  </h5>
                  <p className="text-base text-[#71717A]">{el?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Integrations;
