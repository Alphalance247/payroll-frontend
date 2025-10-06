"use client";
import Button from "../../common/Button";
import DashboardLayout from "../../common/DashBoardLayout";
import Heading from "../../common/heading";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import EmployeeSearchManagement from "../../components/employee-managemnt/employeeSearchManagement";
import EmployeesFullDetailsTable from "../../components/employee-managemnt/employeesFullDetailsTable";
import { useEffect, useState } from "react";
import { getEmployeeListStore } from "@/stores/getEmployee";
import Spinner from "../../common/spinner";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const { fetchEmployeeList, loading, error } = getEmployeeListStore();

  useEffect(() => {
    fetchEmployeeList();
  }, [fetchEmployeeList]);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between">
          <Heading
            flexDirection="column"
            subHead="Search, filter, and manage employees, teams, roles, and employment types in one place."
            user={"People"}
          />

          <Link href={"/admin/employee-onboarding"}>
            <Button className="flex items-center gap-x-1">
              {" "}
              <span>
                <FiPlus size={18} color="#FFFFFF" />{" "}
              </span>{" "}
              Add Employee
            </Button>
          </Link>
        </div>

        <EmployeeSearchManagement
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCountry={selectedCountry}
          selectedEmployeeType={selectedEmployeeType}
          selectedTeam={selectedTeam}
          setSelectedEmployeeType={setSelectedEmployeeType}
          setSelectedTeam={setSelectedTeam}
          setSelectedCountry={setSelectedCountry}
        />
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="py-20 text-center">{error}</p>
        ) : (
          <EmployeesFullDetailsTable
            searchQuery={searchQuery}
            selectedEmployeeType={selectedEmployeeType}
            selectedTeam={selectedTeam}
          />
        )}
      </main>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
