"use client";
import Logo from "@/assets/img/iweblogo.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
// icons
import { IoHomeOutline , IoCodeSlash } from "react-icons/io5";
import { TbLayoutNavbarFilled } from "react-icons/tb";
import { RxSection } from "react-icons/rx";
import { CiShare2, CiUser } from "react-icons/ci";
import { MdOutlineFeedback, MdEditCalendar } from "react-icons/md";
import { FaLaptopCode, FaRegFileLines } from "react-icons/fa6";
import { AiOutlineBranches } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaGears } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";

// --icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

const AdminDrawer = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const { showDrawer } = useSelector((state) => state.hideShowDrawer);

  const [openMenus, setOpenMenus] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => (prev === menu ? null : menu));
  };

  const menuItems = [
    {
      title: "Banner",
      link: "/admin/banner/add-banner",
      icon: <RxSection size={25} />,
      subItems: [
        { title: "Add Banner", link: "/admin/banner/add-banner" },
        { title: "Banner List", link: "/admin/banner/banner-list" },
      ],
    },
    {
      title: "Social Links",
      link: "/admin/footer/social-media-list",
      icon: <CiShare2 size={25} />,
    },
    {
      title: "Feedback",
      link: "/admin/feedback/list",
      icon: <MdOutlineFeedback size={25} />,
      subItems: [
        { title: "Add Feedback", link: "/admin/feedback/add-feedback" },
        { title: "Feedback List", link: "/admin/feedback/feedback-list" },
      ],
    },

    {
      title: "Our Clients",
      link: "/admin/client/add-client",
      icon: <CiUser size={25} />,
      subItems: [
        { title: "Add Client", link: "/admin/client/add-client" },
        { title: "Client List", link: "/admin/client/client-list" },
      ],
    },
    {
      title: "Our Blogs",
      link: "/admin/blogs/add-blog",
      icon: <MdEditCalendar size={25} />,
      subItems: [
        { title: "Add Blog", link: "/admin/blogs/add-blog" },
        { title: "Blog List", link: "/admin/blogs/blog-list" },
      ],
    },
    {
      title: "Technologies",
      link: "/admin/technologies/add-technology",
      icon: <FaLaptopCode size={25} />,
      subItems: [
        { title: "Add Technology", link: "/admin/technologies/add-technology" },
        {
          title: "Technology List",
          link: "/admin/technologies/technology-list",
        },
      ],
    },
    {
      title: "Branches",
      link: "/admin/footer/add-branch",
      icon: <AiOutlineBranches size={25} />,
      subItems: [
        { title: "Add Branch", link: "/admin/footer/add-branch" },
        { title: "Branches List", link: "/admin/footer/branch-list" },
      ],
    },
    {
      title: "Fields",
      link: "/admin/field/add-field",
      icon: <IoCodeSlash size={25} />,
      subItems: [
        { title: "Add Field", link: "/admin/field/add-field" },
        { title: "Field List", link: "/admin/field/field-list" },
      ],
    },
    {
      title: "Services",
      link: "/admin/services/add-service",
      icon: <RiUserSettingsLine size={25} />,
      subItems: [
        { title: "Service List", link: "/admin/services/service-list" },
        { title: "Sub Service", link: "/admin/services/sub-service-list" },
        { title: "Service Faq List", link: "/admin/services/faq-list" },
        { title: "Service Details", link: "/admin/services/service-detail-list" },
      ],
    },
    {
      title: "Setps",
      link: "/admin/setps/add-setp",
      icon: <RiUserSettingsLine size={25} />,
      subItems: [
        {title: "Add Setp", link: "/admin/steps/add-steps"},
        { title: "Setp List", link: "/admin/setps/setp-list" },
      ],
    },
    {
      title: "Industry",
      link: "/admin/industry/add-industry",
      icon: <FaGears size={25} />,
      subItems: [
        { title: "Add Industry", link: "/admin/industry/add-industry" },
        { title: "Industry List", link: "/admin/industry/industry-list" },
      ],
    },
    {
      title: "Certificate",
      link: "/admin/certificate/add-certificate",
      icon: <LiaCertificateSolid size={25} />,
      subItems: [
        {
          title: "Add Certificate",
          link: "/admin/certificate/add-certificate",
        },
        {
          title: "Certificate List",
          link: "/admin/certificate/certificate-list",
        },
      ],
    },
    {
      title: "Case Study",
      link: "/admin/case-study/add-case-study",
      icon: <FaRegFileLines size={20} />,
      subItems: [
        { title: "Add Case", link: "/admin/case-study/add-case-study" },
        { title: "Case List", link: "/admin/case-study/list" },
      ],
    },
  ];

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 850;
  const computedWidth = showDrawer
    ? isMobile
      ? "300px"
      : "300px"
    : isMobile
      ? "0px"
      : "80px";

  return (
    <motion.div
      initial={{ width: computedWidth }}
      animate={{ width: computedWidth }}
      transition={{ duration: 0.3 }}
      className={`d-flex bg-white shadow-lg ${isMobile ? "position-absolute z-2 tr" : ""
        } pb-2 flex-column border-end text-secondary border-muted`}
      style={{
        width: computedWidth,

        height: "100vh",
      }}
    >
      <div
        title="Visit iwebwiser"
        style={{ cursor: "pointer" }}
        className="d-flex border-bottom border-top border-muted py-3 align-items-center justify-content-start ms-2 gap-2"
        onClick={() => window.open("https://iwebwiser.com", "_blank")}
      >
        <Image
          src={Logo}
          height={40}
          alt="logo"
        />
        {showDrawer && (
          <h2 className="m-0 text-muted fw-semibold" style={{ fontSize: "1.2rem" }}>iWebWiser</h2>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center w-100"
        style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="d-flex flex-column h-100 mx-auto gap-3">
          <h6 className="text-secondary mb-0 mt-2" style={{ fontSize: "14px" }}>
            Menu
          </h6>
          <Link
            href="/admin/dashboard"
            className={`d-flex gap-3 m-0 align-items-center ${isActive("/admin/dashboard") ? "text-primary" : "text-secondary"
              } drawer-item-title`}
            style={{ fontSize: "14px" }}
          >
            <IoHomeOutline size={20} /> {showDrawer && "Dashboard"}
          </Link>
          {menuItems.map((item, index) => {
            const isParentActive = item.subItems?.some((subItem) =>
              isActive(subItem.link || [])
            );

            return (
              <div key={index}>
                {item.subItems ? (
                  <div
                    className={`d-flex align-items-center pb-1 ${isParentActive ? "text-primary" : "text-secondary "
                      }`}
                    style={{ gap: "10px", cursor: "pointer" }}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div className="d-flex gap-3 align-items-center w-100">
                      {item.icon}

                      {showDrawer && (
                        <h6
                          className={`d-flex drawer-item-title m-0 ${isParentActive ? "text-primary" : "text-secondary "
                            } justify-content-between align-items-center w-100`}
                          style={{ fontSize: "15px" }}
                        >
                          {item.title}
                          <motion.div
                            animate={{
                              rotate: openMenus === item.title ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <MdKeyboardArrowDown className="me-3" size={20} />
                          </motion.div>
                        </h6>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className={`d-flex align-items-center gap-3 pb-1 ${isActive(item.link) ? "text-primary" : "text-secondary"
                      }`}
                    style={{ fontSize: "14px" }}
                  >
                    {item.icon}
                    {showDrawer && item.title}
                  </Link>
                )}
                {openMenus === item.title && item.subItems && (
                  <motion.div
                    className="d-flex ms-2 flex-column gap-2 mt-3"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className={`d-flex align-items-center mb-3 gap-2 ${isActive(subItem.link)
                          ? "text-primary"
                          : "text-secondary"
                          }`}
                        style={{ fontSize: "13px" }}
                      >
                        <FaRegCircle size={8} className="ms-2" />
                        {showDrawer && subItem.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDrawer;
