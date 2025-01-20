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
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    blog_link: "",
    image: null,
    alt: ""
  });
  const [imagePreview, setImagePreview] = useState(false);

  const handleMedia = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogData((prevData) => ({ ...prevData, image: res.data.url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createBlog, blogData);
      toast.success(response.data.message);
      setBlogData({
        title: "",
        description: "",
        blog_link: "",
        image: null,
        alt: ""
      });
      setImagePreview(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add blog");
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={blogData.image} setImagePreview={setImagePreview} />
      )}
      <div className="dash-head">
        <div className="dash_title">
          <div onClick={() => router.back()} className="btn d-inline-flex align-items-center gap-2">
            <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
              <IoMdArrowBack color="#FFFFFF" size={25} />
            </div>
            <h4 className={`main-title`}>Add Blog</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add Blog</h2>
            </div>
          </div>
          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddBlog} className="upload-form">
              <Form.Group className="row form-group mt-1 mt-md-2">
                <Form.Label className="col-12 col-md-3 col-form-label form-label d-flex justify-content-left justify-content-md-center">
                  Blog Title
                </Form.Label>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    name="title"
                    value={blogData.title}
                    onChange={handleChange}
                    placeholder="Enter Blog Title"
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <Form.Label className="col-12 col-md-3 col-form-label form-label d-flex justify-content-start justify-content-md-center">
                  Blog Description
                </Form.Label>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Write Your Blog Description Here..."
                    rows={3}
                    value={blogData.description}
                    onChange={handleChange}
                    className="form-control form-control-lg form-textbox"
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <Form.Label className="col-12 col-md-3 col-form-label form-label d-flex justify-content-start justify-content-md-center">
                  Button Link
                </Form.Label>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    name="blog_link"
                    value={blogData.blog_link}
                    onChange={handleChange}
                    placeholder="Enter Button Link"
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <Form.Label className="col-12 col-md-3 col-form-label form-label d-flex justify-content-start justify-content-md-center">
                  Blog Image
                </Form.Label>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5 border d-flex flex-column align-items-center justify-content-center" style={{ height: "150px" }}>
                  <Form.Label className="d-flex flex-column align-items-center justify-content-center" style={{ cursor: "pointer" }} htmlFor="blogImage">
                    <BsCloudUpload size={40} color="gray" />
                    <h6 className={`text-center py-3 ${styles.smFont}`}>
                      Upload Image
                    </h6>
                  </Form.Label>
                  {blogData.image && (
                    <h6 className={`text-center text-primary ${styles.mdFont}`} style={{ cursor: "pointer" }} onClick={() => setImagePreview(true)}>
                      Click to preview
                    </h6>
                  )}
                </div>
                <Form.Control
                  id="blogImage"
                  hidden
                  type="file"
                  onChange={handleMedia}
                  placeholder="Enter Blog Image"
                  className="flex-grow-1 p-2"
                />
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <Form.Label className="col-12 col-md-3 col-form-label form-label d-flex justify-content-left justify-content-md-center">
                  Image Alt
                </Form.Label>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    name="alt"
                    value={blogData.alt}
                    onChange={handleChange}
                    placeholder="Enter Image Alt"
                    className="form-control form-control-lg form-input"
                  />
                </div>
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
  );
};

export default AddBlog;
