import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import useCreateGame from "@/app/hooks/useCreateGame";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import LinkModal from "@/components/CreateGame/LinkModal";
import { GAME_SIZES } from "@/Constants";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "@/features/CreateGame/createGameSlice";
import { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { setGameDetails } from "@/features/Game/gameSlice";
import { GameDetails } from "@/types/Types";

const CreateGame = () => {
  const { control, register, handleSubmit, errors, gameSchema } =
    useCreateGame();

  const gameCreated = useSelector(
    (state: RootState) => state.createGame.gameCreated
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const generateGameId = () => {
    return nanoid(6); // 6 characters
  };

  type GameFormData = z.infer<typeof gameSchema>;

  const onSubmit = async (data: GameFormData) => {
    toast.success("Game Created Successfully");

    const gameId = generateGameId();

    // Save game details in Game Details
    const gameDetails: GameDetails = {
      ...data,
      id: gameId,
      name: data.name || "",
      size: data.size || 0,
      date: data.date || "",
      time: data.time || "",
      locationUrl: data.locationUrl || "",
      matchFee: data.matchFee || 0,
      lineup: [],
      availableSlots: data.size ? data.size * 2 : 2,
      waitingList: [],
      createdBy: user?.email || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(setGameDetails(gameDetails));

    // API call to create game

    // Simulating game creation and link generation
    const generatedLink = `${
      import.meta.env.VITE_API_BASE_URL_LOCAL
    }/join/${gameId}`;
    dispatch(createGame(generatedLink));
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        {/* Static Dimmed Overlay */}
        {gameCreated && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-40" />
        )}

        {/* <AnimatePresence> */}
        {gameCreated && <LinkModal />}
        {/* </AnimatePresence> */}
        <Card className="w-full max-w-3xl shadow-2xl rounded-2xl">
          <CardContent className="p-10 space-y-10">
            <h2 className="text-4xl font-extrabold text-center text-blue-700">
              Create New Football Game
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Game Name */}
              <div>
                <Label htmlFor="name">Game Name</Label>
                <Input
                  id="name"
                  placeholder="Friendly Match"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="size">
                  Game Size <span className="text-red-600">*</span>
                </Label>
                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose game size" />
                      </SelectTrigger>
                      <SelectContent>
                        {GAME_SIZES.map((size) => (
                          <SelectItem
                            key={size.size}
                            value={size.size.toString()}
                          >
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.size && (
                  <p className="text-red-600">{errors.size.message}</p>
                )}
              </div>

              {/* Date Picker */}
              <div>
                <Label htmlFor="date">
                  Game Date <span className="text-red-600">*</span>
                </Label>
                <Input type="date" id="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-600 mt-1">{errors.date.message}</p>
                )}
              </div>

              {/* Time Picker */}
              <div>
                <Label htmlFor="time">
                  Game Time <span className="text-red-600">*</span>
                </Label>
                <Input type="time" id="time" {...register("time")} />
                {errors.time && (
                  <p className="text-red-600 mt-1">{errors.time.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="locationUrl">Location URL</Label>
                <Input
                  id="locationUrl"
                  placeholder="https://maps.google.com/..."
                  {...register("locationUrl")}
                />
                {errors.locationUrl && (
                  <p className="text-red-600">{errors.locationUrl.message}</p>
                )}
              </div>

              {/* Match Fee */}
              <div>
                <Label htmlFor="matchFee">
                  Match Fee Per Person (₹){" "}
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  id="matchFee"
                  {...register("matchFee", { valueAsNumber: true })}
                />
                {errors.matchFee && (
                  <p className="text-red-600 mt-1">{errors.matchFee.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-300"
                >
                  Create Game
                </Button>
              </div>
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
      </div>
    </>
  );
};

export default CreateGame;
