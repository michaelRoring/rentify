// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/utils/firebaseConfig';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      setUser(result.user);
      // console.log("result.user", result.user);
      router.push(window.location.href);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(result.user);
      router.push(window.location.href); // Redirect to dashboard or any protected page
    } catch (error) {
      console.error('Error signing up with email and password:', error);
      throw new Error(error.message);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(result.user);
      router.push(window.location.href); // Redirect to dashboard or any protected page
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw new Error(error.message);
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signout,
  };
}
