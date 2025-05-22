"use client";
import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";
import Input from "../common/input";
import Label from "../common/label";
import PhoneInput from "react-phone-number-input";
import styles from "../../styles/phone.module.scss";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
// import { Country, State, ICountry, IState } from "country-state-city";
import { toast } from "react-hot-toast";
import { BankData, DenominationData, TeamData } from "../utils/type";
import { AxiosError } from "axios";
import axiosInstance from "../utils/axios";
import useBoolean from "../hooks/useBoolean";
import LoadingScreen from "../common/loading";

const EmployeeOnboardingPage = () => {
  // const [countries, setCountries] = useState<ICountry[]>([]);
  // const [states, setStates] = useState<IState[]>([]);
  const [formStep, setFormStep] = useState(1);
  const [teamData, setTeamData] = useState<TeamData[] | null>(null);
  const [denominationData, setDenominationData] = useState<DenominationData[]>(
    []
  );
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);
  const [updateEmployee, setUpdateEmployee, resetUpdateEmployee] =
    useBoolean(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",

    // address details
    country: "",
    state: "",
    city: "",
    street_address: "",
    postal_code: "",

    // next of kin details
    nok_name: "",
    nok_phone: "",
    nok_address: "",
    nok_country: "",
    nok_relationship: "",
    nok_city: "",

    // job details
    job_type: "",
    team: "",
    job_role: "",
    start_date: "",

    // bank details
    acct_num: "",
    acct_name: "",
    bank_name: "",
    base_pay: "",
    pay_deno: "",
  });
  const [bankData, setBankData] = useState<BankData[]>([]);
  const [loadingBankDetails, setLoadingBankDetails, resetIsLoadingBankDetails] =
    useBoolean(false);

  console.log(selectedBankCode);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosInstance.get(`/employees/list-teams`);
        const { data } = res.data; // response.data.data
        if (res.status === 200) {
          setTeamData(data);
        }
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchDenomination = async () => {
      try {
        const res = await axiosInstance.get(`/employees/denominations`);
        const data = res?.data?.denomination; // response.data.data

        if (res.status === 200) {
          setDenominationData(data);
        }
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      }
    };

    fetchDenomination();
  }, []);

  useEffect(() => {
    const fetchBank = async () => {
      try {
        const res = await axiosInstance.get(`/employees/banks?currency=NGN`);
        const data = res?.data?.banks; // response.data.data

        if (res.status === 200) {
          setBankData(data);
          toast.success(res.data.message);
        }
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      }
    };

    fetchBank();
  }, []);

  console.log(form);

  // Define required fields for each step
  const requiredFields = {
    1: ["fullname", "email", "phone", "dob"],
    2: ["country", "state", "city", "street_address", "postal_code"],
    3: [
      "nok_name",
      "nok_relationship",
      "nok_phone",
      "nok_address",
      "nok_city",
      "nok_country",
    ],
    4: ["job_type", "team", "job_role", "start_date"],
    5: ["acct_num", "bank_name", "acct_name", "base_pay", "pay_deno"],
  };

  // Validation function
  const validateStep = (step: number) => {
    const fields = requiredFields[step as keyof typeof requiredFields];
    const missingFields = fields.filter(
      (field) => !form[field as keyof typeof form]
    );

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map((field) => {
        // Convert field names to more readable format
        return field
          .replace(/_/g, " ")
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase());
      });

      toast.error(
        `Please fill in the following required fields: ${fieldNames.join(", ")}`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(formStep)) {
      try {
        setUpdateEmployee();
        const res = await axiosInstance.post(`/account/onboard-employee`, {
          ...form,
          bank_code: selectedBankCode,
        });

        if (res.status === 201) {
          toast.success(res.data.message);
        }
        setFormStep(1);
        setForm({
          fullname: "",
          email: "",
          phone: "",
          dob: "",
          country: "",
          state: "",
          city: "",
          street_address: "",
          postal_code: "",
          nok_name: "",
          nok_phone: "",
          nok_address: "",
          nok_country: "",
          nok_relationship: "",
          nok_city: "",
          job_type: "",
          team: "",
          job_role: "",
          start_date: "",
          acct_num: "",
          acct_name: "",
          bank_name: "",
          base_pay: "",
          pay_deno: "",
        });

        resetUpdateEmployee();
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
        resetUpdateEmployee();
      }
    }
  };

  // Modify the continue button handlers to include validation
  const handleContinue = (nextStep: number) => {
    if (validateStep(formStep)) {
      setFormStep(nextStep);
    }
  };

  const handleAccountNumberChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (value.length === 10) {
      try {
        setLoadingBankDetails();
        const res = await axiosInstance.post(
          `/employees/banks/verify-account-number`,
          {
            account_number: value,
            bank_code: selectedBankCode,
          }
        );
        const data = res?.data; // response.data.data

        if (res.status === 200) {
          setForm((prev) => ({
            ...prev,
            acct_name: data?.account?.account_name,
          }));
          toast.success(res.data.message);
        }
        resetIsLoadingBankDetails();
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        resetIsLoadingBankDetails();
        toast.error(errorMessage);
      }

      // setForm((prev) => ({ ...prev, bank_name: bankName }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Load countries on component mount
  // useEffect(() => {
  //   const loadCountries = () => {
  //     const countriesData = Country.getAllCountries();
  //     setCountries(countriesData);
  //   };
  //   loadCountries();
  // }, []);

  // Load states when country changes
  // useEffect(() => {
  //   const loadStates = () => {
  //     if (form?.country) {
  //       const statesData = State.getStatesOfCountry(form?.country);
  //       setStates(statesData);
  //     }
  //   };
  //   loadStates();
  // }, [form?.country]);

  return (
    <DashboardLayout>
      {loadingBankDetails && <LoadingScreen message="Verifying Bank Details" />}
      {updateEmployee && <LoadingScreen message="Updating Employee Details" />}

      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
        <div className="border-b border-[#E3E3E5] px-16 pb-5">
          <HeadingSubHead
            withSubHead={true}
            heading="Add New Employee"
            subHead="Add New Employee to system"
          />
        </div>

        <div className="px-16 py-5 border-b border-[#E3E3E5] flex gap-x-8 items-center">
          <p className="text-base text-[#000000] font-medium">
            {formStep === 1
              ? "Personal Details"
              : formStep === 2
              ? "House Address"
              : formStep === 3
              ? "Next of Kin Details"
              : formStep === 4
              ? "Job Details"
              : "Bank Details"}
          </p>
          <p className="text-sm text-[#CF6E13] bg-[#FCF2E8] rounded-lg px-2 py-1 font-medium">
            In progress
          </p>
        </div>

        <div className="px-16 py-5 border-[#E3E3E5] w-[60%] mx-auto">
          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <div className="flex flex-col gap-4">
                <div>
                  <Label
                    //   htmlFor="first-name"
                    id="firstname"
                    className="block mb-1"
                  >
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="fullname"
                    value={form?.fullname || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="email" className="block mb-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form?.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="phone-number" className="block mb-1">
                    Phone Number
                  </Label>

                  <PhoneInput
                    placeholder="8140686688"
                    international
                    defaultCountry="NG"
                    required
                    value={form?.phone || ""}
                    onChange={(value) =>
                      setForm({ ...form, phone: value || "" })
                    }
                    className={`${styles.PhoneInput} outline-green-400`}
                    numberInputProps={{
                      className: `outline-none border-[#E0E0E0] border-[1px] text-[black] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px]`,
                    }}
                  />
                </div>

                <div>
                  <Label id="date-of-birth" className="block mb-1">
                    Date of Birth
                  </Label>
                  <Input
                    type="date"
                    id="date-of-birth"
                    placeholder="21-Mar-1980"
                    name="dob"
                    value={form?.dob || ""}
                    onChange={handleChange}
                  />
                </div>

                <button
                  className={`px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg w-full mt-4`}
                  onClick={() => handleContinue(2)}
                >
                  Continue
                </button>
              </div>
            )}

            {/* Address Details */}

            {formStep === 2 && (
              <div className="flex flex-col gap-4">
                {/* Country Dropdown */}
                <div>
                  <Label id="country" className="block mb-1">
                    Country
                  </Label>
                  <Input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter Country"
                    value={form?.country || ""}
                    onChange={handleChange}
                  />
                  {/* <select
                    id="country"
                    name="country"
                    value={form?.country || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select> */}
                </div>

                {/* State Dropdown */}
                <div>
                  <Label id="state" className="block mb-1">
                    State
                  </Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter State"
                    value={form?.state || ""}
                    onChange={handleChange}
                  />
                  {/* <select
                    id="state"
                    name="state"
                    value={form?.state || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                    disabled={!form?.country}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select> */}
                </div>

                <div>
                  <Label
                    //   htmlFor="first-name"
                    id="city"
                    className="block mb-1"
                  >
                    City
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter City"
                    value={form?.city || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    //   htmlFor="first-name"
                    id="address"
                    className="block mb-1"
                  >
                    Address
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    name="street_address"
                    placeholder="Enter Address"
                    value={form?.street_address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    //   htmlFor="first-name"
                    id="postal-code"
                    className="block mb-1"
                  >
                    Postal Code
                  </Label>
                  <Input
                    type="text"
                    id="postal-code"
                    name="postal_code"
                    placeholder="Enter Postal Code"
                    value={form?.postal_code || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    className="px-6 py-[10px] w-fit text-sm text-[#2F2F33] font-semibold bg-[#F1F1F2] border border-[#E3E3E5] rounded-lg"
                    onClick={() => setFormStep(1)}
                  >
                    Previous
                  </button>

                  <button
                    className={`px-6 py-[10px] text-sm w-fit text-white font-semibold bg-[#E37915] rounded-lg`}
                    onClick={() => handleContinue(3)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Next of Kin Details */}

            {formStep === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-base text-[#000000] font-medium">
                  Next of Kin Details
                </p>

                <div>
                  <Label id="name" className="block mb-1">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="nok_name"
                    placeholder="Enter Name"
                    value={form?.nok_name || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="relationship" className="block mb-1">
                    Relationship
                  </Label>
                  <Input
                    type="text"
                    id="relationship"
                    name="nok_relationship"
                    placeholder="Enter Relationship"
                    value={form?.nok_relationship || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="phone-number" className="block mb-1">
                    Phone No.
                  </Label>
                  <PhoneInput
                    placeholder="8140686688"
                    international
                    defaultCountry="NG"
                    required
                    value={form?.nok_phone || ""}
                    onChange={(value) =>
                      setForm({ ...form, nok_phone: value || "" })
                    }
                    className={`${styles.PhoneInput} outline-green-400`}
                    numberInputProps={{
                      className: `outline-none border-[#E0E0E0] border-[1px] text-[#98A1B0] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px]`,
                    }}
                  />
                </div>

                <div>
                  <Label id="street-address" className="block mb-1">
                    Street Address
                  </Label>
                  <Input
                    type="text"
                    id="street-address"
                    name="nok_address"
                    placeholder="Enter Street Address"
                    value={form?.nok_address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="city" className="block mb-1">
                    City
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    name="nok_city"
                    value={form?.nok_city || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Country Dropdown */}
                <div>
                  <Label id="country" className="block mb-1">
                    Country
                  </Label>
                  <Input
                    type="text"
                    id="country"
                    name="nok_country"
                    placeholder="Enter Country"
                    value={form?.nok_country || ""}
                    onChange={handleChange}
                  />
                  {/* <select
                    id="country"
                    name="nok_country"
                    value={form?.nok_country || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select> */}
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    className="px-6 py-[10px] w-fit text-sm text-[#2F2F33] font-semibold bg-[#F1F1F2] border border-[#E3E3E5] rounded-lg"
                    onClick={() => setFormStep(2)}
                  >
                    Previous
                  </button>

                  <button
                    className={`px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg w-fit`}
                    onClick={() => handleContinue(4)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Job Details */}

            {formStep === 4 && (
              <div className="flex flex-col gap-4">
                <p className="text-base text-[#000000] font-medium">
                  Job Details
                </p>

                <div>
                  <Label id="job-title" className="block mb-1">
                    Type
                  </Label>
                  <select
                    id="job-title"
                    name="job_type"
                    value={form?.job_type || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                {/* the team name would be taken back here */}

                <div>
                  <Label id="team" className="block mb-1">
                    Team
                  </Label>

                  <select
                    id="team"
                    name="team"
                    value={form?.team || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  >
                    <option value="">Select Team</option>
                    {teamData?.map((team) => (
                      <option key={team?.id} value={team?.id}>
                        {team?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label id="role" className="block mb-1">
                    Role
                  </Label>

                  <Input
                    type="text"
                    id="role"
                    placeholder="Enter Role"
                    name="job_role"
                    value={form?.job_role || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label id="contract-start-date" className="block mb-1">
                    Contract Start Date
                  </Label>

                  <Input
                    type="date"
                    id="contract-start-date"
                    placeholder="21-Mar-2025"
                    name="start_date"
                    value={form?.start_date || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    className="px-6 py-[10px] w-fit text-sm text-[#2F2F33] font-semibold bg-[#F1F1F2] border border-[#E3E3E5] rounded-lg"
                    onClick={() => setFormStep(3)}
                  >
                    Previous
                  </button>

                  <button
                    className={`px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg w-fit`}
                    onClick={() => handleContinue(5)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Bank Details */}

            {formStep === 5 && (
              <div className="flex flex-col gap-4">
                <p className="text-base text-[#000000] font-medium">
                  Bank Details
                </p>

                {/* Denomination Dropdown to be put back here */}
                <div>
                  <Label id="bank-name" className="block mb-1">
                    Bank Name
                  </Label>

                  <select
                    id="bank-name"
                    name="bank_name"
                    value={form?.bank_name || ""}
                    onChange={(e) => {
                      const selectedBank = bankData.find(
                        (bank) => bank.name === e.target.value
                      );
                      setSelectedBankCode(selectedBank?.code || null);
                      setForm((prev) => ({
                        ...prev,
                        bank_name: e.target.value,
                      }));
                    }}
                    className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  >
                    <option value="">Select Bank</option>
                    {bankData?.map((el) => (
                      <option
                        key={el?.id}
                        value={el?.name}
                        onClick={() => setSelectedBankCode(el?.code)}
                      >
                        {el?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label id="account-number" className="block mb-1">
                    Account Number
                  </Label>
                  <Input
                    type="text"
                    id="account-number"
                    name="acct_num"
                    placeholder="Enter Account Number"
                    value={form?.acct_num || ""}
                    onChange={handleAccountNumberChange}
                    disabled={!form?.bank_name}
                  />
                </div>

                {/* Bank Name Dropdown */}

                <div>
                  <Label id="account-name" className="block mb-1">
                    Account Name
                  </Label>
                  <Input
                    type="text"
                    id="account-name"
                    placeholder="Enter Account Name"
                    name="acct_name"
                    readonly={true}
                    value={form?.acct_name || "Account Name"}
                  />
                </div>

                <div>
                  <Label id="base-pay" className="block mb-1">
                    Base Pay
                  </Label>

                  <div className="flex">
                    <input
                      id="base-pay"
                      type="text"
                      name="base_pay"
                      value={form?.base_pay || ""}
                      placeholder="Enter Base Pay"
                      required
                      onChange={handleChange}
                      className={` font-poppinsRegular outline-[#51F4A6] text-black border-[#D7DEDD] border w-full  p-3 text-sm rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none`}
                    />
                    <select
                      id="pay-deno"
                      name="pay_deno"
                      value={form?.pay_deno || ""}
                      onChange={handleChange}
                      className="w-[150px] border border-[#E0E0E0] rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                    >
                      <option value="">Select Denomination</option>
                      {denominationData?.map((denomination) => (
                        <option key={denomination?.id} value={denomination?.id}>
                          {denomination?.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    className="px-6 py-[10px] w-fit text-sm text-[#2F2F33] font-semibold bg-[#F1F1F2] border border-[#E3E3E5] rounded-lg"
                    onClick={() => setFormStep(4)}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg w-fit`}
                  >
                    Submit for Approval
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default EmployeeOnboardingPage;
