"use client";
import React from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { Exo_2 } from "next/font/google";
import { getAxiosInstance } from "@/lib/api";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import Link from "next/link";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
});

const login = async ({ token }: { token: string }) => {
  const api = await getAxiosInstance();
  api.post("/user/google-auth", { token }).then((response) => {
    setCookie("USER_ACCESS_TOKEN", response.data.data.user_access_token);
  });
};
const Navbar = ({ textBlack }: { textBlack?: boolean }) => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      login({ token: credentialResponse.credential as string });
    },
    onError: () => {
      toast.error("Error logging in with Google");
    },
    use_fedcm_for_prompt: true,
  });
  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-10">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-1/2 h-full flex items-center justify-start px-16">
          <Link href="/">
            <h1
              className={`${exo2.className} text-2xl font-bold ${
                textBlack ? "text-black" : "text-white"
              }`}
            >
              Builder
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
