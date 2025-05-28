const Profile = () => {
  const personalDetails = [
    {
      heading: "Full Name",
      subhead: "Ajibola  Joyner Judas",
    },
    {
      heading: "Employment ID",
      subhead: "0123456789",
    },
    {
      heading: "Birthdate",
      subhead: "29th September",
    },
    {
      heading: "Email",
      subhead: "Adetomiwa@Alluvium.net",
    },
    {
      heading: "Mobile Number",
      subhead: "08134490207",
    },
    {
      heading: "Nationality",
      subhead: "Nigerian",
    },
  ];

  const homeAddress = [
    {
      heading: "Street Address",
      subhead: "2, Abraham Adesanya",
    },
    {
      heading: "City",
      subhead: "Lagos",
    },
    {
      heading: "State",
      subhead: "Lagos",
    },
    {
      heading: "Postal Code",
      subhead: "000000000000",
    },
    {
      heading: "Country",
      subhead: "Nigeria",
    },
  ];

  const NextOfKin = [
    {
      heading: "Full Name",
      subhead: "2Ajibola  Joyner Judas",
    },
    {
      heading: "Relationship",
      subhead: "Sibling",
    },
    {
      heading: "Mobile Number",
      subhead: "08134490207",
    },
    {
      heading: "Email",
      subhead: "Adetomiwa@Alluvium.net",
    },
    {
      heading: "City",
      subhead: "Lagos",
    },
    {
      heading: "Country",
      subhead: "Nigeria",
    },
  ];

  return (
    <section className="mt-8 flex flex-col gap-y-8">
      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
          Personal details
        </h4>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {personalDetails.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
          Home Address
        </h4>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {homeAddress.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
          Next Of Kin
        </h4>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {NextOfKin.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
