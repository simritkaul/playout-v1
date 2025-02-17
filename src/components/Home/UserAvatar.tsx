import { User } from "firebase/auth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/helper";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface UserAvatarProps {
  user: User | null;
  logout: () => void;
}

const UserAvatar = ({ user, logout }: UserAvatarProps) => {
  const navigate = useNavigate();
  if (!user) return null;

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer hover:scale-110 transition-all duration-300">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback className="bg-blue-600 text-white hover:bg-blue-700">
              {getUserInitials(user.displayName)}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[16rem] mr-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-neutral-700">{user.displayName}</p>

            <Button
              onClick={handleProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Profile
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserAvatar;
