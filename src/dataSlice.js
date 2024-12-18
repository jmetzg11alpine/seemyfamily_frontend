import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    mainData: [],
    profileId: 1,
    profileData: {},
    addRelativeModal: false,
    editDetailsModal: false,
    photoModal: false,
    loggedIn: false,
    userName: '',
  },
  reducers: {
    setMainData: (state, action) => {
      state.mainData = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = { ...action.payload };
    },
    setAddRelativeModal: (state, action) => {
      state.addRelativeModal = action.payload;
    },
    setEditDetailsModal: (state, action) => {
      state.editDetailsModal = action.payload;
    },
    setPhotoModal: (state, action) => {
      state.photoModal = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const {
  setMainData,
  setProfileId,
  setProfileData,
  setAddRelativeModal,
  setEditDetailsModal,
  setPhotoModal,
  setLoggedIn,
  setUserName,
} = dataSlice.actions;

export default dataSlice.reducer;
