"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import { getNotificationCategories } from "@/stores/settings/notifications/categories";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getAdminNotificationPreferences } from "@/stores/settings/notifications/notificationPrefences";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import { getEmployeesNotificationCategories } from "@/stores/employee-dashboard/settings/notifications/categories";

const Account = () => {
  const {
    data: preferenceData,
    fetchAdminNoticationPreferences,
    loading,
    error,
  } = getAdminNotificationPreferences();

  useEffect(() => {
    fetchAdminNoticationPreferences();
  }, [fetchAdminNoticationPreferences]);

  const [
    selectedSlackChannelNotificationTypes,
    setSelectedSlackChannelNotificationTypes,
  ] = useState<string[]>([]);
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState<
    string[]
  >([]);

  // Load existing preferences when data is available
  useEffect(() => {
    if (preferenceData?.data) {
      const emailPrefs: string[] = [];
      const slackPrefs: string[] = [];

      preferenceData.data.map((pref: any) => {
        const notificationTypeId = pref.notification_type.id.toString();

        // Check which channels are enabled for this notification type
        pref.channels.forEach((channel: any) => {
          if (channel?.channel?.code === "email") {
            emailPrefs.push(notificationTypeId);
          } else if (channel?.channel?.code === "slack") {
            slackPrefs.push(notificationTypeId);
          }
        });
      });
      setSelectedNotificationTypes(emailPrefs);
      setSelectedSlackChannelNotificationTypes(slackPrefs);
    }
  }, [preferenceData]);

  const HeadingSubHeadInner = ({
    heading,
    subhead,
  }: {
    heading: string;
    subhead: string;
  }) => {
    return (
      <div className="pt-6 pb-4 px-4 border-b border-[#E3E3E5]">
        <p className="font-semibold text-[#2F2F33] text-base mb-2">{heading}</p>
        <p className="text-[#71717A] text-sm">{subhead}</p>
      </div>
    );
  };

  const CheckBox = ({
    checked,
    onSelectChannel,
  }: {
    checked: boolean;
    onSelectChannel: () => void;
  }) => {
    return (
      <td className="px-6 py-[14px]  text-center">
        <input
          type="checkbox"
          className="rounded cursor-pointer scale-150 border-[5px] border-[#E37915] accent-[#E37915]"
          checked={checked}
          onChange={onSelectChannel}
        />
      </td>
    );
  };

  const handleEmailToggle = async (notificationId: string) => {
    // Toggle the selection in local state
    const isCurrentlySelected =
      selectedNotificationTypes.includes(notificationId);
    const newSelectedTypes = isCurrentlySelected
      ? selectedNotificationTypes.filter((id) => id !== notificationId)
      : [...selectedNotificationTypes, notificationId];

    setSelectedNotificationTypes(newSelectedTypes);

    try {
      const req = isCurrentlySelected
        ? axiosInstance.post(
            `/company/notifications/delete-preferences/
`,
            { channel: 1, notification_type: parseInt(notificationId) }
          )
        : axiosInstance.post(`/company/notifications/preferences/`, {
            channel: 1,
            notification_type: parseInt(notificationId),
          });

      const res = await req;

      if (res.status === 201) {
        toast.success("Email preference updated successfully");
      }
    } catch (err) {
      setSelectedNotificationTypes((prev) =>
        isCurrentlySelected
          ? [...prev, notificationId]
          : prev.filter((id) => id !== notificationId)
      );
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      // resetAddNewTeam();
    }
  };

  const handleSlackChannelToggle = async (notificationId: string) => {
    // Toggle the selection in local state
    const isCurrentlySelected =
      selectedSlackChannelNotificationTypes.includes(notificationId);
    const newSelectedTypes = isCurrentlySelected
      ? selectedSlackChannelNotificationTypes.filter(
          (id) => id !== notificationId
        )
      : [...selectedSlackChannelNotificationTypes, notificationId];

    setSelectedSlackChannelNotificationTypes(newSelectedTypes);

    try {
      const req = isCurrentlySelected
        ? axiosInstance.post(
            `/company/notifications/delete-preferences/
`,
            { channel: 2, notification_type: parseInt(notificationId) }
          )
        : axiosInstance.post(`/company/notifications/preferences/`, {
            channel: 2,
            notification_type: parseInt(notificationId),
          });

      const res = await req;

      if (res.status === 201) {
        toast.success("Slack preference updated successfully");
      }
    } catch (err) {
      setSelectedNotificationTypes((prev) =>
        isCurrentlySelected
          ? [...prev, notificationId]
          : prev.filter((id) => id !== notificationId)
      );
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      // resetAddNewTeam();
    }
  };

  const { data, fetchNotificationCategory } = getNotificationCategories();

  useEffect(() => {
    fetchNotificationCategory();
  }, [fetchNotificationCategory]);

  const { fetchEmployeesNotificationCategory } =
    getEmployeesNotificationCategories();

  useEffect(() => {
    fetchEmployeesNotificationCategory();
  }, [fetchEmployeesNotificationCategory]);

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="mb-10">
            <HeadingSubHead heading="Notifications" withSubHead={false} />
          </div>

          {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              message="Error Fetching leave request"
              onRefetch={() => fetchNotificationCategory()}
            />
          ) : (
            <div className="flex flex-col gap-y-8">
              {/* Access & Security */}

              {data?.data?.map((item, i) => (
                <div className="border border-[#E3E3E5] rounded-xl" key={i}>
                  <HeadingSubHeadInner
                    heading={item?.name}
                    subhead={
                      item?.description ||
                      "Choose which notifications you'd like to receive and stay updated on your data requests."
                    }
                  />

                  <table className="w-full min-w-[1000px]">
                    <thead>
                      <tr>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                          EMAIL
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                          SLACK
                        </th>
                      </tr>
                    </thead>
                    {item?.notification_types?.map((item, i) => (
                      <tbody key={i}>
                        <tr className="border-y border-[#E3E3E5] last:border-b-0">
                          <td className="px-6 py-4 text-sm text-[#2F2F33]">
                            {item?.description}
                          </td>
                          <CheckBox
                            onSelectChannel={() =>
                              handleEmailToggle(item?.id?.toString())
                            }
                            checked={selectedNotificationTypes.includes(
                              item?.id?.toString()
                            )}
                          />
                          <CheckBox
                            onSelectChannel={() =>
                              handleSlackChannelToggle(item?.id?.toString())
                            }
                            checked={selectedSlackChannelNotificationTypes.includes(
                              item?.id?.toString()
                            )}
                          />
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              ))}
            </div>
          )}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default Account;
