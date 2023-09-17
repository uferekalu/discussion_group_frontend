import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Meta } from "@/components/layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { Section } from "@/components/layout/Section";
import { Navbar } from "@/components/navigation/Navbar";
import { Logo } from "@/components/logo/Logo";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { Button } from "@/components/button/Button";
import { DecodedJwt } from "@/utils/interface";
import jwtDecode from "jwt-decode";
import { logoutUser } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Background } from "@/components/background/Background";
import { Footer } from "@/components/footer";
import { getUserDetails } from "@/slices/userSlice";
import PulseAnimation from "@/components/animations/PulseAnimations";
import UserDetailComp from "@/components/user/UserDetailsComp";
import { Reusables } from "@/utils/reusables";

const UserDetail = () => {
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<DecodedJwt>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userDetailId }: any = router.query;
  const userDetail = useAppSelector((state) => state.user);
  const [updateCompleted, setUpdateCompleted] = useState<boolean>(false);

  const {
    openIsCreateGroup
  } = Reusables();

  useEffect(() => {
    if (userDetailId) {
      dispatch(getUserDetails(userDetailId));
    }
  }, [dispatch, userDetailId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedUser: DecodedJwt = jwtDecode(`${token}`);
    setAuthToken(token);
    setUser(decodedUser);
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    dispatch(logoutUser(null));
    router.push("/");
  };
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={`${AppConfig.title} | User`}
        description={AppConfig.description}
      />
      <Section width="w-full" height="h-24" yPadding="py-6">
        <Navbar
          logo={<Logo xl />}
          user={user && true}
          greetings={`Welcome ${user?.username}`}
          xsMenu={
            <NavbarMobile
              handleOpenRegisterModal={() => {}}
              handleCloseRegisterModal={() => {}}
              handleOpenLoginModal={() => {}}
              handleCloseLoginModal={() => {}}
              openIsCreateGroup={openIsCreateGroup}
            />
          }
        >
          {authToken && (
            <>
              <div className="flex mr-1 mt-1">
                <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
                <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-lg text-white">
                  0
                </span>
              </div>
              <li>
                <Button
                  id="invite"
                  text="Send an Invite"
                  onClick={() => {}}
                  style="bg-red-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
              <li>
                <Button
                  id="join"
                  text="Join A Group"
                  onClick={() => {}}
                  style="bg-blue-400 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
              <li>
                <Button
                  id="logout"
                  text="Logout"
                  onClick={handleLogout}
                  style="bg-gray-950 border rounded-lg p-1 text-white text-xs font-medium hover:bg-white hover:text-black hover:border-none"
                />
              </li>
            </>
          )}
        </Navbar>
      </Section>
      <Background
        color="bg-gray-200"
        bgImg={true}
        imgUrl='url("/background.jpg")'
      >
        <Section
          width="w-full"
          height="min-h-screen"
          xPadding="px-4"
          yPadding="sm:py-18 md:py-10 py-20"
          title="Your Profile"
          description="You can update your profile here"
        >
          {userDetail && userDetail.userStatus === "pending" && (
            <PulseAnimation num={12} display="grid sm:grid-cols-3 gap-4" />
          )}
          {userDetail && userDetail.userStatus === "success" && (
            <UserDetailComp
              userDetail={userDetail.userDetails}
              user={user}
              userDetailId={userDetailId}
              userUpdateMessage={userDetail.userUpdateMessage}
            />
          )}
        </Section>
      </Background>
      <Footer />
    </div>
  );
};

export default UserDetail;
