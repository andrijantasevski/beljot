import { useContext, createContext } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import WaitingRoom from "@/components/belote/WaitingRoom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type BeloteContext = {
  socket: Socket | null;
  socketConnectionStatus: SocketConnectionStatus;
  roomData: RoomData | null;
};

const BeloteContext = createContext<BeloteContext | null>(null);

export const useBeloteContext = () => {
  const context = useContext(BeloteContext);

  if (!context) {
    throw new Error(
      "Belote context must be used within a BeloteContextProvider."
    );
  }

  return context;
};

type SocketConnectionStatus = "loading" | "connected" | "disconnected";
type RoomStatus = "loading" | "not-found" | "room-exists";

type RoomData = {
  id: number;
  players: {
    player_name: string;
  }[];
};

export default function BeloteContextLayout() {
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnectionStatus, setSocketConnectionStatus] =
    useState<SocketConnectionStatus>("loading");

  const [roomStatus, setRoomStatus] = useState<RoomStatus>("loading");

  const [roomData, setRoomData] = useState<RoomData | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const socketConnection = io("http://localhost:3000", {
        path: "/api/socket/",
        query: { roomId: router.query.roomId },
      });

      socketConnection.on("connect", () => {
        setSocket(socketConnection);
        setSocketConnectionStatus("connected");
      });

      socketConnection.on("disconnect", () => {
        setSocket(null);
        setSocketConnectionStatus("disconnected");
      });

      socketConnection.on("room:exists", (data) => {
        setRoomStatus("room-exists");
        console.log(data);
        setRoomData(data);
      });

      socketConnection.on("room:not-found", () => {
        setRoomStatus("not-found");
      });

      return () => {
        socketConnection.disconnect();
        socketConnection.off("connect");
        socketConnection.off("disconnect");
        socketConnection.off("room:exists");
        socketConnection.off("room:not-found");
      };
    }
  }, [router.isReady]);

  const value = {
    socket,
    socketConnectionStatus,
    roomData,
  };

  return (
    <BeloteContext.Provider value={value}>
      <main className="min-h-screen flex flex-col justify-center items-center w-11/12 max-w-lg mx-auto">
        {socketConnectionStatus === "loading" && roomStatus === "loading" && (
          <div className="flex flex-col justify-center items-center">
            <LoadingSpinner size="large" />
            Connecting you to your Belote room...
          </div>
        )}

        {socketConnectionStatus === "connected" &&
          roomStatus === "room-exists" && <WaitingRoom />}

        {socketConnectionStatus === "connected" &&
          roomStatus === "not-found" && <div>No such room!</div>}
      </main>
    </BeloteContext.Provider>
  );
}
