import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
