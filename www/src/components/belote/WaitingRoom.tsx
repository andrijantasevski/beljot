import { useBeloteContext } from "@/pages/rooms/[roomId]";

export default function WaitingRoom() {
  const { socketConnectionStatus, socket, roomData } = useBeloteContext();

  return (
    <section className="shadow-lg p-8 rounded-lg w-full grid grid-cols-2">
      {roomData &&
        roomData.players.map((player) => (
          <div>
            <div className="w-20 h-20 rounded-full bg-primary-200"></div>
            <div key={player.player_name}>{player.player_name}</div>
          </div>
        ))}

      {roomData &&
        [...Array(4 - roomData.players.length)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-20 rounded-full bg-base-500 animate-pulse"
          ></div>
        ))}
    </section>
  );
}
