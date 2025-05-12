"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/UI/dialog";
import { Loader2 } from "lucide-react";
interface EditExchangeProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rate: { usd: number; ngn: number }) => void;
  currentRate?: { usd: number; ngn: number };
  isLoading: boolean;
}

export default function EditExchange({
  isOpen,
  onClose,
  onSave,
  currentRate = { usd: 1, ngn: 1500 },
  isLoading,
}: EditExchangeProps) {
  const [usdAmount, setUsdAmount] = useState(currentRate.usd);
  const [ngnAmount, setNgnAmount] = useState(currentRate.ngn);

  const handleSave = () => {
    onSave({ usd: usdAmount, ngn: ngnAmount });
    // onClose();
  };

  const handleGenerateRate = async () => {
    // TODO: Implement automatic rate generation
    // This would typically fetch from an exchange rate API
    console.log("Generating rate automatically...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] md:max-w-[538px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#2F2F33]">
            Edit Exchange Rate
          </DialogTitle>
          <p className="text-[#71717A] text-base">
            Lorem ipsum dolor sit amet consectetur. Feugiat lacus amet justo
            tincidunt faucibus nunc est et hendrerit.
          </p>
        </DialogHeader>

        <div className="p-4">
          {/* Current Rate Display */}
          <div className="space-y-1">
            <p className="text-base text-[#2F2F33] font-medium">
              1 USD = {ngnAmount / usdAmount} NGN
            </p>
            <p className="text-base text-[#2F2F33] font-medium">
              1 NGN = {usdAmount / ngnAmount} USD
            </p>
          </div>

          {/* NGN Input */}
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-[#2F2F33]">
              Nigeria Naira
            </label>
            <div className="flex items-center border border-[#E3E3E5] rounded-lg p-3">
              <div className="flex items-center gap-2 min-w-[100px]">
                <Image
                  src="/assets/payroll/nija.svg"
                  alt="NGN"
                  width={24}
                  height={24}
                />
                <span className="text-sm font-medium">NGN</span>
              </div>
              <input
                type="number"
                value={ngnAmount}
                onChange={(e) => setNgnAmount(Number(e.target.value))}
                className="w-full border-none focus:outline-none text-right"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="mt-2 mb-2">
            <Image
              src="/assets/payroll/filter.svg"
              alt="divider"
              width={40}
              height={40}
            />
          </div>

          {/* USD Input */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-[#2F2F33]">
              American Dollar
            </label>
            <div className="flex items-center border border-[#E3E3E5] rounded-lg p-3">
              <div className="flex items-center gap-2 min-w-[100px]">
                <Image
                  src="/assets/payroll/us.svg"
                  alt="USD"
                  width={24}
                  height={24}
                />
                <span className="text-sm font-medium">USD</span>
              </div>
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => setUsdAmount(Number(e.target.value))}
                className="w-full border-none focus:outline-none text-right"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Generate Rate Link */}

          <div>
            <p className="text-sm text-[#71717A]">
              Want to automate generate the exchange rate?
            </p>
            <button
              onClick={handleGenerateRate}
              className="text-[#E37915] text-sm underline font-medium hover:text-[#c66812] transition-colors"
            >
              Generate Rate Automatically
            </button>
          </div>
        </div>

        <DialogFooter className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#E3E3E5] block w-fit rounded-lg text-[#2F2F33] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-[#E37915] text-white block w-fit rounded-lg hover:bg-[#c66812] transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
