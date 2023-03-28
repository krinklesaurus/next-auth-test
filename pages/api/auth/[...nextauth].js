import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"

export const authOptions = {
  callbacks: {
    // When using database sessions, the User (user) object is passed as an argument.
    // When using JSON Web Tokens for sessions, the JWT payload (token) is provided instead.
    async session({ session, token, user }) {

      console.log("session callback")
      console.log("session: "+JSON.stringify(session))
      console.log("token: "+JSON.stringify(token))
      console.log("user: "+JSON.stringify(user))

      session.accessToken = token.accessToken
      session.user = token.user

      return session
    },
    // The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a
    // new session, after the user signs in. In subsequent calls, only token will be available.
    async jwt({ token, user, account, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("jwt callback")
        console.log("token: "+JSON.stringify(token))
        console.log("user: "+JSON.stringify(user))
        console.log("account: "+JSON.stringify(account))
        console.log("isNewUser: "+JSON.stringify(isNewUser))

        token.accessToken = account.access_token
        token.user = user
      }
      return token
    }
  },
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
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = {
            id: 123,
            username: "lordius_zwackelbart",
            name: "Lordius Zwackelbart",
            email: 'lordius@zwackelbart.com',
            address: 'Seattle, WA'
          }

          console.log("authorize returns "+JSON.stringify(user))

          return user
        }
      })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)