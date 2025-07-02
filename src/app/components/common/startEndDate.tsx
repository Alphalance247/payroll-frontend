import Button from "@/app/common/Button";

interface StartEndDateProps {
  start_date: string;
  end_date: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  fetchPayrollAnalysis: (start_date: string, end_date: string) => Promise<void>;
}

const StartEndDate = ({
  start_date,
  end_date,
  setStartDate,
  setEndDate,
  fetchPayrollAnalysis,
}: StartEndDateProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative">
        <label
          htmlFor="start_date"
          className=" px-4 py-3 bg-white border border-[#d9d9d9] relative rounded-lg cursor-pointer w-fit"
        >
          {start_date ? start_date : "Start Date"}
        </label>
        <input
          id="start_date"
          type="date"
          value={start_date}
          className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="end_date"
          className=" px-4 py-3 bg-white border border-[#d9d9d9] relative rounded-lg cursor-pointer w-fit"
        >
          {end_date ? end_date : "End Date"}
          <input
            id="end_date"
            type="date"
            value={end_date}
            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: 2 }}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <Button
        onButtonClick={() => {
          fetchPayrollAnalysis(start_date, end_date);
          setStartDate("");
          setEndDate("");
        }}
        variant="primary"
        className={`${
          !start_date || !end_date ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!start_date || !end_date}
      >
        Apply
      </Button>
    </div>
  );
};

export default StartEndDate;
