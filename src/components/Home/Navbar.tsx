import { User } from "firebase/auth";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";
import { Toaster } from "react-hot-toast";

interface NavbarProps {
  loginWithGoogle: () => void;
  user: User | null;
  logout: () => void;
}

const Navbar = ({ loginWithGoogle, logout, user }: NavbarProps) => {
  const isUser = !!user;

  console.log(user);

  return (
    <>
      <Toaster />
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-600">PlayOut</h1>
        <nav>
          {!isUser && (
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={loginWithGoogle}
            >
              Log In
            </Button>
          )}
          {isUser && <UserAvatar user={user} logout={logout} />}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
