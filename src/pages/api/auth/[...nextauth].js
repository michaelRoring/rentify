import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react";

export const authOptions = {
  	// Configure one or more authentication providers
  	providers: [
    	CredentialsProvider({
	        // The name to display on the sign in form (e.g. 'Sign in with...')
	        name: 'Credentials',
	        // The credentials is used to generate a suitable form on the sign in page.
	        // You can specify whatever fields you are expecting to be submitted.
	        // e.g. domain, username, password, 2FA token, etc.
	        // You can pass any HTML attribute to the <input> tag through the object.
	        credentials: {
	          	username: { label: "Email", type: "email", placeholder: "name@mail.com" },
	          	password: { label: "Password", type: "password" }
	        },
	        async authorize(credentials, req) {
	          	// You need to provide your own logic here that takes the credentials
	          	// submitted and returns either a object representing a user or value
	          	// that is false/null if the credentials are invalid.
	          	// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
	          	// You can also use the `req` object to obtain additional parameters
	          	// (i.e., the request IP address)

              const API_URL = process.env.NEXT_PUBLIC_API_URL

              const raw = {
                email: credentials.email,
                password: credentials.password,
              }

              const singin = await axios.post(`${API_URL}/login`,raw, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  // 'Authorization': `Bearer ${API_TOKEN}`
                }
              })

              if(!singin) {
                throw new Error('You dont have account')
              }
              else {
                const { data : { access_token } } = singin
                console.log('access_token', access_token);
                const userData = await axios.get(`${API_URL}/me`, {
                  headers: {
                    'Authorization': `Bearer ${access_token}`
                  }
                })
                
                return ({...userData.data, ...singin.data})
              }
	        }
      	})
    	// ...add more providers here
  	],
  	callbacks: {
  		async jwt({token, user}){
        // console.log('user', user);
            if(user){
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.email_verified_at = user.email_verified_at
                token.created_at = user.created_at
                token.updated_at = user.updated_at
                token.access_token = user.access_token
                token.expires_in = user.expires_in
            }
            return token
        },
  		async session({ session, user, token }) {
        // console.log('token', token);
  		    // Send properties to the client, like an access_token from a provider.
  		    // session.accessToken = token.accessToken;
  		    // const level = ['admin', 'user', 'super'];
  		    session.user.id = token.id;
  		    session.user.name = token.name;
  		    session.user.email = token.email;
  		    session.user.email_verified_at = token.email_verified_at;
  		    session.user.created_at = token.created_at;
  		    session.user.updated_at = token.updated_at;
  		    session.user.access_token = token.access_token;
  		    session.user.expires_in = token.expires_in;
  		    return session;
  		},
  	},
  	pages: {
  		signIn: '/auth/signin',
  		// signOut: '/auth/signout',
  	},
  	secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)

