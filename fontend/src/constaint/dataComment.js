const initialState = [];
const dataComments = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_COMMENT":
      state = [...action.payload];
      break;
    case "NEW_COMMENT":
      state = [...state, action.payload];
      break;
    case "UPDATE_LIKE":
      for (const comment of state) {
        if (comment.comment_id == action.payload.comment_id) {
          comment.checkLike = !comment.checkLike;
          comment.likes = comment.likes + action.payload.quantity;
        }
      }
      state = [...state];
      break;
    case "DELETE_COMMENT":
      state.splice(action.payload, 1);
      state = [...state];
      break;
  }
  return state;
};
export default dataComments;
