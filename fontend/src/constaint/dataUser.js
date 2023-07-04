const initialState = [];
const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      state = [...action.payload];
      break
  }
  return state;
};
export default dataUser;
