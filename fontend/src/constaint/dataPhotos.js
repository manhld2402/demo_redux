const initialState = [];
const dataPhotos = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      // console.log(action.payload.data);
      state = [...action.payload];
      break;
    case "DELETE_PHOTO":
      state.splice(action.payload, 1);
      state = [...state];
      break;
  }
  return state;
};
export default dataPhotos;
