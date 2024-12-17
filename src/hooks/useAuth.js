// // hooks/useAuth.js
// import { useState, useEffect, useContext, createContext } from "react";
// import firebase from "@/utils/firebaseConfig";
// import { useRouter } from "next/router";

// const authContext = createContext();

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export const useAuth = () => {
//   return useContext(authContext);
// };

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   // const account = useActiveAccount();
//   // const address = account?.address;
//   const { address } = useAccount();
//   const router = useRouter();

//   const signInWithGoogle = async () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     try {
//       const result = await firebase.auth().signInWithPopup(provider);
//       setUser(result.user);
//       // console.log("result.user", result.user);
//       router.push(window.location.href);
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//     }
//   };

//   const signUpWithEmail = async (email, password) => {
//     try {
//       const result = await firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password);
//       setUser(result.user);
//       router.push(window.location.href); // Redirect to dashboard or any protected page
//     } catch (error) {
//       console.error("Error signing up with email and password:", error);
//       throw new Error(error.message);
//     }
//   };

//   const signInWithEmail = async (email, password) => {
//     try {
//       const result = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);
//       setUser(result.user);
//       router.push(window.location.href); // Redirect to dashboard or any protected page
//     } catch (error) {
//       console.error("Error signing in with email and password:", error);
//       throw new Error(error.message);
//     }
//   };

//   // const signout = async () => {
//   //   try {
//   //     await firebase.auth().signOut();
//   //     setUser(null);
//   //   } catch (error) {
//   //     console.error("Error signing out:", error);
//   //   }
//   // };

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return {
//     user,
//     signInWithGoogle,
//     signUpWithEmail,
//     signInWithEmail,
//     signout,
//   };
// }

// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { useActiveAccount } from "thirdweb/react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();
//   const address = useAddress();

//   const signout = async () => {
//     try {
//       setUser(null);
//       console.log("token deleted!");
//       localStorage.removeItem("token");
//       router.push("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (address) {
//         try {
//           const token = localStorage.getItem("token");
//           console.log("token :", token);
//           if (token) {
//             const response = await axios.get("/api/auth/me", {
//               headers: { Authorization: `Bearer ${token}` },
//             });
//             if (response.data.user) {
//               setUser(response.data.user);
//             } else {
//               setUser(null);
//               localStorage.removeItem("token");
//             }
//           } else {
//             const response = await axios.post("/api/auth/login", {
//               wallet_address: address,
//             });
//             if (response.data.user) {
//               setUser(response.data.user);
//               localStorage.setItem("token", response.data.token);
//             } else {
//               setUser(null);
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           setUser(null);
//           localStorage.removeItem("token");
//         }
//       } else {
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, [address]);

//   return {
//     user,
//     signout,
//   };
// }

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();
  // const address = useAddress();
  const account = useActiveAccount();
  const address = account?.address;
  console.log("address :", address);

  const signout = async () => {
    try {
      setUser(null);
      console.log("token deleted!");
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      console.log("fetchUser started");
      if (address) {
        try {
          const token = localStorage.getItem("token");
          console.log("token :", token);
          if (token) {
            console.log("verifying token");
            const response = await axios.get("/api/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.user) {
              console.log("user data from token:", response.data.user);
              setUser(response.data.user);
            } else {
              console.log("token invalid, removing token");
              setUser(null);
              localStorage.removeItem("token");
            }
          } else {
            console.log("no token, fetching user with address");
            const response = await axios.post("/api/auth/login", {
              wallet_address: address,
            });
            if (response.data.user) {
              console.log("user data from login:", response.data.user);
              setUser(response.data.user);
              localStorage.setItem("token", response.data.token);
            } else {
              console.log("user not found");
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
      console.log("fetchUser finished");
    };
    fetchUser();
  }, [address]);

  return {
    user,
    signout,
    loading, // Expose the loading state
  };
}
