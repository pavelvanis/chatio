import { SocketIndicator } from "@/components/ui/socket-indicator";

export default function Home() {
  return (
    <div className="flex grow justify-center ">
      <h1>Home</h1>
      <SocketIndicator />
    </div>
  );
}
