"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/Button";
import { environment } from "../env/env.local";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending reset link

    try {
      setLoading(true);
      const res = await axios.post(
        `${environment.baseUrl}${environment?.forgotPassword}`,
        {
          email_address: email,
        }
      );

      if (res.status === 200) {
        toast.success(
          res.data?.statusmessage || "Reset link sent successfully"
        );
        setSentSuccess(true);
      }

      setLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.statusmessage || errorMessage;
      }

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className={`bg-[#F7F7F7]`}>
      <div className="max-w-[1270px] mx-auto px-8 py-20 md:px-4 md:py-12">
        <Link href={"/"}>
          <Image
            src="/assets/login/logo.svg"
            width={121}
            height={25}
            alt="logo"
          />
        </Link>

        <div className="bg-[#F7F7F7] h-screen pt-32">
          <div className=" w-[500px] h-fit py-6 px-14 mx-auto bg-white rounded-lg border-[#D3D3D6] border">
            {sentSuccess ? (
              <div className="">
                <Image
                  src="/assets/login/email-sent.png"
                  width={240}
                  height={96}
                  alt="email-sent"
                  className="text-center mx-auto"
                />
                <h2 className="text-2xl font-semibold text-[#262626] tracking-[-1px] mt-14 mb-6 text-center">
                  Password reset email sent
                </h2>
                <p className="text-sm text-[#71717A] mb-6 text-center">
                  Instructions for resetting your password has been sent to{" "}
                  <span className="font-medium"> {email}</span>
                </p>
                <p className="text-sm text-[#71717A] mb-14 text-center">
                  If you don’t receive it, please check your spam folder.
                </p>

                <Button variant="secondary" className="w-full">
                  Back to Login
                </Button>

                <div className="mt-4 flex gap-x-2 items-center">
                  <p className="text-sm text-[#71717A] font-medium">
                    Having issues resetting your password?
                  </p>{" "}
                  <Link href={""}>
                    <button type="submit" className="block">
                      <span className="text-[#E37915] text-sm font-semibold leading-tight">
                        Contact support
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-[#262626] tracking-[-1px] mb-6 text-center">
                  Forgot your password?
                </h2>
                <p className="text-sm text-[#71717A] mb-6 text-center font-medium">
                  Please enter the email you would like your password reset
                  information sent to.
                </p>
                <form
                  className="w-full flex-col justify-center flex"
                  onSubmit={handleSubmit}
                  action={"submit"}
                >
                  <div className="flex-col justify-start items-start gap-6 flex w-full">
                    <div className="flex-col justify-start items-start gap-6 flex w-full">
                      <div className="flex-col justify-start items-start gap-1 flex w-full">
                        <div>
                          <span className="text-[#2F2F33] text-sm font-normal leading-tight">
                            Email
                          </span>
                        </div>
                        <input
                          type="email"
                          value={email || ""}
                          className={`w-full h-11 px-3.5 py-3 bg-white rounded-[5px] border border-neutral-200 focus:shadow-none flex-col justify-start items-start flex text-black placeholder-gray-400 text-sm font-normal leading-tight`}
                          name="email"
                          onChange={(e) => setEmail(e.target?.value)}
                          required
                          placeholder="example@gmail.com"
                          autoComplete="false"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-col justify-start items-center gap-6 flex w-full mt-6">
                    <div className="justify-start items-center gap-[26px] inline-flex w-full">
                      <button
                        type="submit"
                        className="lg:px-[32px] py-4 lg:py-3 bg-[#E37915] rounded-[5px] justify-center items-start flex w-full"
                      >
                        <span className="text-white text-sm font-semibold leading-tight">
                          {loading ? "sending...." : "Send Reset Link"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="w-full mt-8">
                  <Link href={"/login"}>
                    <button
                      type="submit"
                      className="lg:px-[32px] py-4 lg:py-3 rounded-[5px] justify-center items-center flex w-full"
                    >
                      <span className="text-[#E37915] text-sm font-semibold leading-tight">
                        Back to Login
                      </span>
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
