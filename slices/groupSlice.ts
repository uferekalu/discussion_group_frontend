import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { AllGroupsObject, DiscussionObject, GroupDetails } from "@/utils/interface";

interface GroupSlice {
  allGroups: AllGroupsObject[];
  groupDetails: GroupDetails;
  discussions: DiscussionObject[];
  groupStatus: string;
  groupError: string;
  singleGroupStatus: string;
  singleGroupError: string;
  discussionStatus: string;
  discussionError: string;
}

const initialState: GroupSlice = {
  allGroups: [],
  groupDetails: {
    name: "",
    description: "",
    creator_id: null,
    Group_members: [],
  },
  discussions: [],
  groupStatus: "",
  groupError: "",
  singleGroupStatus: "",
  singleGroupError: "",
  discussionStatus: "",
  discussionError: "",
};

export const allGroups = createAsyncThunk<
  AllGroupsObject[],
  void,
  { rejectValue: any }
>("group/groups", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/groups/all-groups`, setHeaders());
    const { allGroups } = response.data;
    localStorage.setItem("allGroups", JSON.stringify(allGroups));
    return allGroups;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAGroup = createAsyncThunk<GroupDetails, { rejectValue: any }>(
  "group/getGroup",
  async (groupId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/groups/single-group/${groupId}`,
        setHeaders()
      );
      const { groupDetails } = response.data;
      localStorage.setItem("aGroup", JSON.stringify(groupDetails));
      return groupDetails;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllDiscussionsInAGroup = createAsyncThunk<
  DiscussionObject[],
  { rejectValue: any }
>("group/getAllDiscussions", async (groupId, thunkAPI) => {
  try {
    const response = await axios.get(
      `${url}/groups/discussions/${groupId}`,
      setHeaders()
    );
    const { discussions } = response.data;
    localStorage.setItem("discussions", JSON.stringify(discussions));
    return discussions;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allGroups.pending, (state, action) => {
      return {
        ...state,
        groupStatus: "pending",
      };
    });
    builder.addCase(allGroups.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          groupStatus: "success",
          allGroups: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(allGroups.rejected, (state, action: any) => {
      return {
        ...state,
        groupStatus: "rejected",
        groupError: action.payload.error,
      };
    });
    builder.addCase(getAGroup.pending, (state, action) => {
      return {
        ...state,
        singleGroupStatus: "pending",
      };
    });
    builder.addCase(getAGroup.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          singleGroupStatus: "success",
          groupDetails: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAGroup.rejected, (state, action: any) => {
      return {
        ...state,
        groupStatus: "rejected",
        groupError: action.payload.error,
      };
    });
    builder.addCase(getAllDiscussionsInAGroup.pending, (state, action) => {
      return {
        ...state,
        discussionStatus: "pending",
      };
    });
    builder.addCase(
      getAllDiscussionsInAGroup.fulfilled,
      (state, action: any) => {
        if (action.payload) {
          return {
            ...state,
            discussionStatus: "success",
            discussions: action.payload,
          };
        } else {
          return state;
        }
      }
    );
    builder.addCase(
      getAllDiscussionsInAGroup.rejected,
      (state, action: any) => {
        return {
          ...state,
          discussionStatus: "rejected",
          discussionError: action.payload.error,
        };
      }
    );
  },
});

export default groupSlice.reducer;
