import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

const TeamCard = ({
  link,
  teamName,
  teamLead,
  teamCount,
}: {
  link: string;
  teamName: string;
  teamLead: string;
  teamCount: string;
}) => {
  return (
    <div className="bg-[white] border-2 border-[#E0E6ED] rounded-lg shadow-xl p-3">
      <Image
        src="/assets/employees-management/group.svg"
        width={101}
        height={22}
        alt="group pic"
        className="mx-auto"
      />
      <div className="flex flex-col gap-y-4 mt-4">
        <div className="flex gap-x-11">
          <p className="text-base text-[#3B3F5C] tracking-[0.14px]">
            Team Name:
          </p>
          <p className="tracking-[0.1px] text-[#3B3F5C] text-base font-semibold">
            {teamName}
          </p>
        </div>
        <div className="flex gap-x-11">
          <p className="text-base text-[#3B3F5C] tracking-[0.14px]">
            Team Lead:
          </p>
          <p className="tracking-[0.1px] text-[#3B3F5C] text-base font-semibold">
            {teamLead}
          </p>
        </div>
        <div className="flex gap-x-11">
          <p className="text-base text-[#3B3F5C] tracking-[0.14px] ">
            Members:
          </p>
          <p className="tracking-[0.1px] text-[#3B3F5C] text-base font-semibold">
            {teamCount}
          </p>
        </div>
      </div>
      <Link href={link || "/"}>
        <Button className="mt-4 w-full" variant="tertiary">
          Manage Team
        </Button>
      </Link>
    </div>
  );
};

export default TeamCard;
