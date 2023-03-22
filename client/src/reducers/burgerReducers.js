export const getAllBurgersReducer = (state = { burgers: [] }, action) => {
  switch (action.type) {
    // set yapıyoruz
    // useSelector ile anasayfadayken bu verileri çekiyoruz

    case "GET_BURGERS_REQUEST":
      return {
        loading: true,
        ...state,
      };

    case "GET_BURGERS_SUCCESS":
      return {
        loading: false,
        burgers: action.payload,
      };
    case "GET_BURGERS_FAILED":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
