import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: 0,
    mainData: [],
    profileId: 1,
    profileData: {},
    addRelativeModal: false,
    editDetailsModal: false,
    photoModal: false,
  },
  reducers: {
    addValue: (state) => {
      state.value += 1;
    },
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
  },
});

export const {
  addValue,
  setMainData,
  setProfileId,
  setProfileData,
  setAddRelativeModal,
  setEditDetailsModal,
  setPhotoModal,
} = dataSlice.actions;

export default dataSlice.reducer;
