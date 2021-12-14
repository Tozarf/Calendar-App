import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventAddNew, eventClearActiveEvent, eventUpdate } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [validTitle, setValidTitle] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleStartEndChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire("Error", "Ending date must be greater than starting date");
      return;
    }

    if (title.trim().length < 2) {
      return setValidTitle(false);
    }

    if (activeEvent) {
      dispatch(eventUpdate(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "212",
            name: "Tozarf",
          },
        })
      );
    }
    setValidTitle(true);
    closeModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo">
      <h1> {activeEvent ? "Edit event" : "New event"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Initial Time and Date</label>
          <DateTimePicker onChange={handleStartDateChange} value={dateStart} className="form-control" />
        </div>

        <div className="form-group">
          <label>Ending Time and Date</label>
          <DateTimePicker onChange={handleStartEndChange} value={dateEnd} minDate={dateStart} className="form-control" />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and Notes</label>
          <input type="text" className={`form-control ${!validTitle && "is-invalid"} `} placeholder="Event Title" name="title" autoComplete="off" value={title} onChange={handleInputChange} />
          <small id="emailHelp" className="form-text text-muted">
            Short description
          </small>
        </div>

        <div className="form-group">
          <textarea type="text" className="form-control" placeholder="Notes" rows="5" name="notes" value={notes} onChange={handleInputChange}></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional Information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
