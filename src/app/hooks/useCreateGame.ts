import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useCreateGame = () => {
  // Zod Schema
  const gameSchema = z.object({
    name: z.string().optional(),
    size: z.number().min(2, "Invalid game size"),
    date: z.string().nonempty("Date is required"),
    time: z.string().nonempty("Time is required"),
    locationUrl: z
      .string()
      // .url("Please enter a valid Google Maps link")
      .optional(),
    matchFee: z.number().min(0, "Match fee cannot be negative"),
  });

  type GameFormData = z.infer<typeof gameSchema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
  });

  return {
    control,
    register,
    handleSubmit,
    errors,
    gameSchema,
  };
};

export default useCreateGame;
