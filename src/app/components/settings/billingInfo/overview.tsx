"use client";
import Button from "@/app/common/Button";
import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";

const Overview = () => {
  const [cancelPayment, setCancePayment] = useState(false);
  return (
    <section>
      {cancelPayment && (
        <ModalOverlay
          onClose={() => {
            setCancePayment(false);
          }}
        >
          <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[616px] bg-[white] shadow-lg">
            <div className="pt-6 pb-4 pl-4 border-b">
              <h5 className="font-semibold text-[#2F2F33] text-xl tracking-[-0.5px] mb-2">
                Cancel Payment Subscription
              </h5>
              <p className="mb-8 text-sm text-[#2F2F33]">
                You’re about to cancel your payment subscription.{" "}
              </p>
              <p className="text-[#2F2F33] text-sm">
                This means future payroll disbursements, automated tax
                remittances, and integrated payment services will be disabled.
              </p>
            </div>

            <div className="flex items-center bg-[#F7F7F7] justify-end p-4 gap-x-4 rounded-br-lg rounded-bl-lg">
              <Button
                variant="secondary"
                onButtonClick={() => setCancePayment(false)}
              >
                Cancel
              </Button>
              <Button variant="danger"> Cancel Plan</Button>
            </div>
          </div>
        </ModalOverlay>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="py-6 px-4 border border-[#E3E3E5] rounded-xl">
          <p className="text-sm font-semibold text-[#71717A] mb-4">
            Last Payment
          </p>
          <h5 className="text-xl font-medium text-[#2F2F33]">April 01, 2025</h5>
        </div>

        <div className="py-6 px-4 border border-[#E3E3E5] rounded-xl">
          <p className="text-sm font-semibold text-[#71717A] mb-4">
            Next Payment Due
          </p>
          <h5 className="text-xl font-medium text-[#2F2F33]">May 01, 2025</h5>
        </div>

        <div className="py-6 px-4 border border-[#E3E3E5] rounded-lg">
          <p className="text-sm font-semibold text-[#71717A] mb-4">
            Payment Information
          </p>
          <h5 className="text-xl font-medium text-[#2F2F33]">VISA****8400</h5>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-9 mt-10">
        <div>
          <h6 className="text-base font-medium text-[#2F2F33] mb-4">
            Subscription Details
          </h6>
          <div className="py-6 px-4 border border-[#E3E3E5] rounded-xl flex flex-col gap-y-6">
            <div className="flex justify-between">
              <p className="text-base text-[#2F2F33] mb-4">Status:</p>
              <h5 className="text-base font-medium text-[#2F2F33]">Inactive</h5>
            </div>

            <div className="flex justify-between">
              <p className="text-base text-[#2F2F33] mb-4">
                Next billing date:
              </p>
              <h5 className="text-base font-medium text-[#2F2F33]">
                May 01, 2025
              </h5>
            </div>

            <div className="flex justify-between">
              <p className="text-base  text-[#2F2F33] mb-4">No of employees:</p>
              <h5 className="text-base font-medium text-[#2F2F33]">500</h5>
            </div>

            <div className="flex justify-between">
              <p className="text-base  text-[#2F2F33] mb-4">Billing total:</p>
              <h5 className="text-base font-medium text-[#2F2F33]">
                NGN 5,000.00
              </h5>
            </div>
          </div>
        </div>

        <div>
          <h6 className="text-base font-medium text-[#2F2F33] mb-4">
            Payment information
          </h6>
          <div className="py-6 px-4 border border-[#E3E3E5] rounded-xl flex flex-col gap-y-6">
            <div className="flex justify-between">
              <p className="text-base text-[#2F2F33] mb-4">Payment Country:</p>
              <h5 className="text-base font-medium text-[#2F2F33]">Nigeria</h5>
            </div>

            <div className="flex justify-between">
              <p className="text-base text-[#2F2F33] mb-4">Payment method:</p>
              <h5 className="text-base font-medium text-[#2F2F33]">
                May 01, 2025
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-2 mt-8">
        <Button variant="primary" className="w-[184px]">
          Renew Subscription
        </Button>
        <Button
          className=""
          variant="secondary"
          onButtonClick={() => {
            setCancePayment(true);
          }}
        >
          Cancel Subscription
        </Button>
      </div>
    </section>
  );
};

export default Overview;
