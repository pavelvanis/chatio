import ChatInput from "@/components/chat/chat-input";
import ChatMasseges from "@/components/chat/chat-messages";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <ChatMasseges apiUrl="/api/chat" socketUrl="/api/socket/messages" />
      <ChatInput />
    </div>
  );
}
