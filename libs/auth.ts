/**
 * This file defines the authentication options for NextAuth, including providers,
 * session configuration, adapter, and other settings. It uses GitHub and Google
 * providers for OAuth-based authentication and includes SanityCredentials for
 * authentication using Sanity as the backend. Additionally, it includes a callback
 * object for handling session customization.
 */

// Import necessary types and providers from NextAuth
import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Import the Sanity client from the local "sanity" module
import sanityClient from "./sanity";

// Define authentication options using NextAuthOptions
export const authOptions: NextAuthOptions = {
  // Configure authentication providers, including GitHub, Google, and Sanity
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    SanityCredentials(sanityClient)
  ],
  // Configure session settings using JWT strategy
  session: {
    strategy: "jwt"
  },
  // Configure the adapter using SanityAdapter and the provided Sanity
  adapter: SanityAdapter(sanityClient),
  // Enable debugging in development environment
  debug: process.env.NODE_ENV === "development",
  // Set the secret for secure cookie signing
  secret: process.env.NEXTAUTH_SECRET,
  // Provide a callbacks object for customization
  callbacks: {
    session: async ({ session, token }) => {
      // Retrieve the user's email from the token
      const userEmail = token.email;

      // Fetch the user's ID from Sanity based on the email
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail }
      );
      // Update the session with the fetched user ID
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id
        }
      };
    }
  }
};
