import FeatureCard from "@/components/Home/FeatureCard";
import { Button } from "@/components/ui/button";
import { resetAdminControl } from "@/features/Admin/adminSlice";
import { resetGame } from "@/features/Game/gameSlice";
import { resetCreateGame } from "@/features/CreateGame/createGameSlice";
import { resetJoinGame } from "@/features/JoinGame/joinGameSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Home/Navbar";
import useUserSession from "@/app/hooks/useUserSession";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const { loginWithGoogle, logout } = useUserSession();

  const handleCreateNewGame = async () => {
    if (!user) {
      await loginWithGoogle();
      navigate("/create");
    } else {
      navigate("/create");
    }
  };
  const handleJoinNewGame = () => {
    if (!user) {
      loginWithGoogle();
    } else {
      navigate("/join");
    }
  };

  useEffect(() => {
    // Reset all states
    dispatch(resetGame());
    dispatch(resetCreateGame());
    dispatch(resetJoinGame());
    dispatch(resetAdminControl());
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
        <Navbar loginWithGoogle={loginWithGoogle} user={user} logout={logout} />

        <main className="flex-grow flex flex-col items-center justify-center text-center px-8 py-16 space-y-8">
          <motion.h2
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Simplify Your Football Games
          </motion.h2>

          <p className="text-xl text-gray-700 max-w-2xl">
            PlayOut makes it super easy to create, join, and manage football
            matches. No fuss, just football.
          </p>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateNewGame}
              >
                Create New Game
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-gray-100"
                onClick={handleJoinNewGame}
              >
                Join Existing Game
              </Button>
            </motion.div>
          </div>
        </main>

        <section className="py-12 bg-gray-50">
          <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Why Use PlayOut?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <FeatureCard
              title="Fast & Easy"
              description="Create games in just a few clicks and share the link instantly."
            />
            <FeatureCard
              title="Join with One Click"
              description="Players can quickly join using a shared link or game ID."
            />
            <FeatureCard
              title="Powerful Admin Control"
              description="Manage player lists and lock matches when they're full."
            />
          </div>
        </section>

        <footer className="p-6 bg-gray-100 text-center">
          <p>© 2025 PlayOut. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
