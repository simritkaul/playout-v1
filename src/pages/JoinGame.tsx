import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useJoinGame from "@/app/hooks/useJoinGame";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  UserPlus,
  X,
  Users,
  CalendarDays,
  Clock,
  UsersRound,
  ReceiptIndianRupee,
  MapPinned,
} from "lucide-react";
import LineupItem from "@/components/JoinGame/LineupItem";
import InfoCard from "@/components/JoinGame/InfoCard";
import { GAME_SIZES } from "@/Constants";
import { convertTo12HourFormat, getFormattedDate } from "@/helper";
const JoinGame = () => {
  const { gameId: urlGameId } = useParams();
  const [additionalPlayerInputs, setAdditionalPlayerInputs] = useState<
    string[]
  >([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const gameDetails = useSelector((state: RootState) => state.game.gameDetails);
  const hasJoined = useSelector((state: RootState) => state.joinGame.isJoined);

  const {
    joinGameSchema,
    fetchGameDetails,
    addAdditionalPlayers,
    handleAPICall,
  } = useJoinGame();

  type JoinGameFormData = z.infer<typeof joinGameSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinGameFormData>({
    resolver: zodResolver(joinGameSchema),
    defaultValues: {
      gameId: urlGameId ?? "",
      additionalPlayers: [],
    },
  });

  console.log("__GAME DETAILS__", gameDetails);
  console.log("__HAS JOINED__", hasJoined);

  useEffect(() => {
    if (urlGameId) {
      console.log("__FETCHING GAME DETAILS__", urlGameId);
      fetchGameDetails(urlGameId);
    }
  }, [urlGameId]);

  const onSubmit = (data: JoinGameFormData) => {
    if (!gameDetails && data.gameId) {
      fetchGameDetails(data.gameId);
      return;
    }

    // Check if player already in lineup or waiting list
    if (hasJoined) {
      toast.error("You are already in the lineup!");
      return;
    }

    if (gameDetails?.waitingList.some((player) => player.id === user?.uid)) {
      toast.error("You are already in the waiting list!");
      return;
    }

    const addedAdditionalPlayers = additionalPlayerInputs.map((player) => ({
      name: player,
      withPlayer: user?.uid ?? null,
    }));
    addAdditionalPlayers(addedAdditionalPlayers);
    handleAPICall(data.gameId);
    toast.success("Successfully joined the game!");
  };

  const addPlayerInput = () =>
    setAdditionalPlayerInputs([...additionalPlayerInputs, ""]);

  const removePlayerInput = (index: number) =>
    setAdditionalPlayerInputs(
      additionalPlayerInputs.filter((_, i) => i !== index)
    );

  const getTitle = () => {
    if (gameDetails) {
      return `Join ${gameDetails.name ?? "Game"}`;
    }

    return "Join Game";
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl space-y-6"
        >
          <h1 className="mt-5 md:mt-16 text-center text-4xl font-bold text-blue-700">
            {getTitle()}
          </h1>
          {gameDetails && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <InfoCard
                  icon={<CalendarDays />}
                  value={getFormattedDate(gameDetails.date)}
                  description="Date of the game"
                />
                <InfoCard
                  icon={<Clock />}
                  value={convertTo12HourFormat(gameDetails.time)}
                  description="Time of the game"
                />
                <InfoCard
                  icon={<UsersRound />}
                  value={
                    GAME_SIZES.find(
                      (s) => Number(s.size) === Number(gameDetails.size)
                    )?.name ?? "-"
                  }
                  description="Format of the game"
                />
                <InfoCard
                  icon={<ReceiptIndianRupee />}
                  description="Match Fee for the game"
                  value={gameDetails.matchFee.toString()}
                />
              </div>
              <InfoCard
                icon={<MapPinned />}
                description="Location URL for the game"
                customJsx={
                  <a href={gameDetails.locationUrl} target="_blank">
                    {gameDetails.locationUrl}
                  </a>
                }
              />
            </>
          )}
          <Card className="shadow-lg border border-blue-200">
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {!gameDetails && (
                  <div>
                    <Label htmlFor="gameId">Game ID</Label>
                    <Input
                      id="gameId"
                      {...register("gameId")}
                      placeholder="Enter Game ID"
                    />
                    {errors.gameId && (
                      <p className="text-red-600 mt-1">
                        {errors.gameId.message}
                      </p>
                    )}
                  </div>
                )}
                {gameDetails && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addPlayerInput}
                    >
                      <UserPlus className="mr-2 h-4 w-4" /> Add Friend
                    </Button>
                    {additionalPlayerInputs.map((_, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Friend ${index + 1}'s name`}
                          value={additionalPlayerInputs[index]}
                          onChange={(e) => {
                            const newInputs = [...additionalPlayerInputs];
                            newInputs[index] = e.target.value;
                            setAdditionalPlayerInputs(newInputs);
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePlayerInput(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {gameDetails ? "Join Game" : "Find Game"}
                </Button>
                <div className="text-center">
                  <Button
                    type="button"
                    variant={"outline"}
                    className="w-full"
                    asChild
                  >
                    <Link to="/">Back</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {gameDetails && (
            <Card className="shadow-lg border border-blue-200">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center">
                  <Users className="mr-2" /> Lineup & Slots
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gameDetails.lineup.map((player, index) => (
                    <LineupItem
                      isEmptySlot={false}
                      player={player.name}
                      index={index}
                    />
                  ))}
                  {Array.from({ length: gameDetails.availableSlots }).map(
                    (_, index) => (
                      <LineupItem
                        isEmptySlot={true}
                        player={""}
                        index={index}
                      />
                    )
                  )}
                </div>
                {gameDetails.waitingList.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-red-600">Waitlist</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {gameDetails.waitingList.map((player, index) => (
                        <div
                          key={index}
                          className="p-3 bg-red-100 shadow rounded-lg text-center"
                        >
                          <p className="font-semibold text-red-600">
                            {player.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Waitlist {index + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default JoinGame;
