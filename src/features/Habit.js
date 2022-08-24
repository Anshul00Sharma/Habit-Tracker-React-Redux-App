// state management
import { Fragment, useState, useEffect } from "react";
// bootstrap
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// redux state
import { useDispatch } from "react-redux";
import { changeStatus, editTitle, editTime } from "./Goals/goalSlice";
// icons
import { FcOk, FcCancel, FcCheckmark } from "react-icons/fc";
import { FaTimes, FaCheck } from "react-icons/fa";
// notifications
import { NotificationManager } from "react-notifications";
// time picker
import TimePicker from "react-time-picker";

// rendering habits
const Habit = ({ habit, id }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(habit.goalName);
  const [onEdit, setOnEdit] = useState(false);
  const [time, setTime] = useState(habit.dueTime);
  const [onEditTime, setOnEditTime] = useState(false);
  useEffect(() => {
    dispatch(editTime({ id, time }));
  }, [setTime, time, id, dispatch]);
  // 24 hours to 12 hours system
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  // duedate
  const dueTime = tConvert(time);

  // edit Handlers
  const timeEditHandler = () => {
    setOnEditTime(true);
  };
  const saveEditTimeHandler = () => {
    setOnEditTime(false);
  };
  const editHandler = () => {
    setTitle(habit.goalName);
    setOnEdit(true);
  };
  const editConfirmHandler = () => {
    if (title === "") {
      NotificationManager.error("Error", "Empty title no Allowed", 3000);
      setTitle(habit.goalName);
    } else {
      dispatch(editTitle({ id, title }));
    }
    setOnEdit(false);
  };
  const editCancel = () => {
    setTitle(habit.goalName);
    setOnEdit(false);
  };

  // handlers to change status on click
  const checkStatusHandler = (day) => {
    NotificationManager.success("Success message", `${day} : Done`, 3000);
    dispatch(
      changeStatus({
        id: id,
        day: day,
        status: "done",
      })
    );
  };
  const doneStatusHandler = (day) => {
    NotificationManager.error("info message", `${day} : Fail`, 3000);
    dispatch(
      changeStatus({
        id: id,
        day: day,
        status: "fail",
      })
    );
  };
  const failStatusHandler = (day) => {
    NotificationManager.info("Info message", `${day} : None`, 3000);
    dispatch(
      changeStatus({
        id: id,
        day: day,
        status: "none",
      })
    );
  };

  return (
    <>
      {onEdit ? (
        <InputGroup style={styles.edit}>
          <Form.Control
            style={styles.input}
            placeholder="Habit Title"
            aria-label="habit title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            className=" bg-success text-light"
            onClick={editConfirmHandler}
          >
            <FaCheck />
          </Button>
          <Button
            variant="outline-secondary"
            className="bg-danger text-light"
            onClick={editCancel}
          >
            <FaTimes />
          </Button>
        </InputGroup>
      ) : (
        <h5 onDoubleClick={editHandler} style={styles.title}>
          {habit.goalName}
        </h5>
      )}
      <Row style={styles.table}>
        {habit.week.map((dayOb) => (
          <Fragment key={dayOb.day}>
            <Col>
              <p className="day-headings">{dayOb.day}</p>

              {dayOb.status === "none" && (
                <FcCheckmark onClick={() => checkStatusHandler(dayOb.day)} />
              )}

              {dayOb.status === "done" && (
                <FcOk onClick={() => doneStatusHandler(dayOb.day)} />
              )}

              {dayOb.status === "fail" && (
                <FcCancel onClick={() => failStatusHandler(dayOb.day)} />
              )}
            </Col>
          </Fragment>
        ))}
      </Row>
      {onEditTime ? (
        <div style={styles.timeDiv}>
          <TimePicker onChange={setTime} value={time} />

          <FaCheck style={styles.tick} onClick={saveEditTimeHandler} />
        </div>
      ) : (
        <div style={styles.timeDiv}>
          <span onDoubleClick={timeEditHandler} style={styles.time}>
            Daily Due Time : {dueTime}
          </span>
        </div>
      )}
    </>
  );
};

const styles = {
  table: {
    backgroundColor: "#ACE1AF",
    padding: "10px",
    borderRadius: "10px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  title: {
    textAlign: "center",
    marginBottom: "70px",
    marginTop: "20px",
    fontSize: "1.7rem",
  },
  edit: {
    position: "relative",
    top: "15px",
    marginBottom: "76px",
    width: "300px",
    marginLeft: "60px",
  },
  input: {
    width: "100px",
  },
  timeDiv: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: "1.5rem",
  },
  tick: {
    marginLeft: "10px",
    fontSize: "1.5rem",
    padding: "5px",
    backgroundColor: "green",
    borderRadius: "50%",
    color: "#D0F0C0",
  },
};

export default Habit;
