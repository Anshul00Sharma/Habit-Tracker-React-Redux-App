// layout
import Layout from "./features/Layout";
// notifications
import { NotificationContainer } from "react-notifications";
// notification css
import "react-notifications/lib/notifications.css";
// react router
import { Route, Routes } from "react-router-dom";
// importing habiit tab
import HabitsTab from "./features/HabitsTab";
// redux state management
import { selectAllGoals } from "./features/goalSlice";
import { useSelector } from "react-redux";
// rendering app
function App() {
  const goals = useSelector(selectAllGoals);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="habits/:id" element={<HabitsTab goals={goals} />} />
        </Route>
      </Routes>
      <NotificationContainer />
    </>
  );
}

export default App;
