import { types } from "../types/types";

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});
export const eventClearActiveEvent = () => ({
  type: types.clearActiveEvent,
});
export const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});
export const eventDeletion = () => ({
  type: types.eventDeletion,
});
