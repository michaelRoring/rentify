import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const account = useActiveAccount();
  const address = account?.address;

  const signout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (address) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            console.log("verifying token");
            const response = await axios.get("/api/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.user) {
              setUser(response.data.user);
            } else {
              setUser(null);
              localStorage.removeItem("token");
            }
          } else {
            const response = await axios.post("/api/auth/login", {
              wallet_address: address,
            });
            if (response.data.user) {
              setUser(response.data.user);
              localStorage.setItem("token", response.data.token);
            } else {
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [address]);

  return {
    user,
    signout,
    loading, // Expose the loading state
  };
}
