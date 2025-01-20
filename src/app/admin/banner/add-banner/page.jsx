"use client";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import ImagePreview from "@/components/Modals/ImagePreview";

const AddSection = () => {
  const [formData, setFormData] = useState({
    bannerTitle: "",
    bannerDescription: "",
    buttonLink: "",
    bannerImgUrl: "",
    alt: ""
  });
  const [imagePreview, setImagePreview] = useState(false);
  const router = useRouter();

  // Handle Image Upload

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData((prevData) => ({
        ...prevData,
        bannerImgUrl: res.data.url
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Hnadle Add Banner Section
  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createBanner, {
        title: formData.bannerTitle,
        description: formData.bannerDescription,
        button_link: formData.buttonLink,
        image: formData.bannerImgUrl,
        alt: formData.alt
      });
      toast.success(response.data.message);
      // Clear the input fields and reset the form data
      setFormData({
        bannerTitle: "",
        bannerDescription: "",
        buttonLink: "",
        bannerImgUrl: "",
        alt: ""
      });
      setImagePreview(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={formData.bannerImgUrl} setImagePreview={setImagePreview} />
      )}
      <div className="main-data">
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
              <h4 className={`main-title`}>Add Header</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Add Banner</h2>
              </div>
            </div>

            <div className="card-body">
              <Form onSubmit={handleAddBanner} className="upload-form">
                <Form.Group className="row form-group mt-1 mt-md-2 px-md-4">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`} >
                      Banner Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Banner Title..."
                      value={formData.bannerTitle}
                      onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                      className={`form-control form-control-lg form-input `}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 px-md-4">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Banner Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-5">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter Your Banner Description Here..."
                      value={formData.bannerDescription}
                      onChange={(e) => setFormData({ ...formData, bannerDescription: e.target.value })}
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 px-md-4">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Button Link
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Button Link..."
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className={`form-control form-control-lg form-input`}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 px-md-4">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Upload Banner
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-5">
                    <div
                      className="form-group d-flex flex-column justify-content-center align-items-center mb-20 upload-input"
                      style={{ height: "150px" }}
                    >
                      <Form.Label
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{ cursor: "pointer" }}
                        htmlFor="socialLinkIcon"
                      >
                        <BsCloudUpload size={40} color="gray" />
                        <h6 className={`text-center py-3 ${styles.smFont}`}>
                          Upload Image / Icon
                        </h6>
                      </Form.Label>
                      {formData.bannerImgUrl && (
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
                    onChange={handleMedia}
                    placeholder="Social Link Icon"
                    className="flex-grow-1 p-2"
                  />
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 px-md-4">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`} >
                      Image Alt
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Image Alt"
                      value={formData.alt}
                      onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                      className={`form-control  form-control-lg form-input `}
                    />
                  </div>
                </Form.Group>
                <div className="row">
                  <div className="col-4 col-md-3"></div>
                  <div className="col-12 col-md-9 form-button">
                    <Button
                      variant="secondary"
                      type="button"
                      className="mt-3 btn form-cancel"
                      onClick={() => router.push('/admin/banner/banner-list')}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="mt-3 btn form-btn">
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

export default AddSection;
