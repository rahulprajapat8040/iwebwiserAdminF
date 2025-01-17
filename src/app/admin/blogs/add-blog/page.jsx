"use client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { BsCloudUpload } from "react-icons/bs";
import { useState } from "react";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";
import styles from "@/assets/css/base.module.css";
import axios from "axios";

const AddBlog = () => {
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogButtonLink, setBlogButtonLink] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);

  // IMAGE UPLOAD

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE BLOG ADD

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createBlog, {
        title: blogTitle,
        description: blogDescription,
        blog_link: blogButtonLink,
        image: blogImage,
      });
      toast.success(response.data.message);
      // Clear the input fields and increment the index for the next branch
      setBlogTitle("");
      setBlogDescription("");
      setBlogImage("");
      setBlogImage(null);
      setBlogButtonLink("");
      setImagePreview(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={blogImage} setImagePreview={setImagePreview} />
      )}
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
            <h4 className={`main-title`}>Add Blog</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div
              className="card-title d-flex justify-content-between align-items-center"
            >
              <h2>Add Blog</h2>
            </div>
          </div>

          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddBlog} className="upload-form" >
              {/* Social Title Input */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">

                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Blog Title
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter Blog Title"
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>

              {/* Social Link Input */}
              <Form.Group className="row form-group mt-1 mt-md-2 ">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                    Blog Description
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    as="textarea"
                    placeholder="Write Your Blog Description Here..."
                    rows={3}
                    value={blogDescription}
                    onChange={(e) => setBlogDescription(e.target.value)}
                    className="form-control form-control-lg form-textbox"
                  />
                </div>
              </Form.Group>
              {/* Social Link Input */}
              <Form.Group className="row form-group mt-1 mt-md-2 ">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
                    Button Link
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    value={blogButtonLink}
                    onChange={(e) => setBlogButtonLink(e.target.value)}
                    placeholder="Enter Button Link"
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2 ">
                <div className="col-12 col-md-3">
                  <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                    Blog Image
                  </Form.Label>
                </div>
                <div
                  className="col-12 col-md-8 mt-0 me-0 me-md-5 border d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "150px" }}
                >
                  <Form.Label
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ cursor: "pointer" }}
                    htmlFor="blogImage"
                  >
                    <BsCloudUpload size={40} color="gray" />
                    <h6 className={`text-center py-3 ${styles.smFont}`}>
                      Upload Image
                    </h6>
                  </Form.Label>
                  {blogImage && (
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
                  id="blogImage"
                  hidden
                  type="file"
                  onChange={handleMedia}
                  placeholder="Enter Blog Image / Icon / Video"
                  className="flex-grow-1 p-2"
                  required
                />
              </Form.Group>

              {/* Submit Button */}
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
  );
};

export default AddBlog;
