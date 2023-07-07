import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { UserIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Separator } from "@radix-ui/react-separator";

type CreateRoomForm = {
  player_name: string;
};

export default function Home() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRoomForm>();

  const onSubmit: SubmitHandler<CreateRoomForm> = async (data) => {
    const response = await fetch("http://localhost:3000/api/rooms", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseParsed = await response.json();

    router.push("/rooms/" + responseParsed.id);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <section className="shadow-xl bg-white p-8 rounded-lg max-w-xl w-11/12 mx-auto flex flex-col gap-4">
        <h1 className="font-bold text-3xl text-center">Belote</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="playerName" fontWeight={"medium"}>
              Player name
            </Label>
            <Input
              {...register("player_name", { required: true })}
              id="playerName"
              placeholder="John"
              placeholderOffset="pl-10"
              leadingIcon={<UserIcon className="w-6 h-6 text-base-500" />}
              variant={errors.player_name ? "error" : "primary"}
              errorMessage="Please enter a player name"
            />
          </div>

          <Button>Create a game</Button>
        </form>

        <div className="flex justify-between items-center">
          <Separator />
          <span>or</span>
          <Separator />
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="playerName" fontWeight={"medium"}>
              Player name
            </Label>
            <Input
              {...register("player_name", { required: true })}
              id="playerName"
              placeholder="John"
              placeholderOffset="pl-10"
              leadingIcon={<UserIcon className="w-6 h-6 text-base-500" />}
              variant={errors.player_name ? "error" : "primary"}
              errorMessage="Please enter a player name"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="playerName" fontWeight={"medium"}>
              Game code
            </Label>
            <Input
              {...register("player_name", { required: true })}
              id="playerName"
              placeholder="John"
              placeholderOffset="pl-10"
              leadingIcon={<UserIcon className="w-6 h-6 text-base-500" />}
              variant={errors.player_name ? "error" : "primary"}
              errorMessage="Please enter a player name"
            />
          </div>

          <Button>Join a game</Button>
        </form>
      </section>
    </main>
  );
}
