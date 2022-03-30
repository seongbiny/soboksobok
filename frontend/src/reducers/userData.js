export const USERDATA_NAME = "userData/USERDATA_NAME";
export const USERDATA_PROFILE = "userData/USERDATA_PROFILE";

export const userDataName = name => ({ type: USERDATA_NAME, name }); // action 함수
export const userDataProfile = profile => ({
  type: USERDATA_PROFILE,
  profile,
}); // action 함수

const initialState = {
  name: "",
  profile: "",
};

// reducer
const userData = (state = initialState, action) => {
  switch (action.type) {
    case USERDATA_NAME:
      return { ...state, name: action.name };
    case USERDATA_PROFILE:
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};
export default userData;
