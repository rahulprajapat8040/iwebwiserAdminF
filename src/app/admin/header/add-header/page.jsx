"use client";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHeader = () => {
  const [headerLink, setheaderLink] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [subHeadings, setSubHeadings] = useState([]);
  const [subChildHeadings, setSubChildHeadings] = useState([]);

  const handleAddSubHeading = () => {
    setSubHeadings([...subHeadings, { title: "", link: "" }]);
    setSubChildHeadings([...subChildHeadings, []]); // Initialize empty subChild array for each subHeading
  };

  const handleSubHeadingChange = (index, field, value) => {
    const updatedSubHeadings = [...subHeadings];
    updatedSubHeadings[index][field] = value;
    setSubHeadings(updatedSubHeadings);
  };

  const handleAddSubChildHeading = (subHeadingIndex) => {
    const updatedSubChildHeadings = [...subChildHeadings];
    updatedSubChildHeadings[subHeadingIndex] =
      updatedSubChildHeadings[subHeadingIndex] || [];
    updatedSubChildHeadings[subHeadingIndex].push({ title: "", link: "" });
    setSubChildHeadings(updatedSubChildHeadings);
  };

  const handleSubChildHeadingChange = (
    subHeadingIndex,
    childIndex,
    field,
    value
  ) => {
    const updatedSubChildHeadings = [...subChildHeadings];
    updatedSubChildHeadings[subHeadingIndex][childIndex][field] = value;
    setSubChildHeadings(updatedSubChildHeadings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: headerTitle,
      link: headerLink,
      subHeaders: subHeadings.map((subHeading, index) => ({
        ...subHeading,
        subMenuHeaders: subChildHeadings[index] || [],
      })),
    };

    try {
      const response = await axios.post(Apis.createHeader, payload);
      toast.success(response.data.message)
      setheaderLink("");
      setHeaderTitle("");
      setSubHeadings([]);
      setSubChildHeadings([]);
    } catch (error) {
      console.error("Error creating header:", error);
      toast.error(error.data.message)
    }
  };

  const router = useRouter();

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="dash-head">
          <div className="dash_title">
            <div
              onClick={() => router.back()}
              className="btn d-inline-flex align-items-center gap-2"
            >
              <div
                className="d-inline-block bg-primary p-1 px-2 rounded-3"
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={25}
                  viewBox="0 -968 960 960"
                  width={25}
                  fill="#FFFFFF"
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </div>
              <h4 className={`main-title`}>Add Header</h4>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add Header</h2>
            </div>
          </div>
          <div className="card-body">
            <Form className="upload-form" onSubmit={handleSubmit}>
              <div className="row form-group mt-1 mt-md-2 align-items-start">
                <div className="col-12 col-md-3 m-0">
                  <Form.Label
                    htmlFor="inputHeaderTitle"
                    className="col-form-label form-label d-flex justify-content-start justify-content-md-center mb-0 mb-md-3"
                  >
                    Header Title / Link
                  </Form.Label>
                </div>
                <div className="col-12 col-md-9 mt-0">
                  <Form.Group className="input-group me-5 mb-3 pb-4 position-relative">
                    <Form.Control
                      type="text"
                      id="header-link"
                      placeholder="Enter Header Title"
                      className={`form-control rounded-start`}
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter Header Link"
                      className={`form-control rounded-end`}
                      id="header-link"
                      value={headerLink}
                      onChange={(e) => setheaderLink(e.target.value)}
                    />
                    <span
                      className="text-danger position-absolute bottom-0 ms-1 d-none d-sm-block"
                    >New Heading Title/Link added.</span>
                  </Form.Group>
                  <div className="w-100 mt-2">
                    <div
                      onClick={handleAddSubHeading}
                      className="btn btn-sm mb-2 px-2 add_subhead"
                    >
                      <IoIosAdd size={20} />
                      Sub heading
                    </div>
                  </div>
                </div>
              </div>

              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="row form-group mt-1 mt-md-2 align-items-start">
                    <div className="col-12 col-md-3 m-0">
                      <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center mb-0 mb-md-3">
                        Sub-heading Title
                      </Form.Label>
                    </div>
                    <div className="col-12 col-md-9 mt-0">
                      <Form.Group className="input-group me-5 mb-3 pb-4 position-relative">
                        <Form.Control
                          type="text"
                          placeholder="Enter Sub-heading Title"
                          className="form-control rounded-start"
                          value={subHeading.title}
                          id="header-link"
                          onChange={(e) =>
                            handleSubHeadingChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                        />
                        <Form.Control
                          type="text"
                          placeholder="Enter Sub-heading Link"
                          className="form-control rounded-end"
                          value={subHeading.link}
                          id="header-link"
                          onChange={(e) =>
                            handleSubHeadingChange(
                              index,
                              "link",
                              e.target.value
                            )
                          }
                        />
                            <span
                      className="text-danger position-absolute bottom-0 ms-1 d-none d-sm-block"
                    >New Sub Heading Title/Link added.</span>
                      </Form.Group>
                      <div className="w-100 mt-2">
                        <div
                          type="button"
                          onClick={() => handleAddSubChildHeading(index)}
                          className="btn btn-sm mb-2 px-2 add_subhead"
                        >
                          <IoIosAdd size={20} />
                          Sub child Heading
                        </div>
                      </div>
                    </div>
                  </div>

                  {subChildHeadings[index]?.map((subChild, childIndex) => (
                    <div key={childIndex} className="mt-2 mb-4">
                      <div className="row form-group mt-1 mt-md-2 align-items-start">
                        <div className="col-12 col-md-3 m-0">
                          <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center mb-0 mb-md-3">
                            Sub-child Title
                          </Form.Label>
                        </div>
                        <div className="col-12 col-md-9 mt-0">
                          <Form.Group className="input-group me-5 mb-3 pb-4 position-relative">
                            <Form.Control
                              type="text"
                              placeholder="Enter Sub-child Title"
                              className="form-control rounded-start"
                              value={subChild.title}
                              id="header-link"
                              onChange={(e) =>
                                handleSubChildHeadingChange(
                                  index,
                                  childIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                            <Form.Control
                              type="text"
                              placeholder="Enter Sub-child Link"
                              className="form-control rounded-end"
                              value={subChild.link}
                              id="header-link"
                              onChange={(e) =>
                                handleSubChildHeadingChange(
                                  index,
                                  childIndex,
                                  "link",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-9 form-button">
                  <Button role="button" onClick={() => router.push('/admin/header/navbar-list')} variant="secondary" className="btn form-cancel">
                    Cancel
                  </Button>
                  <Button type="submit" className="btn form-btn">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHeader;
