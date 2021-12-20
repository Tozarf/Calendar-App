import { types } from "../types/types";
// {
//   id: new Date().getTime(),
//   title: "Arts birthday",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   bgcolor: "#fafafa",
//   notes: "Buy cake",
//   user: {
//     _id: "123",
//     name: "Fausto",
//   },
// },

const initialState = {
    events: [],
    activeEvent: null,
};
export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            };

        case types.clearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((e) =>
                    e.id === action.payload.id ? action.payload : e
                ),
            };
        case types.eventDeletion:
            return {
                ...state,
                events: state.events.filter(
                    (e) => e.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload],
            };
        case types.eventCleanUp:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};
