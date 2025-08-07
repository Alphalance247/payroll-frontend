"use client";
import { FaChevronDown } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";
import Button from "@/app/common/Button";

const PermissionOverlay = ({
  onCloseOverlay,
}: {
  onCloseOverlay: () => void;
}) => {
  const roles = [
    {
      name: "Super Admin",
      description: "This administrator has access to all the payroll features",
    },
    {
      name: "Admin",
      description:
        "This administrator does not have access approve payroll, connect integrations and manage admins",
    },
    {
      name: "View-only Admin",
      description: "This administrator only has view access to all features",
    },
  ];

  const [emails, setEmails] = useState<string[]>([
    "Olawaleadeoti@alluvium.net",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Super Admin");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === " " || e.key === "," || e.key === "Enter") && inputValue) {
      e.preventDefault();
      if (emails.length < 5) {
        setEmails([...emails, inputValue.trim()]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <ModalOverlay onClose={onCloseOverlay}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[616px] bg-[white] shadow-lg">
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#2F2F33] mb-[6px]">
              Users and Emails
            </label>
            <div className="flex flex-wrap items-center gap-2 p-3 border border-[#E3E3E5] rounded-lg">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-[#EBE9FE] rounded-full px-2 py-1 text-sm"
                >
                  <span className="bg-[#26547C] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {email.charAt(0).toUpperCase()}
                  </span>
                  <span>{email}</span>
                  <button onClick={() => removeEmail(index)}>
                    <RxCross2 />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none"
                placeholder={emails.length === 0 ? "Enter email(s)" : ""}
              />
            </div>
            <p className="text-xs text-[#71717A] mt-1">
              Separate emails by commas or space. Max 5 invites at a time
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2F2F33] mb-[6px]">
              Role
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left p-3 border border-[#E3E3E5] rounded-lg flex justify-between items-center"
              >
                <span>{selectedRole || "User type"}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#E3E3E5] rounded-lg shadow-lg">
                  {roles.map((role) => (
                    <div
                      key={role.name}
                      onClick={() => {
                        setSelectedRole(role.name);
                        setIsDropdownOpen(false);
                      }}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium text-[#2F2F33]">
                          {role.name}
                        </p>
                        <p className="text-sm text-[#71717A]">
                          {role.description}
                        </p>
                      </div>
                      {selectedRole === role.name && (
                        <IoCheckmark className="text-[#E37915] w-5 h-5" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 bg-[#F9FAFB] border-t border-[#E3E3E5] rounded-b-lg">
          <Button
            onButtonClick={() => {
              onCloseOverlay();
            }}
            className=""
            variant="secondary"
          >
            Cancel
          </Button>
          <Button className="px-2">Add Admin</Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default PermissionOverlay;
