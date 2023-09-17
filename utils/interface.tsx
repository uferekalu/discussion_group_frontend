export interface AuthState {
  token: string | null;
  name: string;
  email: string;
  username: string;
  id: number | null;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;
  getUserStatus: string;
  getUserError: string;
}

export interface DecodedJwt {
  id: number;
  name: string;
  email: string;
  username: string;
  profile_picture?: string;
  country?: string;
  sex?: string;
  hobbies?: string;
  iat?: number;
  exp?: number;
}

export interface discussionObj {
  id: number;
  title: string;
  content: string;
  author_id: number;
  group_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllGroupsObject {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creatorName: string;
  username: string;
  createdAt: string;
  allUsers: string[];
  allDiscussions: discussionObj[];
}

export interface UserObject {
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface User {
  userDetails: UserObject;
  userStatus: string;
  userError: string;
  userUpdateStatus: string;
  userUpdateError: string;
  userUpdateMessage: string;
}

export interface GroupMemberObject {
  user_id: number;
  User: UserObject;
}

export interface GroupDetails {
  name: string;
  description: string;
  creator_id: number | null;
  Group_members: GroupMemberObject[];
}

export interface DiscussionCommentObject {
  content: string;
  author_id: number;
  discussion_id: number;
  likes: number;
  dislikes: number;
  User: UserObject;
}

export interface DiscussionObject {
  id: number | null;
  title: string;
  content: string;
  author_id: number | null;
  Comments: DiscussionCommentObject[];
}

export interface Item {
  id: number;
  name: string;
  username: string;
  description: string;
}

export interface UploadImage {
  uploadPath: string;
  uploadStatus: string;
  uploadError: string;
}

export interface UserUpdateData {
  name: string;
  email: string;
  username: string;
  country: string;
  sex: string;
  hobbies: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface allGroupItem {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creatorName: string;
  username: string;
  createdAt: string;
  allUsers: string[];
  allDiscussions: discussionObj[];
}

export interface AllNotifications {
  id: number
  sender: string;
  group: string;
  discussion: string | null;
  content: string;
  message: string
  status: string;
  createdAt: string;
}

export interface GroupSlice {
  allGroups: AllGroupsObject[];
  groupDetails: GroupDetails;
  discussions: DiscussionObject[];
  groupStatus: string;
  groupError: string;
  singleGroupStatus: string;
  singleGroupError: string;
  discussionStatus: string;
  discussionError: string;
  joinAGroupResult: string;
  joinAGroupStatus: string;
  joinAGroupError: string;
  createGroup: {
    name: string;
    description: string;
  };
  createGroupStatus: string;
  createGroupError: string;
  allNotifications: AllNotifications[];
  allNotificationsStatus: string;
  allNotificationsError: string;
}