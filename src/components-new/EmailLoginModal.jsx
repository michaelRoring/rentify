import { Input } from 'postcss';
import Icon from './Icon'
import InputText from './InputText';
import Button from './Button';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import FormSigninWithEmail from './FormSigninWithEmail'
import FormSignupWithEmail from './FormSignupWithEmail'

const EmailLoginModal = ({walletAddress, ...props}) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formType, setFormType] = useState('signin');

  const handleGoogleLogin = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet and provide the address');
      return;
    }

    setIsLoadingGoogle(true)

    try {
      
      await signInWithGoogle(walletAddress);
    } catch (error) {
      console.error('Error during Google login:', error);
    }

    setIsLoadingGoogle(false)
  };

  const handleEmailLogin = async (email, password) => {
    
    setIsError(false)
    setIsLoadingEmail(true)

    if(!email || !password) {
      alert('Please type your email and password!');
      return;
    }
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Error during Google login:', error);
      setIsError(true)
    }
    setIsLoadingEmail(false)
  };

  const handleEmailRegister = async (email, password) => {
    
    setIsError(false)
    setIsLoadingEmail(true)

    if(!email || !password) {
      alert('Please type your email and password!');
      return;
    }
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error('Error during Google login:', error);
      setIsError(true)
    }
    setIsLoadingEmail(false)
  };

  return (
    <div className="
    fixed 
    p-[20px]
    left-0
    top-0 
    w-full 
    h-full  
    bg-black/60 
    backdrop-blur-lg
    flex 
    justify-center 
    items-center 
    z-40
  ">
      <div className="
        relative 
        w-full
        border
        border-[#4b4b4b]
        rounded-2xl
        backdrop-blur-md 
        bg-[#2929295c]
        flex
        flex-col
        items-center
        overflow-hidden
        shadow-lg
        shadow-[#32B5B520]
        sm:max-w-sm
        md:max-w-md
        md:min-h-[350px]
        py-[40px]
        md:px-[50px]
        px-[20px]
        z-20
      ">
        <button className="absolute right-[16px] top-[16px]" onClick={props.handleClose}>
          <Icon name="icon-close"/>
        </button>
        <div className="text-[24px] front-[500] mb-[40px]">Login with Email</div>
        
        <div className="flex flex-col gap-[40px] w-full">
          <Button 
            type="submit" 
            className="w-full"
            withIcon="icon-google"
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
          >
            {isLoadingGoogle ? 'Loading...' : 'Login with Google'}
          </Button>
          
          <div className="
            relative
            before:absolute
            before:left-0
            before:bottom-[50%]
            before:w-[40%]
            before:h-[1px]
            before:bg-white/20
            after:absolute
            after:right-0
            after:bottom-[50%]
            after:w-[40%]
            after:h-[1px]
            after:bg-white/20
            text-center
          ">or</div>

         {formType == 'signin' ?
            <FormSigninWithEmail 
              handleEmailLogin={handleEmailLogin}
              isLoading={isLoadingEmail}
              isError={isError}
            /> : 
            <FormSignupWithEmail 
              handleEmailRegister={handleEmailRegister}
              isLoading={isLoadingEmail}
              isError={isError}
            />
         }
        </div>

        <div className="text-center mt-[20px]">
          {formType == "signin" 
            ? "Don't have an account?" 
            : "Already have an account?"
          } 
          {" 👉"}
          <button 
            className="text-[#0D7373] font-semibold"
            onClick={() => setFormType(prev => prev == 'signin' ? 'signup' : 'signin')}
          >
            {formType == 'signin' 
              ? "Create an account"
              : "Please Signin"
            }
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default EmailLoginModal;