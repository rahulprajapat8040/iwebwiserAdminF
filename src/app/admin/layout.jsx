"use client";
import AdminDrawer from "@/components/drawer/AdminDrawer";
import NavBar from "@/components/drawer/NavBar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
const Layout = ({ children }) => {
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   const handleKeydown = (e) => {
  //     if (e.key === "F12") e.preventDefault();
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeydown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeydown);
  //   };
  // }, []);

  const pathname = usePathname();
  return (
    <>
      <div className="d-flex w-100" style={{ height: "100vh" }}>
        <AdminDrawer />

        <div className="w-100 d-flex flex-column h-100 bg-light">
          <div
            className="w-100 bg-white d-flex  align-items-center shadow "
            style={{ height: "70px", boxShadow: "0px 0px 0px 0px #000" }}
          >
            <NavBar />
          </div>
          <div
            className="w-100 h-100 px-md-4 pt-md-4 pt-2"
            style={{
              backgroundColor: "#f2f4ffbf",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <h6 className="text-end d-none d-md-block text-capitalize text-primary">
              {pathname.split("/").slice(2).join(" / ")}
            </h6>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
