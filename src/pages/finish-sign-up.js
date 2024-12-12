// pages/finishSignIn.js
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import firebase from '@/utils/firebaseConfig'

const FinishSignIn = () => {
  const router = useRouter();
  const walletAddress = useAddress();
  const { signInWithEmailLink } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(!walletAddress) return;
    const emailLink = window.location.href;
    const email = window.localStorage.getItem('emailForSignIn');
    const redirectSuccessedUrl = window.localStorage.getItem('redirectSuccessedUrl');
    console.log('emailLink',emailLink);
    console.log('email',email);
    console.log('walletAddress',walletAddress);
    console.log('redirectSuccessedUrl',redirectSuccessedUrl);
    // return;

    if (firebase.auth().isSignInWithEmailLink(emailLink)) {
      if (!email || !walletAddress) {
        setMessage('No email or wallet address found for sign-in');
        return;
      }

      signInWithEmailLink(email, emailLink, walletAddress)
        .then(() => {
          router.push(redirectSuccessedUrl);
        })
        .catch((error) => {
          console.error('Error signing in with email link:', error);
          setMessage('Failed to sign in');
        });
    }
  }, [router, signInWithEmailLink, walletAddress]);

  return <div>{message ? <p>{message}</p> : <p>Signing in...</p>}</div>;
};

export default FinishSignIn;
