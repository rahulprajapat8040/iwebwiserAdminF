"use client";
import {
  Container,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GoArrowRight, GoArrowDown } from "react-icons/go";
import { useRouter } from "next/navigation";
import { getAllHeader } from "@/lib/redux/features/GetAllHeader";
import EditHeader from "@/components/Modals/EditHeader";
import DeleteHeader from "@/components/Modals/DeleteHeader";

const ServiceList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { headers, isLoading, error } = useSelector(
    (state) => state.getAllHeader
  );

  const [expandedHeader, setExpandedHeader] = useState(null); // Track expanded header
  const [expandedSubheader, setExpandedSubheader] = useState(null); // Track expanded subheader
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);

  useEffect(() => {
    dispatch(getAllHeader());
  }, [dispatch]);

  const toggleHeader = (headerId) => {
    setExpandedHeader((prev) => (prev === headerId ? null : headerId)); // Toggle expansion
  };

  const toggleSubheader = (subheaderId) => {
    setExpandedSubheader((prev) => (prev === subheaderId ? null : subheaderId)); // Toggle expansion
  };

  const EditClinet = (headers) => {
    setShowEdit(true);
    setSelectedHeader(headers);
  };

  const handleDeleteClick = (headers) => {
    setSelectedHeader(headers);
    setShowDelete(true);
  };

  return (
    <>
      <EditHeader
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedHeader={selectedHeader}
      />
      <DeleteHeader
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedHeader={selectedHeader}
      />
      <Container className="container-fluid">
        <div className="d-flex justify-content-center w-100">
          <div style={{ width: "100%" }}>
            {/* Header Banner */}
            <div className="dash-head">
              <div className="dash_title">
                <div className="btn d-inline-flex align-items-center gap-2">
                  <h1 className="main-title"> Header List</h1>
                </div>
              </div>
            </div>

            {/* Body Banner */}
            <div className="card">
              <div className="card-header">
                <div className="card-title d-flex justify-content-between align-items-center">
                  <h2>Header List</h2>
                  <Button
                    className="btn sub_btn"
                    onClick={() => router.push("/admin/header/add-header")}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="card-body">
                <Row className="table-content table-responsive">
                  <Table responsive className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Link</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {headers.map((header, index) => (
                        <Fragment key={index}>
                          <tr>
                            <td className="table_title py-3 text-center">

                              <div className="d-flex justify-content-center gap-3 align-items-center" >
                                {header.subheaders.length > 0 && (
                                  <h1
                                    style={{ cursor: "pointer", textAlign: "center" }}
                                    onClick={() => toggleHeader(header.id)}
                                  >
                                    {expandedHeader === header.id ? (
                                      <GoArrowDown />
                                    ) : (
                                      <GoArrowRight />
                                    )}
                                  </h1>
                                )}
                                <h1 >{header.title}</h1>
                              </div>
                            </td>
                            <td className="heading_link">{header.link}</td>
                            <td className="table_action">
                              <div className="d-inline-flex justify-content-center align-items-center gap-3">
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    background: "#cff4fc",
                                  }}
                                  onClick={() => EditClinet(header)}
                                >
                                  <CiEdit color="green" size={12} />
                                </div>
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                  style={{
                                    cursor: "pointer",
                                    width: "25px",
                                    height: "25px",
                                    background: "#f8d7da",
                                  }}
                                  onClick={() => handleDeleteClick(header)}
                                >
                                  <RiDeleteBin6Line color="red" size={12} />
                                </div>
                              </div>
                            </td>
                          </tr>
                          {expandedHeader === header.id && (
                            <>
                              <tr id="sub_table_tr">
                                <td colSpan="6" className="p-0" id="sub_table_td">
                                  <table className="table sub_table p-0 m-0">
                                    <tbody>
                                      {header.subheaders.map((subheader, subIndex) => (
                                        <Fragment key={subIndex}>
                                          <tr>
                                            <td
                                              className="sub_heading py-3"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <div className="d-flex justify-content-center align-items-center">

                                                {subheader.menuHeaders.length > 0 && (
                                                  <div
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => toggleSubheader(subheader.id)}
                                                  >
                                                    {expandedSubheader === subheader.id ? (
                                                      <GoArrowDown className="me-4" />
                                                    ) : (
                                                      <GoArrowRight className="me-4" />
                                                    )}
                                                  </div>
                                                )}
                                                {subheader.title}
                                              </div>
                                            </td>
                                            <td className="sub_link">{subheader.link}</td>
                                            <td className="table_action">
                                              <div className="d-inline-flex justify-content-center align-items-center gap-3">
                                                <div
                                                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                  style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    background: "#cff4fc",
                                                  }}
                                                  onClick={() => EditClinet(subheader)}
                                                >
                                                  <CiEdit color="green" size={12} />
                                                </div>
                                                <div
                                                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                  style={{
                                                    cursor: "pointer",
                                                    width: "25px",
                                                    height: "25px",
                                                    background: "#f8d7da",
                                                  }}
                                                  onClick={() => handleDeleteClick(subheader)}
                                                >
                                                  <RiDeleteBin6Line color="red" size={12} />
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                          {expandedSubheader === subheader.id && subheader.menuHeaders && (
                                            <tr id="menu_table_tr">
                                              <td colSpan="6" className="p-0" id="menu_table_td">
                                                <table className="table menu_table p-0 m-0">
                                                  <tbody>
                                                    {subheader.menuHeaders.map((menuHeader, menuIndex) => (
                                                      <tr key={menuIndex}>
                                                        <td className="menu_heading py-3">
                                                          {menuHeader.title}
                                                        </td>
                                                        <td className="menu_link">{menuHeader.link}</td>
                                                        <td className="table_action">
                                                          <div className="d-inline-flex justify-content-center align-items-center gap-3">
                                                            <div
                                                              className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                              style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#cff4fc",
                                                              }}
                                                              onClick={() => EditClinet(menuHeader)}
                                                            >
                                                              <CiEdit color="green" size={12} />
                                                            </div>
                                                            <div
                                                              className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                              style={{
                                                                cursor: "pointer",
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#f8d7da",
                                                              }}
                                                              onClick={() => handleDeleteClick(menuHeader)}
                                                            >
                                                              <RiDeleteBin6Line color="red" size={12} />
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          )}
                                        </Fragment>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ServiceList;
