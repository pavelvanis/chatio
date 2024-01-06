import ChatInput from "@/components/chat/chat-input";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="grow">Fututer chat</div>
      <ChatInput />
    </div>
  );
}
