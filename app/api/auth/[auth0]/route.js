import { handle, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handle({
  login: handleLogin({
    returnTo: "/",
  }),
  signup: handleLogin({
    orizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/onboarding",
  }),
});