import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";
import React from "react";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoy from "@/components/DeliveryBoy";

async function Home() {
  await connectDb();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }

  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role);

  if (inComplete) {
    return <EditRoleMobile />;
  }

  const plainUser = JSON.parse(JSON.stringify(user));
  // console.log(plainUser)
  // console.log(user)

  return (
    <div>
      <>
        <Nav user={plainUser} />
        {user.role == "user" ? (
          <UserDashboard />
        ) : user.role == "admin" ? (
          <AdminDashboard />
        ) : (
          <DeliveryBoy />
        )}
      </>
    </div>
  );
}
export default Home;
