import React, { useEffect, useState } from "react";
import { Button } from "@/components/button/Button";
import { Meta } from "@/components/layout/Meta";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/logo/Logo";
import { Navbar } from "@/components/navigation/Navbar";
import { AppConfig } from "@/utils/AppConfig";
import { HeaderShrinker } from "@/utils/HeaderShrinker";
import { useRouter } from "next/router";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logoutUser } from "@/slices/authSlice";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { Background } from "@/components/background/Background";
import { Footer } from "@/components/footer";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Forum() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const [authToken, setAuthToken] = useState<string | null>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    if (!token) {
      router.push("/");
    }
  }, [router]);

  HeaderShrinker();

  const handleLogout = () => {
    dispatch(logoutUser(null));
    router.push("/");
  };

  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={`${AppConfig.title} | Forum`}
        description={AppConfig.description}
      />
      <Section width="w-full" height="h-24" yPadding="py-6">
        <Navbar
          logo={<Logo xl />}
          xsMenu={
            <NavbarMobile
              handleOpenRegisterModal={() => {}}
              handleCloseRegisterModal={() => {}}
              handleOpenLoginModal={() => {}}
              handleCloseLoginModal={() => {}}
            />
          }
        >
          {authToken && (
            <>
              {/* <li className="mr-2"> */}
                <div className="flex mr-1 mt-1">
                  <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
                  <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-lg text-white">
                    0
                  </span>
                </div>
              {/* </li> */}
              <li>
                <Button
                  id="invite"
                  text="Send an Invite"
                  onClick={() => {}}
                  style="bg-red-400 border rounded-lg p-3 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
              <li>
                <Button
                  id="join"
                  text="Join A Group"
                  onClick={() => {}}
                  style="bg-blue-400 border rounded-lg p-3 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
              <li>
                <Button
                  id="logout"
                  text="Logout"
                  onClick={handleLogout}
                  style="bg-gray-950 border rounded-lg p-3 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
            </>
          )}
        </Navbar>
      </Section>
      <Background color="bg-gray-200" bgImg imgUrl='url("/background.jpg")'>
        <div className="hidden sm:flex mt-0 w-full">
          <Section
            width="w-1/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd
          </Section>
          <Section
            width="w-3/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd
            hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd
          </Section>
        </div>
        <div className="flex flex-col sm:hidden space-y-2 w-full">
          <Section
            width="w-full"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd
            hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd
          </Section>
        </div>
      </Background>
      <Footer />
    </div>
  );
}
