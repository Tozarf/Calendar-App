import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-en";
import { CalendarEvent } from "./CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal } from "./CalendarModal";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Arts birthday",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Buy cake",
    user: {
      _id: "123",
      name: "Fausto",
    },
  },
];
export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
  const onDoubleClick = (e) => {
    // console.log("open modal");
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    dispatch(uiOpenModal());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
