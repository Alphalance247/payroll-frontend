import Button from "../common/Button";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import EmployeeSearchManagement from "../components/employee-managemnt/employeeSearchManagement";
import EmployeesFullDetailsTable from "../components/employee-managemnt/employeesFullDetailsTable";

const EmployeeManagement = () => {
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
            user={"People"}
          />

          <Link href={"/employee-onboarding"}>
            <Button className="flex items-center gap-x-1">
              {" "}
              <span>
                <FiPlus size={18} color="#FFFFFF" />{" "}
              </span>{" "}
              Add Employee
            </Button>
          </Link>
        </div>

        <EmployeeSearchManagement />
        <EmployeesFullDetailsTable />
      </main>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
