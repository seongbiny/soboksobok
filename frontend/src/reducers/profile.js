export const USER_DATA = "PROFILE/USER_DATA";

export const userData = user => ({ type: USER_DATA, user });

const initialState = {
  user: {},
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};
export default profile;
