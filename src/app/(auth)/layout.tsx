import authOptions from "@/lib/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if(session) return redirect("/");
  return <main>{children}</main>;
}
