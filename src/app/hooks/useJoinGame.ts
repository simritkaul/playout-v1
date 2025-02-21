import { setAdditionalPlayers } from "@/features/JoinGame/joinGameSlice";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { RootState } from "@/app/store";
import { Player } from "@/types/Types";
import { setGameDetails } from "@/features/Game/gameSlice";

const useJoinGame = () => {
  const gameDetails = useSelector((state: RootState) => state.game.gameDetails);

  const additionalPlayers = useSelector(
    (state: RootState) => state.joinGame.additionalPlayers
  );

  const dispatch = useDispatch();
  const joinGameSchema = z.object({
    gameId: z.string().nonempty("Game ID is required"),
    additionalPlayers: z.array(z.string()).optional(),
  });

  const fetchGameDetails = (gameId: string) => {
    dispatch(
      setGameDetails({
        id: gameId,
        name: "Weekend League",
        size: 7,
        date: "2025-02-16",
        time: "10:00",
        locationUrl: "https://www.google.com",
        matchFee: 180,
        lineup: [
          { id: "1", name: "Niks", withPlayer: null },
          { id: "2", name: "Saket", withPlayer: "1" },
          { id: "3", name: "Sushant", withPlayer: "1" },
          { id: "4", name: "Dev", withPlayer: "1" },
        ],
        availableSlots: 10,
        waitingList: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "1",
      })
    );
  };

  const addAdditionalPlayers = (players: Player[]) => {
    console.log("__ADDING ADDITIONAL PLAYERS__", players);
    dispatch(setAdditionalPlayers(players));
  };

  const handleAPICall = async (gameId: string) => {
    let newAvailableSlots = (gameDetails?.availableSlots || 0) - 1;
    if (additionalPlayers.length > 0) {
      newAvailableSlots -= additionalPlayers.length;
    }

    if (newAvailableSlots < 0) {
      newAvailableSlots = 0;
    }

    // Handle waiting list
    const waitingList = gameDetails?.waitingList || [];
    if (newAvailableSlots === 0) {
      waitingList.push({ id: "5", name: "John Doe", withPlayer: null });
    }
    if (newAvailableSlots === 0) {
      waitingList.push(
        ...additionalPlayers.map((player) => ({
          id: player.id,
          name: player.name,
          withPlayer: player.withPlayer,
        }))
      );
    }

    // Handle lineup
    let newLineup = gameDetails?.lineup || [];
    if (newAvailableSlots > 0) {
      newLineup = [
        ...newLineup,
        ...additionalPlayers.map((player) => ({
          id: player.id,
          name: player.name,
          withPlayer: player.withPlayer,
        })),
      ];
    }

    dispatch(
      setGameDetails({
        id: gameId,
        name: gameDetails?.name || "",
        size: gameDetails?.size || 0,
        date: gameDetails?.date || "",
        time: gameDetails?.time || "",
        locationUrl: gameDetails?.locationUrl || "",
        matchFee: gameDetails?.matchFee || 0,
        lineup: newLineup,
        availableSlots: newAvailableSlots,
        waitingList: waitingList,
        createdAt: gameDetails?.createdAt || "",
        updatedAt: new Date().toISOString(),
        createdBy: gameDetails?.createdBy || "",
      })
    );
  };

  return {
    joinGameSchema,
    fetchGameDetails,
    addAdditionalPlayers,
    handleAPICall,
  };
};

export default useJoinGame;
