"use client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";

const AddCertificate = () => {
  const router = useRouter();
  const [certificateTitle, setcertificateTitle] = useState("");
  const [certificateImage, setcertificateImage] = useState(null);
  const [alt, setAlt] = useState("")
  const [imagePreview, setImagePreview] = useState(false);

  // HANDLE IMAGE UPLOAD

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image Uploaded Successfully");
      setcertificateImage(res.data.url);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // HANDLE CERTIFICATE ADD

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createCertificate, {
        title: certificateTitle,
        image: certificateImage,
        alt
      });
      toast.success(response.data.message);
      // Clear the input fields and increment the index for the next branch
      setcertificateTitle("");
      setcertificateImage(null);
      setAlt("")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview
          setImagePreview={setImagePreview}
          image={certificateImage}
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
              <h4 className={`main-title`}>Add Certificate</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          {/* <!-- card start here  --> */}
          <div className="card">
            {/* <!-- card header start here  --> */}
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Certificate</h2>
              </div>
            </div>


            <div className="card-body px-0 px-md-5">
              <Form onSubmit={handleAddCertificate} className="upload-form">
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Clinet Name
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      name="certificateTitle"
                      placeholder="Certificate Title"
                      value={certificateTitle}
                      onChange={(e) => setcertificateTitle(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Upload Image
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">

                    <div
                      className="form-control form-control-lg d-flex flex-column justify-content-center form-input"
                      style={{ height: "150px" }}
                    >
                      <Form.Label
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{ cursor: "pointer" }}
                        htmlFor="socialLinkIcon"
                      >
                        <BsCloudUpload size={40} color="gray" />
                        <h6 className={`text-center py-3 ${styles.smFont}`}>
                          Upload Image
                        </h6>
                      </Form.Label>
                      {certificateImage && (
                        <h6
                          className={`text-center   text-primary ${styles.mdFont}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => setImagePreview(true)}
                        >
                          click to preview
                        </h6>
                      )}
                    </div>
                  </div>

                  <Form.Control
                    id="socialLinkIcon"
                    hidden
                    type="file"
                    name="certificateImage"
                    onChange={handleMedia}
                    placeholder="Social Link Icon"
                    className="flex-grow-1 p-2"
                    required
                  />
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
                      Image Alt
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      name="alt"
                      placeholder="Image Alt"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <div className="row form-group mt-1 mt-md-2 ms-md-5">
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
      </div >
    </>
  );
};

export default AddCertificate;
