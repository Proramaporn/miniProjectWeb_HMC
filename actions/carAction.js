import { ADD_CAR, DELETE_CAR, EDIT_CAR } from './types';

export const addCar = (car) => ({
  type: ADD_CAR,
  car: car,
});

export const deleteCar = (id) => ({
  type: DELETE_CAR,
  id: id,
});

export const editCar = (car) => ({
  type: EDIT_CAR,
  car: car,
});