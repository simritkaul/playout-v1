import {
  setAdditionalPlayers,
  setGameDetails,
  setPlayerName,
} from "@/features/JoinGame/joinGameSlice";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { RootState } from "@/app/store";

const useJoinGame = () => {
  const gameDetails = useSelector((state: RootState) => state.game.gameDetails);

  const joinedPlayer = useSelector(
    (state: RootState) => state.joinGame.playerName
  );
  const additionalPlayers = useSelector(
    (state: RootState) => state.joinGame.additionalPlayers
  );

  const dispatch = useDispatch();
  const joinGameSchema = z
    .object({
      gameId: z.string().nonempty("Game ID is required"),
      playerName: z.string(),
      additionalPlayers: z.array(z.string()).optional(),
    })
    .refine(
      (data) => {
        if (gameDetails?.id) {
          return data.playerName.length > 0;
        }
        return true;
      },
      {
        message: "Please enter your name",
        path: ["playerName"],
      }
    );

  const fetchGameDetails = (gameId: string) => {
    dispatch(
      setGameDetails({
        id: gameId,
        name: "Weekend League",
        size: "7v7",
        date: "2025-02-16",
        time: "10:00",
        locationUrl: "https://www.google.com",
        matchFee: 180,
        lineup: ["Niks", "Saket", "Sushant", "Dev"],
        availableSlots: 10,
        waitingList: [],
      })
    );
  };

  const addPlayerName = (playerName: string) => {
    console.log("__ADDING PLAYER NAME__", playerName);
    dispatch(setPlayerName(playerName));
  };

  const addAdditionalPlayers = (players: string[]) => {
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
      waitingList.push(joinedPlayer);
    }
    if (newAvailableSlots === 0) {
      waitingList.push(...additionalPlayers);
    }

    // Handle lineup
    let newLineup = gameDetails?.lineup || [];
    if (newAvailableSlots > 0) {
      newLineup = [...newLineup, joinedPlayer, ...additionalPlayers];
    }

    dispatch(
      setGameDetails({
        id: gameId,
        name: "Weekend League",
        size: "7v7",
        date: "2025-02-16",
        time: "10:00",
        locationUrl: "https://www.google.com",
        matchFee: 180,
        lineup: newLineup,
        availableSlots: newAvailableSlots,
        waitingList: waitingList,
      })
    );
  };

  return {
    joinGameSchema,
    fetchGameDetails,
    addPlayerName,
    addAdditionalPlayers,
    handleAPICall,
  };
};

export default useJoinGame;
