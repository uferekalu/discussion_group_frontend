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
import GroupCard from "@/components/group/GroupCard";
import { DecodedJwt } from "@/utils/interface";
import jwtDecode from "jwt-decode";
import {
  allGroups,
  getAGroup,
  getAllDiscussionsInAGroup,
} from "@/slices/groupSlice";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Forum() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const groups = useTypedSelector((state) => state.groups);
  const group = useTypedSelector((state) => state.groups.groupDetails);
  const discussions = useTypedSelector((state) => state.groups);
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<DecodedJwt>();
  const [groupId, setGroupId] = useState<any>();
  console.log("group", group)

  const handleGroupId = (id: number) => {
    setGroupId((prevState: any) => (prevState === id ? null : id))
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedUser: DecodedJwt = jwtDecode(`${token}`);
    setAuthToken(token);
    setUser(decodedUser);
    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    dispatch(allGroups());
    if (groupId) {
      dispatch(getAGroup(groupId));
      dispatch(getAllDiscussionsInAGroup(groupId));
    }
  }, [dispatch, groupId]);

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
          user={user && true}
          greetings={`Welcome ${user?.username}`}
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
      <Background color="bg-gray-200" bgImg imgUrl='url("/background.jpg")'>
        <div className="hidden sm:flex mt-0 w-full">
          <Section
            width="w-1/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
            title="List of Groups"
            description="You can look through the below groups and join any group of your interest"
            customBg="bg-white"
          >
            {groups.allGroups?.map((data) => (
              <GroupCard
                key={data.id}
                id={data.id}
                creator={data.username}
                groupName={data.name}
                groupError={groups.groupError}
                action1="Join"
                action2={"Start a Discussion"}
                onClick={() => {}}
                discussions={discussions.discussions}
                groupMembers={group}
                handleGroupId={() => handleGroupId(data.id)}
                groupId={groupId}
                description={data.description}
                discussionsError={discussions.discussionError}
                
              />
            ))}
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
            title="List of Groups"
            description="You can look through the below groups and join any group of your interest"
            customBg="bg-white"
          >
            {groups.allGroups?.map((data) => (
              <GroupCard
                key={data.id}
                id={data.id}
                creator={data.username}
                groupName={data.name}
                groupError={groups.groupError}
                action1="Join"
                action2={"Start a Discussion"}
                onClick={() => {}}
                discussions={discussions.discussions}
                groupMembers={group}
                handleGroupId={() => handleGroupId(data.id)}
                groupId={groupId}
                description={data.description}
                discussionsError={discussions.discussionError}
              />
            ))}
          </Section>
        </div>
      </Background>
      <Footer />
    </div>
  );
}
