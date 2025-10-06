"use client";
import Image from "next/image";
import Button from "../common/Button";
import Label from "../common/label";
import Input from "../common/input";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { environment } from "../env/env.local";

const SetPassword = () => {
  const SetPasswordDetails = () => {
    const [showPassword, setShowPassword] = useState<{
      [key: string]: boolean;
    }>({
      password: false,
      confirm__password: false,
      old_password: false,
    });
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [form, setForm] = useState({
      password: "",
      confirm_password: "",
    });
    const passwordRegex = useMemo(
      () =>
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).{8,}$"
        ),
      []
    );
    const [isPasswordloading, setIsPasswordLoading] = useState(false);
    const route = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
      const urlEmail = searchParams.get("email");
      const UserToken = searchParams.get("token");
      if (urlEmail && UserToken) {
        setEmail(urlEmail);
        setToken(UserToken);
      } else {
        toast.error("Invalid or missing Email / Token");
        route.push("/forgot-password");
      }
    }, [searchParams, route]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "password" && !passwordRegex.test(value)) {
          setError((prev) => ({
            ...prev,
            [name]:
              "Password must contain at least 8 characters and must must be alphanumeric.",
          }));
        }
        // Check password match for both fields
        if (name === "confirm_password") {
          if (value !== form.password) {
            setError((prev) => ({
              ...prev,
              [name]: "Passwords don't match.",
            }));
          }
        }

        setForm((prev) => ({ ...prev, [name]: value }));
      },
      [passwordRegex, form]
    );

    const togglePasswordVisibility = (field: string) => {
      setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const PasswordEye = ({
      onToggle,
      showPasswordType,
    }: {
      onToggle: () => void;
      showPasswordType: boolean;
    }) => {
      return (
        <div className="absolute top-8 right-4">
          <div onClick={onToggle}>
            {showPasswordType ? (
              <FaRegEyeSlash size={24} className="text-[#7C7C7C]" />
            ) : (
              <IoEye size={24} className="text-[#7C7C7C]" />
            )}
          </div>
        </div>
      );
    };

    const handleSubmit = async () => {
      if (!form?.confirm_password || !form?.password) {
        toast?.error("Password / Confirm Password field cannot be empty");
      } else {
        try {
          setIsPasswordLoading(true);
          const res = await axios.post(
            `${environment.baseUrl}${environment?.setPassword}`,
            {
              email,
              password: form?.password,
              token,
            }
          );

          if (res.status === 200) {
            toast.success(
              res.data?.statusmessage || "Password reset successfully"
            );

            route?.push("/set-password/reset-successful");
            ///set-password/reset-successful
          }

          setForm({ ...form, password: "", confirm_password: "" });

          setIsPasswordLoading(false);
        } catch (err) {
          let errorMessage =
            "An error occurred please try again or contact Admin";
          if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.statusmessage || errorMessage;
          }

          toast.error(errorMessage);
          setIsPasswordLoading(false);
        }
      }
    };
    return (
      <section className={`bg-[#F7F7F7]`}>
        <div className="max-w-[1270px] mx-auto px-8 py-20 md:px-4 md:py-12">
          <Image
            src="/assets/login/logo.svg"
            width={121}
            height={25}
            alt="logo"
          />

          <div className="bg-[#F7F7F7] h-screen pt-32">
            <div className=" w-[500px] h-fit py-6 px-14 mx-auto bg-white rounded-lg border-[#D3D3D6] border">
              <h2 className="text-2xl font-semibold text-[#262626] my-6 text-center">
                Set a new password
              </h2>

              <div className="mt-8">
                <div className="grid gap-4">
                  <div className="relative">
                    <div>
                      <Label id="password" className="block mb-1">
                        Create password
                      </Label>
                      <Input
                        type={showPassword?.password ? "password" : "text"}
                        id="password"
                        name="password"
                        value={form?.password || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <span className="text-red-800 text-sm font-normal leading-tight">
                      {error?.password}
                    </span>

                    <PasswordEye
                      onToggle={() => togglePasswordVisibility("password")}
                      showPasswordType={showPassword?.password}
                    />
                  </div>

                  <div className="relative">
                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="confirm_password"
                        className="block mb-1"
                      >
                        Confirm password
                      </Label>
                      <Input
                        type={
                          showPassword?.confirm__password ? "password" : "text"
                        }
                        id="confirm_password"
                        name="confirm_password"
                        value={form?.confirm_password || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <span className="text-red-800 text-sm font-normal leading-tight">
                      {error?.confirm_password}
                    </span>

                    <PasswordEye
                      onToggle={() =>
                        togglePasswordVisibility("confirm__password")
                      }
                      showPasswordType={showPassword?.confirm__password}
                    />
                  </div>
                </div>

                <div className="flex gap-x-2 mt-8">
                  <Button
                    className="w-full"
                    variant="primary"
                    onButtonClick={handleSubmit}
                    btnType="button"
                  >
                    {isPasswordloading
                      ? "Updating...."
                      : "Update Your Password"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordDetails />
    </Suspense>
  );
};

export default SetPassword;
