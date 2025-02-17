import { GameDetails } from "./types/Types";

export const convertTo12HourFormat = (time24: string | null) => {
  if (!time24) {
    return "";
  }
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

export const GET_SHARE_MESSAGE = (
  gameDetails: GameDetails | null,
  gameLink: string | null
) => {
  if (!gameDetails || !gameLink) {
    return "";
  }

  // Convert date to dd-mmm-yyyy
  const date = new Date(gameDetails.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Convert time to 12 hour format (gameDetails.time eg 18:23)
  const formattedTime = convertTo12HourFormat(gameDetails.time);

  return `
⚽️ *You're Invited to Join a Football Game!* 🏆

📍 *Game Details:*  
- 🏟️ Location: ${gameDetails.locationUrl}  
- 🗓️ Date: ${formattedDate}  
- 🕒 Time: ${formattedTime}  
- 🧍‍♂️ Available Slots: ${gameDetails.availableSlots} 
- 💰 Match Fee: ₹${gameDetails.matchFee}

🔗 *Join the Game Now:*  
${gameLink}

Let's have some fun on the field! 🌟 
  `;
};

export const getUserInitials = (fullName: string) => {
  return fullName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};
