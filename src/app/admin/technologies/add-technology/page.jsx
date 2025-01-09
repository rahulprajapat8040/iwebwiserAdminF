"use client";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import { IoMdArrowBack, IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubServicesFull } from "@/lib/redux/features/GetAllSubServices";
const AddTechnology = () => {
  const dispatch = useDispatch();
  const { subServices } = useSelector((state) => state.getAllSubServicesFull);
  const [subServiceId, setSubServiceId] = useState("");
  const [imagePreview, setImagePreview] = useState(false);
  const [technologyTitle, setTechnologyTitle] = useState("");
  const [technologyImage, setTechnologyImage] = useState(null);
  const router = useRouter();
  useEffect(() => {
      dispatch(getAllSubServicesFull());
  }, []);

  // HANDLE IAMGE UPLOAD

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTechnologyImage(res.data.url);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // HANDLE TECHNOLOGY ADD

  const handleAddTechnology = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createTechnology, {
        sub_service_id: subServiceId,
        title: technologyTitle,
        image: technologyImage,
      });
      toast.success(response.data.message);
      // Clear the input fields and increment the index for the next branch
      setServiceId("");
      setSubServiceId("");
      setTechnologyTitle("");
      setTechnologyImage(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview
          image={technologyImage}
          setImagePreview={setImagePreview}
        />
      )}
      <div>
        <div className="dash-head">
          <div className="dash_title">
            <div onClick={() => router.back()} className="btn  d-inline-flex align-items-center gap-2">

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
              <h4 className={`main-title`}>Add Technologies</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid">

          <div className="card">
            {/* <!-- card header start here  --> */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Technology</h2>
              </div>
            </div>

            <div className="card-body">
              <Form className="upload-form" onSubmit={handleAddTechnology}>

                {/* Add SubService Selection Dropdown */}
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                      Select SubService
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Select
                      value={subServiceId}
                      onChange={(e) => setSubServiceId(e.target.value)}
                      className="form-control form-control-lg form-input"
                      required
                    >
                      <option value="">Select a SubService</option>
                      {subServices.map((subService) => (
                        <option key={subService.id} value={subService.id}>
                          {subService.title}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Technology Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Banner Title..."
                      value={technologyTitle}
                      onChange={(e) => setTechnologyTitle(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 ">
                  <div className="col-12 col-md-3">
                  <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                    Upload Image
                  </Form.Label>
                  </div>
                  <div
                    className="col-12 col-md-8 mt-0 me-0 me-md-5 border d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "150px" }}
                  >
                    <Form.Label
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ cursor: "pointer" }}
                      htmlFor="technologyImage"
                    >
                      <BsCloudUpload size={40} color="gray" />
                      <h6 className={`text-center py-3 ${styles.smFont}`}>
                        Upload Image / Icon
                      </h6>
                    </Form.Label>
                    {technologyImage && (
                      <h6
                        className={`text-center   text-primary ${styles.mdFont}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setImagePreview(true)}
                      >
                        click to preview
                      </h6>
                    )}
                  </div>

                  <Form.Control
                    id="technologyImage"
                    hidden
                    type="file"
                    onChange={handleMedia}
                    placeholder="Social Link Icon"
                    className="flex-grow-1 p-2"
                    required
                  />
                </Form.Group>
                <div className="row">
                  <div className="col-4 col-md-3"></div>
                  <div className="col-12 col-md-9 form-button">
                    <Button variant="secondary" type="button" className="btn form-cancel">
                      Cancel
                    </Button>
                <Button variant="primary" type="submit" className="btn form-btn">
                  Save
                </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTechnology;
