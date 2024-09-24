import { handle, handleLogin } from "@0/nextjs-0";

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