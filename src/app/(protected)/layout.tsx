import { Bar } from "@/components";
import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) return redirect("/login");
  return (
    <>
      <Bar />
      <main>{children}</main>
    </>
  );
}
