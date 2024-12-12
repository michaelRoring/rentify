import {useState} from 'react'
import {useRouter} from 'next/router'
import { Button, Container, InputText } from '@/components'
import { signIn } from "next-auth/react"

export default function SigninPage() {
	const router = useRouter()

	const [form, setForm] = useState({email: '', password: ''})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)


	const handleSignIn = async (e) => {
		e.preventDefault();
		setIsLoading(true)
    setError(null)

		const res = await signIn("credentials", {
			email: form.email,
			password: form.password,
			redirect: false
		})

		if(!res.ok) {
			setError('Email atau password Anda salah!')
			setIsLoading(false)
			return;
		}

    router.push('/')
	}

	return (
    <div className="bg-[#F4F7FC] h-screen">
		<Container>
			<div className="
				py-[100px]
				w-full 
				sm:max-w-sm 
				mx-auto
			">
				<div className="p-[40px] bg-white">
          <div className="pb-[20px] text-center">
            <div className="text-[24px] font-[700] mb-[4px]">Login</div>
            {/* <div className="text-[14px] text-gray-400">Silahkan masukkan username dan password Anda.</div> */}
            </div>
            {error &&
              <div className="
                my-[20px]
                text-red-600 
                border-l-[4px] 
                border-red-600 
                p-[10px] 
                bg-[#ff000012]
              ">
                {error}
              </div>
          }
            <form onSubmit={handleSignIn}>
              <div className="mb-[20px]">
                <InputText 
                  type="email"
                  label="Email *"
                  id="email"
                  name="email"
                  placeholder="name@mail.com"
                  value={form.email}
                  onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div className="mb-[20px]">
                <InputText 
                  type="password"
                  label="Password *"
                  id="password"
                  name="password"
                  placeholder="******"
                  value={form.password}
                  onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
                />	
              </div>
              <Button
                type="submit"
                color="primary"
                label={isLoading ? 'Loading...' : 'Sign In'}
                disabled={isLoading}
              />
            </form>
          </div>		
			</div>
		</Container>
    </div>
	)
}
