//  importing redux slice
import { createSlice, nanoid } from "@reduxjs/toolkit";
// dummy value
const dummyValue = [
  {
    goalId: 1,
    goalName: "Coding",
    dueTime: "10:00AM",
    week: [
      { day: "Mon", status: "none" },
      { day: "Tue", status: "none" },
      { day: "Wed", status: "none" },
      { day: "Thu", status: "none" },
      { day: "Fri", status: "none" },
      { day: "Sat", status: "none" },
      { day: "Sun", status: "none" },
    ],
  },
  {
    goalId: 2,
    goalName: "Gym",
    dueTime: "11:00PM",
    week: [
      { day: "Mon", status: "none" },
      { day: "Tue", status: "none" },
      { day: "Wed", status: "none" },
      { day: "Thu", status: "none" },
      { day: "Fri", status: "none" },
      { day: "Sat", status: "none" },
      { day: "Sun", status: "none" },
    ],
  },
  {
    goalId: 3,
    goalName: "No Gym",
    dueTime: "1:00AM",
    week: [
      { day: "Mon", status: "none" },
      { day: "Tue", status: "none" },
      { day: "Wed", status: "none" },
      { day: "Thu", status: "none" },
      { day: "Fri", status: "none" },
      { day: "Sat", status: "none" },
      { day: "Sun", status: "none" },
    ],
  },
];
// 24 hours to 12 hours function
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

const habitsFromStorage = localStorage.getItem("newHabits")
  ? JSON.parse(localStorage.getItem("newHabits"))
  : dummyValue;

let initialState = [...habitsFromStorage];

// all redux state handling
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    // adding goal
    goalAdded: {
      reducer(state, { payload }) {
        state.push(payload);
        window.localStorage.setItem(
          "newHabits",
          JSON.stringify([...initialState, payload])
        );

        console.log("this is goal added", state.payload);
      },
      prepare(goalName, goalId, dueTime) {
        dueTime = tConvert(dueTime);
        return {
          payload: {
            id: nanoid(),
            goalName,
            goalId,
            dueTime,
            week: [
              { day: "Mon", status: "none" },
              { day: "Tue", status: "none" },
              { day: "Wed", status: "none" },
              { day: "Thu", status: "none" },
              { day: "Fri", status: "none" },
              { day: "Sat", status: "none" },
              { day: "Sun", status: "none" },
            ],
          },
        };
      },
    },
    // deleting habit
    habitDeleted(state, action) {
      const id = action.payload;
      console.log("habitDelted", state[0].goalName);
      const updatedState = state.filter((goal) => goal.goalId !== id);
      window.localStorage.setItem("newHabits", JSON.stringify(updatedState));
      return updatedState;
    },
    // chaning status
    changeStatus(state, { payload }) {
      const { id, day, status } = payload;
      const habit = state.find((goal) => goal.goalId === id);
      console.log("changeStatus", habit);
      habit.week.forEach((element) => {
        if (element.day === day) {
          element.status = status;
        }
      });
      const after = state.find((goal) => goal.goalId === id);
      after.week.forEach((element) => {
        console.log("day:", element.day, " status :", element.status);
      });
      window.localStorage.setItem("newHabits", JSON.stringify(state));
    },
    // editing title
    editTitle(state, { payload }) {
      const { id, title } = payload;
      const habit = state.find((goal) => goal.goalId === id);
      habit.goalName = title;
      window.localStorage.setItem("newHabits", JSON.stringify(state));
    },
    // editing due time
    editTime(state, { payload }) {
      const { id, time } = payload;
      let duetime = tConvert(time);
      const habit = state.find((goal) => goal.goalId === id);
      habit.dueTime = duetime;
      window.localStorage.setItem("newHabits", JSON.stringify(state));
    },
  },
});
// exports
export const selectAllGoals = (state) => state.goals;

export const {
  goalAdded,
  habitAdded,
  habitDeleted,
  changeStatus,
  editTitle,
  editTime,
} = goalSlice.actions;
export default goalSlice.reducer;
