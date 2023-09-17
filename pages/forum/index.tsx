import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/logo/Logo";
import { Navbar } from "@/components/navigation/Navbar";
import { AppConfig } from "@/utils/AppConfig";
import { HeaderShrinker } from "@/utils/HeaderShrinker";
import { useRouter } from "next/router";
import { logoutUser } from "@/slices/authSlice";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { Background } from "@/components/background/Background";
import { Footer } from "@/components/footer";
import GroupCard from "@/components/group/GroupCard";
import { DecodedJwt, Item, allGroupItem } from "@/utils/interface";
import jwtDecode from "jwt-decode";
import {
  allGroups,
  getAGroup,
  getAllNotifications,
  joinAGroup,
} from "@/slices/groupSlice";
import Pagination from "@/components/paginatedData/Pagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PulseAnimation from "@/components/animations/PulseAnimations";
import GroupsToJoin from "@/components/groupsToJoin/GroupsToJoin";
import ReusableModal from "@/components/modal/ReusableModal";
import JoinGroupContent from "@/components/group/JoinGroupContent";
import HasJoinedNotification from "@/components/group/HasJoinedNotification";
import AuthNav from "@/components/navigation/AuthNav";
import CreateGroup from "@/components/group/CreateGroup";
import { Reusables } from "@/utils/reusables";
import CreateGroupNotification from "@/components/group/CreateGroupNotification";
interface RenderItemProps {
  startIndex: number;
  endIndex: number;
}

