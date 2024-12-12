import InputText from './InputText'
import Button from './Button'
import { useState } from 'react';

const FormSignupWithEmail = (props) => {
  const [formAuth, setFormAuth] = useState({email: '', password: '', confirmPassword: ''});
  const [isError, setIsError] = useState(false);
  return (
    <div>
      <form 
        className="w-full flex flex-col gap-[20px]"
        onSubmit={(e) => {
          e.preventDefault()
          
          setIsError(false)
          
          if(formAuth.password != formAuth.confirmPassword) {
            setIsError(true)
            return;
          }

          props.handleEmailRegister(formAuth.email, formAuth.password)
        }}
      >

        <InputText 
          type="email"
          label="Your Email"
          placeholder="yourname@mail.com"
          value={formAuth.email}
          onChange={e => setFormAuth(prev => ({...prev, email: e.target.value}))}
          required
        />
        <InputText 
          type="password"
          label="Passsword"
          placeholder="******"
          value={formAuth.password}
          onChange={e => setFormAuth(prev => ({...prev, password: e.target.value}))}
          required
        />
        <InputText 
          type="password"
          label="Confirm Passsword"
          placeholder="******"
          value={formAuth.confirmPassword}
          onChange={e => setFormAuth(prev => ({...prev, confirmPassword: e.target.value}))}
          required
        />
        {isError &&
          <div className="text-red-500 text-center">Confirm Password does not match!</div>
        }
        {props.isError &&
          <div className="text-red-500 text-center">Account already registed</div>
        }
        <Button 
          type="submit" 
          color="primary"
          className="w-full"
          disabled={props.isLoading}
        >
          {props.isLoading ? 'Loading...' : 'Register account'}
        </Button>
      </form>
    </div>
  )
}

export default FormSignupWithEmail