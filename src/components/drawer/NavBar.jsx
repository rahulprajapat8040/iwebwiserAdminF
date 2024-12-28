import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer } from "@/lib/redux/features/HideShowDrawer";
import { Form, Button } from "react-bootstrap";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import AdminImg from "@/assets/img/image.jpg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdmin } from "@/lib/redux/features/GetAdmin";
const NavBar = () => {
  const { showDrawer } = useSelector((state) => state.hideShowDrawer);
  const { admin } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();


  const handleLogout = () => {
    Cookies.remove("admin");
    router.push("/");
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch])



  // responsiveness

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  // Update windowWidth on resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Determine if it's mobile view
  const isMobile = windowWidth < 850;

  return (
    <div className="p-3 px-5 align-items-center d-flex justify-content-between w-100">
      <div className="d-flex w-100 align-items-center gap-3">
        <div
          className={`cursor-pointer z-3 ${isMobile ? "position-absolute end-0 me-2" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(hideDrawer(!showDrawer));
            setOpen(!open);
          }}
        >
          {open ? (
            <IoIosClose size={20} color="gray" />
          ) : (
            <IoMdMenu size={20} color="gray" />
          )}
        </div>
        <div className={`${isMobile ? "d-none" : "w-100"}`}>
          <Form.Group className="input-group w-75 form-inputs">
            <div className=" position-relative w-100">
              <Form.Control
                id="search-focus"
                type="text"
                placeholder="Search for results..."
                className="form-control w-100 text-muted "  // Added padding on left side for the icon
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#5f6368"
                className="search-icon position-absolute top-50 end-0 translate-middle-y me-3"
              >
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
              </svg>
            </div>
          </Form.Group>
        </div>
      </div>
      <div className="d-flex w-50 justify-content-end align-items-center gap-3">
        <div>
          <CiBellOn size={22} color="gray" />
        </div>
        <div
          className="d-flex align-items-center m-0 gap-3 w-50 position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => setShowLogout(!showLogout)}
        >
          <div >
            {admin?.image && (
              <Image
                src={admin?.image || AdminImg}
                alt="admin"
                width={35}
                height={35}
                className="rounded-circle object-fit-cover"
              />
            )

            }

          </div>
          <div
            className={`d-flex flex-column justify-content-center ${isMobile ? "d-none" : ""}`}
          >
            <span
            className="m-0"
              style={{ fontSize: "12px", fontWeight: "600", lineHeight: "1.2" }}
            >
              {admin?.username}
            </span>
            <p style={{ fontSize: "12px" }} className="text-muted m-0">
              {admin?.role}
            </p>
          </div>
          {showLogout && (
            <div style={{ width: '170px' }} className="position-absolute z-3 top-100  border bg-white  rounded  d-flex flex-column align-items-center ">
              <div className=" h-100 border-bottom w-100" >
                <Link href="/admin/profile">
                  <div
                    className="d-flex align-items-center gap-1 p-2   cursor-pointer"
                    style={{ width: "100%" }}
                  >
                    <CgProfile size={20} color="gray" />
                    <h6 className=" m-0 text-muted">Profile</h6>
                  </div>
                </Link>
              </div>
              <div className=" h-100  w-100" >
                <div
                  className="d-flex align-items-center gap-1 p-2   cursor-pointer"
                  style={{ width: "100%" }}
                  onClick={handleLogout}
                >
                  <RiLogoutCircleLine size={20} color="gray" />
                  <h6 className="text-muted m-0">Logout</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