const Forum: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups);
  const group = useAppSelector((state) => state.groups.groupDetails);
  const discussions = useAppSelector((state) => state.groups);
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<DecodedJwt>();
  const [groupId, setGroupId] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [idFromGroup, setIdFromGroup] = useState();
  const [isMember, setIsMember] = useState<boolean>(false);
  const [groupsToJoin, setGroupsToJoin] = useState<string[] | unknown>([]);
  const [belongsTo, setBelongsTo] = useState<string[] | unknown>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isJoinAGroup, setIsJoinAGroup] = useState<boolean>(false);
  const [isBelongsTo, setIsBelongsTo] = useState<boolean>(false);
  const [chosenGroup, setChosenGroup] = useState<{
    id: any;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const [confirmJoinGroup, setConfirmJoinGroup] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);

  const {
    openCreateGroup,
    handleOpenCreateGroup,
    handleCloseCreateGroup,
    isCreateGroup,
    closeIsCreateGroup,
    openIsCreateGroup,
  } = Reusables();

  console.log("all notifications", groups.allNotifications);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openHasJoined = () => setHasJoined(true);
  const closeHasJoined = () => setHasJoined(false);

  const selectGroup = (id: number, name: string) => {
    setChosenGroup({
      id,
      name,
    });
  };

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  useEffect(() => {
    const handleJoinGroupAction = async () => {
      if (confirmJoinGroup) {
        await dispatch(joinAGroup(chosenGroup?.id));
        await dispatch(allGroups());
        openHasJoined();
        closeModal();
      }
    };
    handleJoinGroupAction();
  }, [dispatch, confirmJoinGroup, chosenGroup.id]);

  const deSelectGroup = () => {
    setChosenGroup({
      id: null,
      name: "",
    });
  };

  const handleConfirmJoinGroup = () => {
    setConfirmJoinGroup(true);
  };

  const handleGroupsUserBelongsTo = useCallback(() => {
    const allGroups = groups.allGroups;
    const groupsUserBelong = new Set();

    for (let group of allGroups) {
      const groupMembers = group.allUsers;
      let shoulBelongTo = false;

      for (let member of groupMembers) {
        if (user?.username === member) {
          shoulBelongTo = true;
          groupsUserBelong.add({ id: group.id, name: group.name });
        }
      }
    }
    setIsBelongsTo(true);
    setIsJoinAGroup(false);
    setBelongsTo(Array.from(groupsUserBelong));
  }, [groups.allGroups, user?.username]);

  const handleJoinAGroup = useCallback(() => {
    const allGroups = groups.allGroups;
    const groupsToJoin = new Set();

    for (let group of allGroups) {
      const groupMembers = group.allUsers;
      let shouldJoinGroup = true;

      for (let member of groupMembers) {
        if (user?.username === member) {
          shouldJoinGroup = false;
          break;
        }
      }

      if (shouldJoinGroup) {
        groupsToJoin.add({ id: group.id, name: group.name });
      }
    }
    setIsJoinAGroup(true);
    setIsBelongsTo(false);
    setGroupsToJoin(Array.from(groupsToJoin));
  }, [groups.allGroups, user?.username]);

  useEffect(() => {
    handleJoinAGroup();
  }, [groups.allGroups, user?.username, handleJoinAGroup]);

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
    if (groupId) {
      dispatch(getAGroup(groupId));
      // dispatch(getAllDiscussionsInAGroup(groupId));
    }
  }, [dispatch, idFromGroup, groupId]);

  useEffect(() => {
    const groupMembers = group.Group_members;
    const index = groupMembers.findIndex(
      (member) => member.User.username === user?.username
    );
    if (index !== -1) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [group.Group_members, user?.username]);

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
          openModal={openModal}
          selectGroup={selectGroup}
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
              groups={groups}
              groupsToJoin={groupsToJoin}
              openModal={openModal}
              selectGroup={selectGroup}
              handleGroupsUserBelongsTo={handleGroupsUserBelongsTo}
              handleJoinAGroup={handleJoinAGroup}
              belongsTo={belongsTo}
              isJoinAGroup={isJoinAGroup}
              isBelongTo={isBelongsTo}
            />
          }
        >
          {authToken && (
            <AuthNav
              handleLogout={handleLogout}
              openIsCreateGroup={openIsCreateGroup}
              notifications={groups.allNotifications}
              notificationStatus={groups.allNotificationsStatus}
              notificationError={groups.allNotificationsError}
            />
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
            title="All Groups"
            description="You can look through the below groups and join any group of
            your interest if you are not already a member!!"
            customBg="bg-white"
          >
            {groups.groupStatus === "pending" && (
              <PulseAnimation num={3} display="grid grid-cols-1 gap-4" />
            )}
            {groups.groupStatus === "rejected" && (
              <div className="text-black text-sm">
                Not Available at the moment. Please refresh the page...
              </div>
            )}
            {groups.groupStatus === "success" && (
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
            {groups.groupStatus === "pending" && (
              <PulseAnimation num={12} display="grid sm:grid-cols-3 gap-4" />
            )}
            {groups.groupStatus === "success" && (
              <GroupsToJoin
                groupsToJoin={groupsToJoin}
                openModal={openModal}
                selectGroup={selectGroup}
                handleGroupsUserBelongsTo={handleGroupsUserBelongsTo}
                handleJoinAGroup={handleJoinAGroup}
                belongsTo={belongsTo}
                isJoinAGroup={isJoinAGroup}
                isBelongTo={isBelongsTo}
              />
            )}
          </Section>
        </div>
        <div className="flex flex-col itens-center justify-center sm:hidden space-y-2 w-full">
          <Section
            width="w-full"
            height="min-h-screen"
            xPadding="px-1"
            yPadding="py-2"
            customBg="bg-white"
          >
            {groups.groupStatus === "pending" && (
              <PulseAnimation num={3} display="grid grid-cols-1 gap-4" />
            )}
            {groups.groupStatus === "success" && (
              <div className="flex flex-col space-y-2 justify-center items-center m-auto p-3">
                <h2 className="text-white font-medium text-sm mb-3 p-3 bg-black rounded-lg shadow-lg">
                  All Groups
                </h2>
                <p className="text-black bg-white text-xs mb-3 p-2 rounded-lg shadow-lg text-center">
                  You can look through the below groups and join any group of
                  your interest if you are not already a member!!
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalItems / itemsPerPage)}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  renderItem={renderItem}
                />
              </div>
            )}
          </Section>
        </div>
      </Background>
      <Footer />
      <ReusableModal
        open={isModalOpen}
        onClose={closeModal}
        deSelectGroup={deSelectGroup}
      >
        <JoinGroupContent
          closeModal={closeModal}
          deSelectGroup={deSelectGroup}
          handleConfirmJoinGroup={handleConfirmJoinGroup}
          chosenGroup={chosenGroup}
        />
      </ReusableModal>
      <ReusableModal
        open={hasJoined}
        onClose={closeHasJoined}
        deSelectGroup={() => {}}
      >
        <HasJoinedNotification
          closeHasJoined={closeHasJoined}
          text={groups.joinAGroupResult}
        />
      </ReusableModal>
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

export default Forum;
