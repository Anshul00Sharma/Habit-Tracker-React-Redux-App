import React from "react";
// bootstrap
import ListGroup from "react-bootstrap/ListGroup";
// redux states
import { selectAllGoals, habitDeleted } from "./goalSlice";
import { useSelector, useDispatch } from "react-redux";
// icons
import { FaRegTrashAlt } from "react-icons/fa";
// notifications
import { NotificationManager } from "react-notifications";
// react router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// redering goal list
const GoalList = ({ style, itemStyle }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log("this is : ", id);
    NotificationManager.info("Goal deleted", "Info", 3000);
    dispatch(habitDeleted(id));
    navigate("/", { replace: true });
  };
  const goals = useSelector(selectAllGoals);

  const renderedGoals = goals.map((goal) => (
    <ListGroup.Item
      style={itemStyle}
      action
      variant="primary"
      key={goal.goalId}
    >
      <Link to={`habits/${goal.goalId}`} style={styles.title}>
        <span>{goal.goalName}</span>
      </Link>

      <FaRegTrashAlt
        onClick={() => {
          handleDelete(goal.goalId);
        }}
      />
    </ListGroup.Item>
  ));

  return <ListGroup style={style}>{renderedGoals}</ListGroup>;
};
// styling
const styles = {
  title: {
    height: "100%",
    width: "80%",
    textDecoration: "none",
  },
};

export default GoalList;
