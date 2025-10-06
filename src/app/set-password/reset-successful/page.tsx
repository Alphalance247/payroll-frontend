"use client";
import Image from "next/image";
import Button from "../../common/Button";
import Link from "next/link";

const PasswordResetSuccessfull = () => {
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
            <Image
              src="/assets/login/mark.svg"
              width={60}
              height={60}
              alt="mark"
              className="mx-auto"
            />

            <h2 className="text-2xl font-semibold text-[#262626] mt-6 text-center">
              Password change successful
            </h2>

            <div className="mt-8">
              <Link href={"/login"}>
                <Button className="w-full" variant="primary" btnType="button">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetSuccessfull;
