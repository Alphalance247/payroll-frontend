"use client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingScreen from "../common/loading";
import { useAuth } from "../context/authContext";
import axiosInstance from "../utils/axios";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/account/login/token`,
          userData
        );

        if (response.status >= 200 && response.status < 300) {
          const { refresh, access, email, fullname, is_payroll_staff, uid } =
            response.data;

          // Store the tokens
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);

          // Use the login function from auth context
          login({ email, fullname, is_payroll_staff, uid });

          // Show success message
          toast.success(`Sign in successful, welcome ${fullname}`);

          // Clear form
          setUserData({ email: "", password: "" });

          // After successful login
          const urlParams = new URLSearchParams(window.location.search);
          const redirectPath = urlParams.get("redirect");

          setLoading(true);

          if (redirectPath) {
            router.push(decodeURIComponent(redirectPath));
          } else {
            router.push("/"); // Default to home if no redirect path is specified
          }
        } else {
          toast.error(`Sign in failed: ${response?.data?.statusmessage}`);
        }
      } catch (err) {
        const message = err?.response?.data?.details;
        toast.error(`Sign in failed${message ? ": " + message : ""}`);
      } finally {
        setLoading(false);
      }
    },
    [userData, router, login]
  );

  return loading ? (
    <LoadingScreen message="Loading..." />
  ) : (
    <div className="flex flex-col justify-center max-w-[500px] mx-auto items-center h-screen">
      <form
        className="w-full flex-col justify-center items-start flex"
        onSubmit={handleSubmit}
      >
        <div className="flex-col justify-start items-start gap-6 flex w-full">
          <div className="flex-col justify-start items-start gap-6 flex w-full">
            <div className="flex-col justify-start items-start gap-1 flex w-full">
              <div>
                <span className="text-neutral-800 text-sm font-normal leading-tight">
                  Email Address
                </span>
              </div>
              <input
                type="email"
                value={userData?.email || ""}
                className={`w-full h-11 px-3.5 py-3 bg-white rounded-[5px] border border-neutral-200 focus:shadow-none flex-col justify-start items-start flex text-black placeholder-gray-400 text-sm font-normal leading-tight`}
                name="email"
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
                autoComplete="false"
              />
            </div>
            <div className="flex-col justify-start items-start gap-1 flex w-full">
              <div>
                <span className="text-neutral-800 text-sm font-normal leading-tight">
                  Password{" "}
                </span>
                <span className="text-red-600 text-sm font-normal leading-tight">
                  *
                </span>
              </div>
              <input
                type="text"
                value={userData?.password || ""}
                className={`w-full h-11 px-3.5 py-3 bg-white rounded-[5px] border border-neutral-200 focus:shadow-none flex-col justify-start items-start flex text-black placeholder-gray-400 text-sm font-normal leading-tight`}
                name="password"
                onChange={handleChange}
                required
                placeholder="******"
                autoComplete="false"
              />
            </div>
          </div>
        </div>
        {/* <div className="ms-auto lg:w-[181px] my-5 justify-center items-center gap-1 inline-flex">
          <Link
            href="/forgot-password"
            className="text-cyan-600 text-sm md:text-base font-bold hover:underline leading-tight pointer"
          >
            Forgot Your Password?
          </Link>
        </div> */}
        <div className="flex-col justify-start items-center gap-6 flex w-full mt-6">
          <div className="justify-start items-center gap-[26px] inline-flex w-full">
            <button
              type="submit"
              className="lg:px-[32px] py-4 lg:py-3 bg-orange-600 rounded-[5px] justify-center items-start flex w-full"
            >
              <span className="text-white text-sm font-semibold leading-tight">
                Log In
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
