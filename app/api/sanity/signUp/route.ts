/**
 * This file sets up the sign-up handler for NextAuth with Sanity as the backend.
 * It imports the signUpHandler from "next-auth-sanity" and the Sanity client from "@/libs/sanity".
 * The sign-up handler is configured to use the provided Sanity client.
 */

import { signUpHandler } from "next-auth-sanity";

import sanityClient from "@/libs/sanity";

// Set up the sign-up handler with the provided Sanity client
export const POST = signUpHandler(sanityClient);
