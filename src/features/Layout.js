import React from "react";
// bootstrap
import Container from "react-bootstrap/Container";
// router outlet for showing all others routes other than layout
import { Outlet } from "react-router-dom";
// importing sidebar
import SideBar from "./SideBar";
// rendering layout
const Layout = () => {
  return (
    <Container style={styles.appContainer}>
      <SideBar />
      <Outlet />
    </Container>
  );
};
// styles
const styles = {
  appContainer: {
    height: "500px",
    borderRadius: "10px ",
    marginTop: "40px",
    width: "800px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    background: "#e6ffe6",
    display: "flex",
    justifyContent: "space-between",
    padding: "0px",
  },
};

export default Layout;
