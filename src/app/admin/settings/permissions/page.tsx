"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import { BiPlus } from "react-icons/bi";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Button from "@/app/common/Button";
import HeadingSubHead from "@/app/common/headingSubHead";
import PermissionTable from "@/app/components/settings/permissions/permissionTable";
import { useEffect, useState } from "react";
import { getAdminPermissionList } from "@/stores/settings/permissions/permissions";

const Permissions = () => {
  const [showOverLay, setShowOverlay] = useState(false);
  const { fetchAdminPermission } = getAdminPermissionList();
  useEffect(() => {
    fetchAdminPermission();
  }, [fetchAdminPermission]);
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div>
              <HeadingSubHead
                subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
                heading="Permission"
                withSubHead={false}
              />
            </div>

            <Button
              variant="primary"
              className="flex items-center gap-x-2"
              onButtonClick={() => {
                setShowOverlay(true);
              }}
            >
              {" "}
              <span className="text-white">
                <BiPlus size={20} />
              </span>{" "}
              <span> Add Admin</span>
            </Button>
          </div>

          <PermissionTable
            setShowOverlay={setShowOverlay}
            showOverLay={showOverLay}
          />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Permissions;
