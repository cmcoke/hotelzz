/**
 * This file sets up NextAuth for authentication and exports the authentication handler.
 * It uses the authOptions configuration from "@/libs/auth" to configure the authentication behavior.
 */

import NextAuth from "next-auth";

import { authOptions } from "@/libs/auth";

// Set up NextAuth with the provided authOptions
const handler = NextAuth(authOptions);

// Export the authentication handler for both GET and POST requests
export { handler as GET, handler as POST };
