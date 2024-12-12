import InputText from './InputText'
import Button from './Button'
import { useState } from 'react';

const FormSigninWithEmail = (props) => {
  const [formAuth, setFormAuth] = useState({email: '', password: ''});

  return (
    <div>
      <form 
        className="w-full flex flex-col gap-[20px]"
        onSubmit={(e) => {
          e.preventDefault()
          props.handleEmailLogin(formAuth.email, formAuth.password)
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
        {props.isError &&
          <div className="text-red-500 text-center">Email or password not found!</div>
        }
        <Button 
          type="submit" 
          color="primary"
          className="w-full"
          disabled={props.isLoading}
        >
          {props.isLoading ? 'Loading...' : 'Login with Email'}
        </Button>
      </form>
    </div>
  )
}

export default FormSigninWithEmail