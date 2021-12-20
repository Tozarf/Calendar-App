import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
    modalOpen: false,
};

describe("Testing uiReducer", () => {
    test("should return default state", () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    });
    test("should open and close the modal", () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initialState, modalOpen);

        expect(state).toEqual({ modalOpen: true });
        const modalClose = uiCloseModal();
        const stateClose = uiReducer(initialState, modalClose);
        expect(stateClose).toEqual({
            modalOpen: false,
        });
    });
});
