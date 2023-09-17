import React, { useEffect, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { Background } from "@/components/background/Background";
import { Section } from "@/components/layout/Section";
import { Navbar } from "@/components/navigation/Navbar";
import { Logo } from "@/components/logo/Logo";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button/Button";
import RegisterModal from "@/components/auth/RegisterModal";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/router";
import { HeaderShrinker } from "@/utils/HeaderShrinker";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { Reusables } from "@/utils/reusables";

export default function Home() {
  const router = useRouter()
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const {
    openIsCreateGroup,
  } = Reusables();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/forum");
    }
  }, [router]);

  HeaderShrinker()

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };
  return (
    <div className="text-gray-600 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Section width="w-full" height="h-24" yPadding="py-6">
        <Navbar
          logo={<Logo xl />}
          xsMenu={
            <NavbarMobile
              handleOpenRegisterModal={handleOpenRegisterModal}
              handleCloseRegisterModal={handleCloseRegisterModal}
              handleOpenLoginModal={handleOpenLoginModal}
              handleCloseLoginModal={handleCloseLoginModal}
              openIsCreateGroup={openIsCreateGroup}
            />
          }
        >
          <li>
            <Button
              id="signup"
              text="Sign Up"
              onClick={handleOpenRegisterModal}
              style="bg-pink-500 border rounded-lg p-1 text-white text-sm font-medium hover:bg-yellow-600 hover:text-black hover:border-none"
            />
          </li>
          <li>
            <Button
              id="login"
              text="Login"
              onClick={handleOpenLoginModal}
              style="bg-gray-950 border rounded-lg p-1 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-none"
            />
          </li>
        </Navbar>
      </Section>
      <Background color="bg-gray-200" bgImg imgUrl='url("/background.jpg")'>
        <Section
          marginTop="mt-16"
          width="full"
          height="min-h-screen"
          xPadding="px-8"
          yPadding="py-6"
          title="The Discussion Group App"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        >
          <p></p>
        </Section>
      </Background>
      <Footer />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
    </div>
  );
}
