import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import NextAuth from "next-auth"

export const authOptions = {
  callbacks: {
    async session({ session, token, user }) {
      console.log("session callback")
      console.log("session: "+JSON.stringify(session))
      console.log("token: "+JSON.stringify(token))
      console.log("user: "+JSON.stringify(user))
      return session // The return type will match the one returned in `useSession()`
    },
    async jwt({ token, account, profile }) {
      console.log("jwt callback")
      console.log("token: "+JSON.stringify(token))
      console.log("account: "+JSON.stringify(account))
      console.log("profile: "+JSON.stringify(profile))
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = "some-id"
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
            email: 'lordius@zwackelbart.com'
          }

          console.log("authorize returns "+JSON.stringify(user))

          return user
        }
      })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)