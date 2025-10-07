"use client";
import Heading from "./common/heading";
import { useAuth } from "./context/authContext";
export default function Home() {
  const { user } = useAuth();

  const date = new Date();
  date.getUTCDay();

  return (
    <main className="p-10 overflow-y-scroll h-full">
      <Heading
        flexDirection=""
        user={
          user?.fullname ? `Welcome, ${user.fullname}` : "Good afternoon, User"
        }
        subHead="This is the home page coming sooon......."
      />
    </main>
  );
}
