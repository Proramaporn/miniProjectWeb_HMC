import { ADD_CAR, DELETE_CAR, EDIT_CAR } from '../actions/types';

const initialState = {
  carList: [],
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAR:
      return {
        ...state,
        carList: state.carList.concat(action.car),
      };

    case DELETE_CAR:
      return {
        ...state,
        carList: state.carList.filter((item) => item.id !== action.id),
      };

    case EDIT_CAR:
      return {
        ...state,
        carList: state.carList.map((item) =>
          item.id === action.car.id
            ? {
                ...item,
                model: action.car.model,
                description: action.car.description,
              }
            : item
        ),
      };

    default:
      return state;
  }
};

export default carReducer;
