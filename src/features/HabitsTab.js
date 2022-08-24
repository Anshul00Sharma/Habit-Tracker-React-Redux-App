// useParams for reading the url
import { useParams } from "react-router-dom";
// importing habit component
import Habit from "./Habit";
// redering habitTab
const HabitsTab = ({ goals }) => {
  const id = Number(useParams().id);
  // finding habit with id
  console.log("Type", typeof id);
  const habit = goals.find((habit) => habit.goalId === id);
  return (
    <>
      <div style={styles.main}>
        <div style={styles.headingHabitDiv}>
          <span style={styles.title}>Habits </span>
        </div>
        <Habit habit={habit} id={id} />
      </div>
    </>
  );
};
// styles
const styles = {
  main: {
    height: "100%",
    width: "65%",
    padding: "25px",
  },
  headingHabitDiv: {
    backgroundColor: "#90ee90",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  },
  title: {
    fontSize: "2rem",
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

export default HabitsTab;
