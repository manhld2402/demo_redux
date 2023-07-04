const initialState = [];
const dataRelatedImages = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_RELATEDIMAGES":
      state = [...action.payload];
      break;
  }
  return state;
};
export default dataRelatedImages;
