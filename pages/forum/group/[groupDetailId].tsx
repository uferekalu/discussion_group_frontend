import React, { useEffect, useState, ReactNode } from "react";
import { Button } from "@/components/button/Button";
import { Meta } from "@/components/layout/Meta";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/logo/Logo";
import { AppConfig } from "@/utils/AppConfig";
import { HeaderShrinker } from "@/utils/HeaderShrinker";
import { useRouter } from "next/router";
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
import Pagination from "@/components/paginatedData/Pagination";
import HorizontalSlider from "@/components/slider/HorizontalSlider";
import { Navbar } from "@/components/navigation/Navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import GroupDetailComp from "@/components/groupDetailComp/GroupDetailComp";
import PulseAnimation from "@/components/animations/PulseAnimations";

interface Item {
  id: number;
  name: string;
  username: string;
  description: string;
}
interface RenderItemProps {
  startIndex: number;
  endIndex: number;
}

const GroupDetails = () => {
  const router = useRouter();
  const { groupDetailId }: any = router.query;
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups);
  const group = useAppSelector((state) => state.groups);
  const discussions = useAppSelector((state) => state.groups);
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<DecodedJwt>();
  const [groupId, setGroupId] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [idFromGroup, setIdFromGroup] = useState();
  const [isMember, setIsMember] = useState<boolean>(false);

  const itemsPerPage = 7;
  const totalItems = groups.allGroups.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGroupId = (id: number) => {
    setGroupId((prevState: any) => (prevState === id ? null : id));
  };

  const handleIdFromGroup = (id: any) => {
    setIdFromGroup(id);
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
    if (idFromGroup) {
      dispatch(getAGroup(idFromGroup));
    }
    if (groupDetailId) {
      dispatch(getAGroup(groupDetailId));
      dispatch(getAllDiscussionsInAGroup(groupDetailId));
    }
    // if (groupId) {
    //   dispatch(getAGroup(groupId));
    //   dispatch(getAllDiscussionsInAGroup(groupId));
    // }
  }, [dispatch, idFromGroup, groupDetailId]);

  useEffect(() => {
    const groupMembers = group.groupDetails.Group_members;
    const index = groupMembers.findIndex(
      (member) => member.User.username === user?.username
    );
    if (index !== -1) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [group.groupDetails.Group_members, user?.username]);

  HeaderShrinker();

  const handleLogout = () => {
    dispatch(logoutUser(null));
    router.push("/");
  };

  const renderItem = ({
    startIndex,
    endIndex,
  }: RenderItemProps): JSX.Element[] => {
    return groups.allGroups
      .slice(startIndex, endIndex)
      .map((item: Item) => (
        <GroupCard
          key={item.id}
          id={item.id}
          creator={item.username}
          groupName={item.name}
          groupError={groups.groupError}
          groupStatus={groups.groupStatus}
          handleIdFromGroup={handleIdFromGroup}
          handleGroupId={handleGroupId}
          groupId={groupId}
          description={item.description}
          group={group.groupDetails}
          user={user}
          isMember={isMember}
          discussions={discussions.discussions}
        />
      ));
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
            {groups.groupStatus === "pending" ? (
              <PulseAnimation num={3} display="grid grid-cols-1 gap-4" />
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                renderItem={renderItem}
              />
            )}
          </Section>
          <Section
            width="w-3/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            {group && group.singleGroupStatus === "pending" ? (
              <PulseAnimation num={12} display="grid sm:grid-cols-3 gap-4" />
            ) : (
              <>
                <HorizontalSlider
                  items={discussions.discussions}
                  slideWidth={200}
                  slideHeight={200}
                  backgroundImage={'url("/images/flowerybg.jpg")'}
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  slideDuration={500}
                  slideInterval={2000}
                />
                <GroupDetailComp group={group.groupDetails} />
              </>
            )}
          </Section>
        </div>
        <div className="flex flex-col sm:hidden space-y-2 w-full p-3">
          {group.singleGroupStatus === "pending" ? (
            <PulseAnimation num={2} display="flex space-x-3" />
          ) : (
            <>
              <HorizontalSlider
                items={discussions.discussions}
                slideWidth={200}
                slideHeight={200}
                backgroundImage={'url("/images/flowerybg.jpg")'}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                slideDuration={500}
                slideInterval={2000}
              />
              <GroupDetailComp group={group.groupDetails} />
            </>
          )}
          <Section
            width="w-full"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
            title="List of Groups"
            description="You can look through the below groups and join any group of your interest"
            customBg="bg-white"
          >
            {groups.groupStatus === "pending" ? (
              <PulseAnimation num={3} display="grid grid-cols-1 gap-4" />
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                renderItem={renderItem}
              />
            )}
          </Section>
        </div>
      </Background>
      <Footer />
    </div>
  );
};

export default GroupDetails;
