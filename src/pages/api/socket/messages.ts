import authOptions from "@/lib/authoptions";
import MemberShipModel from "@/models/member-ship";
import MessageModel from "@/models/message";
import ServerModel from "@/models/server";
import { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // Hadnle only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  //   Get session
  const session = await getServerSession(req, res, authOptions);

  try {
    const user = session?.user;
    const { content } = req.body;
    const { serverId } = req.query;

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if content is provided
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Check if serverId is provided
    if (!serverId) {
      return res.status(400).json({ error: "Server ID is required" });
    }

    const server = await ServerModel.findById(serverId);

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const memberShip = await MemberShipModel.findOne({
      user: user.id,
      server: serverId,
    });

    if (!memberShip) {
      return res
        .status(403)
        .json({ error: "User is not member of this server" });
    }

    const createdMessage = await MessageModel.create({
      content: content,
      userId: user.id,
      serverId: serverId,
    });

    const message = await MessageModel.findById(createdMessage._id).populate(
      "userId"
    );

    const chatKey = `chat:${serverId}:messages`;

    res.socket.server.io.emit(chatKey, message);

    return res.status(201).json({ message });
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
