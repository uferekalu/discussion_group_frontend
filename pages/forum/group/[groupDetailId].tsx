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
import { DecodedJwt, allGroupItem } from "@/utils/interface";
import jwtDecode from "jwt-decode";
import {
  allGroups,
  getAGroup,
  getAllDiscussionsInAGroup,
  getAllNotifications,
} from "@/slices/groupSlice";
import Pagination from "@/components/paginatedData/Pagination";
import HorizontalSlider from "@/components/slider/HorizontalSlider";
import { Navbar } from "@/components/navigation/Navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import GroupDetailComp from "@/components/groupDetailComp/GroupDetailComp";
import PulseAnimation from "@/components/animations/PulseAnimations";
import AuthNav from "@/components/navigation/AuthNav";
import { Reusables } from "@/utils/reusables";
import ReusableModal from "@/components/modal/ReusableModal";
import CreateGroup from "@/components/group/CreateGroup";
import HasJoinedNotification from "@/components/group/HasJoinedNotification";
import CreateGroupNotification from "@/components/group/CreateGroupNotification";

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

  const {
    openCreateGroup,
    handleOpenCreateGroup,
    handleCloseCreateGroup,
    isCreateGroup,
    closeIsCreateGroup,
    openIsCreateGroup,
  } = Reusables();

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
    dispatch(getAllNotifications());
  }, [dispatch]);

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
      .map((item: allGroupItem) => (
        <GroupCard
          key={item.id}
          id={item.id}
          creator={item.username}
          groupName={item.name}
          groupError={groups.groupError}
          handleIdFromGroup={handleIdFromGroup}
          handleGroupId={handleGroupId}
          groupId={groupId}
          description={item.description}
          members={item.allUsers}
          user={user}
          isMember={isMember}
          discussions={item.allDiscussions}
          openModal={() => {}}
          selectGroup={() => {}}
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
              openIsCreateGroup={openIsCreateGroup}
              notifications={groups.allNotifications}
              notificationStatus={groups.allNotificationsStatus}
              notificationError={groups.allNotificationsError}
            />
          }
        >
          {authToken && (
            <>
              <AuthNav
                handleLogout={handleLogout}
                openIsCreateGroup={openIsCreateGroup}
                notifications={groups.allNotifications}
                notificationStatus={groups.allNotificationsStatus}
                notificationError={groups.allNotificationsError}
              />
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
      <ReusableModal
        open={isCreateGroup}
        onClose={closeIsCreateGroup}
        deSelectGroup={() => {}}
      >
        <CreateGroup
          closeIsCreateGroup={closeIsCreateGroup}
          handleOpenCreateGroup={handleOpenCreateGroup}
        />
      </ReusableModal>
      <ReusableModal
        open={openCreateGroup}
        onClose={handleCloseCreateGroup}
        deSelectGroup={() => {}}
      >
        <CreateGroupNotification
          closeHasJoined={handleCloseCreateGroup}
          text={`Group created successfully`}
        />
      </ReusableModal>
    </div>
  );
};

export default GroupDetails;
