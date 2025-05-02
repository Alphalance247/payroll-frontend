

const ApprovalConfirmation =()=>{
    return(
        <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-30"
        //   onClick={onClose}
        >
          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center">
            {/* Modal Content */}
            <div 
              className="w-full max-w-[478px] rounded-lg bg-white shadow-xl border"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              
              <h2 
                id="modal-title"
                className="text-lg font-semibold mb-4 border-b border-[#E3E3E5] px-6 py-4"
              >
                Approve Payrolll
              </h2>

              <div className="px-6 pb-3">

          <p className="text-lg font-semibold text-[#2F2F33] mb-2">Are you sure you want to approve payroll?</p>
          <p className="text-[#71717A] text-base">
          Lorem ipsum dolor sit amet consectetur. Mauris congue tincidunt vivamus in sed integer. Elementum           </p>
              </div>

               {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-6 pb-6 pt-6">
              <button
                // onClick={onClose}
                className="px-6 py-2 text-sm font-semibold border border-[#E3E3E5] bg-[#F1F1F2] text-[#2F2F33] hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                // onClick={handleSend}
                className="px-6 py-2 text-sm font-semibold text-white bg-[#E37915] rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
               Yes, approve Payroll
              </button>
            </div>
            </div>

          </div>
        </div>
        </div>

    )
}

export default ApprovalConfirmation