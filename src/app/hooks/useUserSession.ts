import { setUser } from "@/features/Auth/authSlice";
import { auth, signInWithGooglePopup } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useUserSession = () => {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
    toast.success("Logged out successfully");
  };

  return { loginWithGoogle, logout };
};

export default useUserSession;
