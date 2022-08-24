// importing goal List
import GoalList from "./Goals/GoalList";
// icons
import { FaPlus } from "react-icons/fa";
// state management
import React, { useState } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// redux state management
import { goalAdded } from "./Goals/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllGoals } from "./Goals/goalSlice";
// notification
import { NotificationManager } from "react-notifications";
// time picker
import TimePicker from "react-time-picker";
// rendering sideBar
const SideBar = () => {
  const dispatch = useDispatch();
  const [dueTime, onChange] = useState("10:00");
  console.log("time", dueTime);
  const goals = useSelector(selectAllGoals);
  const [show, setShow] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // adding goals
  const handleAddGoal = () => {
    const goalID =
      goals[goals.length - 1] !== undefined
        ? Number(goals[goals.length - 1].goalId) + 1
        : 1;
    let isrepeated = false;
    goals.forEach((g) => {
      if (g.goalName === newGoal) {
        console.log("goals");
        handleClose();
        isrepeated = true;
        NotificationManager.error("Error", "Goal Already exists", 3000);
      }
    });
    if (newGoal === "") {
      NotificationManager.error("Error", "Empty Goal field", 3000);
    }
    if (!isrepeated && newGoal !== "") {
      dispatch(goalAdded(newGoal, goalID, dueTime));
      NotificationManager.success("Success message", "Goal Added", 3000);
    }
    setNewGoal("");
    handleClose();
  };

  const modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Goal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Habit Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a Goal here"
              autoFocus
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <Form.Label>Pick Daily Due Time</Form.Label>
            <div>
              <TimePicker onChange={onChange} value={dueTime} />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddGoal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <>
      <div style={styles.sideBar}>
        <span style={styles.title}>Add Habit</span>
        <FaPlus onClick={handleShow} style={styles.plusButton} />
        <GoalList style={styles.list} itemStyle={styles.listItem} />
      </div>
      {modal}
    </>
  );
};
// styles
const styles = {
  sideBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#90ee90",
    hieght: "100%",
    width: "35%",
    borderRadius: "10px 0px 0px 10px",
    padding: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    fontFamily: "Righteous",
    color: "#004526",
  },
  list: {
    width: "100%",
    // textAlign: "center",
    marginTop: "20px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  plusButton: {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",

    fontSize: "1.5rem",
    padding: "5px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

export default SideBar;
