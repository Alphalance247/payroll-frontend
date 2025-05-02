"use client";
import { usePathname } from "next/navigation";
import { IoCheckmarkOutline } from "react-icons/io5";

const steps = [
  { label: 'Run Payroll', path: '/run-payroll' },
  { label: 'Review & Approve', path: '/run-payroll/review-approve' },
  { label: 'Process Payment', path: '/run-payroll/process-payment' },
  { label: 'Confirmation', path: '/run-payroll/confirmation' },
];

export default function PayrollStepper() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((step) => step.path === pathname);

  return (
    <div className="w-full mx-auto mb-10 border-b border-[#E3E3E5] px-20 pb-10">
      <div className="flex items-center ">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.label} className="flex-1 relative">
              <div className="flex items-center">
                {/* Step Circle */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center
                      ${isCompleted ? 'border-orange-500 border bg-white' : ''}
                      ${isActive ? ' bg-orange-500' : ''}
                      ${!isActive && !isCompleted ? 'border border-gray-300' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <IoCheckmarkOutline color="#E37915" />

                  
                    ) : (
                      <span className={`text-xs font-medium
                        ${isActive ? 'text-orange-500' : 'text-gray-400'}
                      `}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[1px] bg-gray-300">
                    <div
                      className={`
                        h-full bg-orange-500 transition-all duration-300
                        ${isCompleted ? 'w-full' : ''}
                        ${isActive ? 'w-full' : ''}
                        ${!isActive && !isCompleted ? 'w-0' : ''}
                      `}
                    />
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="absolute -bottom-6 left-[-2rem] right-0">
                <span className={`
                  text-base font-medium
                  ${isCompleted || isActive ? 'text-[#E37915]' : 'text-[#71717A]'}
                `}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
