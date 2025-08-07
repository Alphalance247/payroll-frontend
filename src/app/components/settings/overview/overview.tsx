import Button from "@/app/common/Button";
import HeadingSubHead from "@/app/common/headingSubHead";
import Image from "next/image";
import Link from "next/link";

const Overview = () => {
  const data = [
    {
      heading: "Profile Settings",
      subhead: "you",
      btnLink: "/settings/account",
    },
    {
      heading: "Notifications",
      subhead: "you",
      btnLink: "/settings/notifications",
    },

    {
      heading: "Payroll Settings",
      subhead: "you",
      btnLink: "/settings/payroll-settings",
    },
    {
      heading: "Integrations",
      subhead: "you",
      btnLink: "/settings/integrations",
    },
    {
      heading: "Company Information",
      subhead: "you",
      btnLink: "/settings/company-info",
    },
    {
      heading: "Permissons",
      subhead: "you",
      btnLink: "/settings/permissions",
    },
    {
      heading: "Audit Logs",
      subhead: "you",
      btnLink: "/settings/audit-logs",
    },
    {
      heading: "Billing Info",
      subhead: "you",
      btnLink: "/settings/billing-info",
    },
  ];
  return (
    <section>
      <div className="mb-10">
        <HeadingSubHead heading="Overview" subHead="nill" withSubHead={false} />
      </div>

      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((data, i) => (
          <div
            className="rounded-2xl border border-[#E3E3E5] p-6 shadow-md"
            key={i}
          >
            <Image
              src="/assets/settings/Icon.svg"
              width={40}
              height={40}
              alt="overview icon"
            />
            <h5 className="mt-4 mb-2 text-base text-[#2F2F33] font-semibold">
              {data?.heading}
            </h5>
            <p className="mb-10 text-[#71717A] text-sm">
              Lorem ipsum dolor sit amet consectetur. Sit dignissim elementum
              faucibus habitasse at nunc.
            </p>
            <Link href={data?.btnLink || "/settings"}>
              <Button variant="secondary" className="w-full">
                View
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
