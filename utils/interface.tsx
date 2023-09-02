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

export interface AllGroupsObject {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creatorName: string;
  username: string;
  createdAt: string;
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
