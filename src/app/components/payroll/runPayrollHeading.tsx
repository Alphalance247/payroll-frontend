'use client'
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { useState } from 'react';
import EditExchange from './editExchange';

interface OverviewItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  unit?: string;
  hasEdit?: boolean;
  onEdit?: () => void;
}

export default function RunPayrollHeading() {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState({ usd: 1, ngn: 1500 });

  const handleSaveExchangeRate = (rate: { usd: number; ngn: number }) => {
    setCurrentRate(rate);
    // Here you would typically also save this to your backend
  };

  const overviewItems: OverviewItem[] = [
    {
      id: 'exchange-rate',
      icon: '/assets/payroll/1.svg',
      label: 'Exchange Rate',
      value: `₦ ${currentRate.ngn}`,
      hasEdit: true,
      onEdit: () => setIsExchangeModalOpen(true)
    },
    {
      id: 'hours-booked',
      icon: '/assets/payroll/2.svg',
      label: 'Total Hours Booked',
      value: '1500.00',
      unit: 'hrs'
    },
    {
      id: 'payday',
      icon: '/assets/payroll/3.svg',
      label: 'Payday',
      value: '15th January, 2025',
      hasEdit: true,
      onEdit: () => console.log('Edit payday')
    },
    {
      id: 'payment-method',
      icon: '/assets/payroll/4.svg',
      label: 'Payment Method',
      value: 'Bank Transfer'
    }
  ];

  return (
    <div className="mb-20 px-12">
      {/* Heading and Status */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold text-[#2F2F33]">Run Payroll</h2>
        <span className="bg-[#E7E9EA] text-[#0C1720] text-sm px-3 py-1 rounded-full font-medium border border-[#414D57]">
          Not Approved
        </span>
      </div>

      {/* Description */}
      <p className="mb-6 text-base text-[#71717A] w-[80%]">
        Lorem ipsum dolor sit amet consectetur. Feugiat lacus amet justo tincidunt faucibus nunc est et hendrerit.. Id tortor convallis sed sem tristique accumsan.. Senectus tempor vitae faucibus pulvinar luctus.. Mollis tempus mauris risus est donec mattis maecenas elit..
      </p>

      {/* Overview Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%]">
        {overviewItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-start border-r">
            <Image src={item.icon} alt={item.label} width={40} height={40} />
            <div className="">
              <p className="text-sm text-[#71717A] font-medium mb-2">{item.label}</p>
              <p className="text-lg font-medium text-[#2F2F33] tracking-[-0.5px] mb-2">
                {item.value}
                {item.unit && <span className="font-normal text-base"> {item.unit}</span>}
              </p>
              
              {item.hasEdit && (
                <button
                  onClick={item.onEdit}
                  className="text-orange-500 text-sm flex items-center gap-1 hover:text-orange-600 transition-colors"
                >
                  Edit <FaEdit size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Exchange Rate Modal */}
      <EditExchange
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        onSave={handleSaveExchangeRate}
        currentRate={currentRate}
      />
    </div>
  );
}
