import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { resetCreateGame } from "@/features/CreateGame/createGameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { GET_SHARE_MESSAGE } from "@/helper";
import { FaWhatsapp, FaRegCopy } from "react-icons/fa6";
import { TooltipContent } from "../ui/tooltip";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";
const LinkModal = () => {
  const gameLink = useSelector((state: RootState) => state.createGame.gameLink);
  const gameDetails = useSelector((state: RootState) => state.game.gameDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    if (gameDetails?.id) {
      navigate(`/join/${gameDetails?.id}`);
    } else {
      navigate("/");
    }
    dispatch(resetCreateGame());
  };

  const copyToClipboard = async () => {
    const message = GET_SHARE_MESSAGE(gameDetails, gameLink);
    try {
      // Try the modern clipboard API first
      await navigator.clipboard.writeText(message || "");
      toast.success("Game link copied to clipboard!");
    } catch (err) {
      // Fallback method using a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = message || "";
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast.success("Game link copied to clipboard!");
      } catch (err) {
        document.body.removeChild(textarea);
        toast.error("Failed to copy link. Please copy manually.");
      }
    }
  };

  const shareOnWhatsapp = () => {
    const message = GET_SHARE_MESSAGE(gameDetails, gameLink);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <motion.div
        className="fixed flex justify-center items-center z-50 md:w-[60%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[90%] md:w-full max-w-lg p-6 shadow-2xl bg-white rounded-2xl">
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            Game Created Successfully 🎉
          </h2>
          <p className="mt-4 text-center text-gray-700">
            Share this link with your friends to join the game:
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <span className="text-sm break-all">{gameLink}</span>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="ml-2"
                      variant={"outline"}
                      onClick={copyToClipboard}
                    >
                      <FaRegCopy />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black">
                    <p>Copy Link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={shareOnWhatsapp}
                      className="ml-2 bg-green-500 hover:bg-green-600"
                    >
                      <FaWhatsapp />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black">
                    <p>Share on WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={handleCloseModal} className="w-full bg-blue-600">
              Close
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default LinkModal;
