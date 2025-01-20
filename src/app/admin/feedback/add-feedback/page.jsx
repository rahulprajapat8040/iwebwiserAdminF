"use client";
import { div, Row, Col, Form, Button, ToastContainer } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import ImagePreview from "@/components/Modals/ImagePreview";
import { toast } from "react-toastify";

const AddBanner = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    sub_title: "",
    image: null,
    alt: ""
  });

  const [imagePreview, setImagePreview] = useState(false);
  const router = useRouter();

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
      setData({ ...data, image: res.data.url });
      toast.success("Client image uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Apis.addFeedback, data);
      setData({
        title: "",
        description: "",
        sub_title: "",
        image: null,
        alt: ""
      });
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={data.image} setImagePreview={setImagePreview} />
      )}
      <div>
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={() => router.back()}
            className="d-inline-block bg-primary p-2 rounded-3"
            style={{ cursor: "pointer" }}
          >
            <IoMdArrowBack color="white" size={30} />
          </div>
          <h4 className={`m-0 ${styles.xxlFont}`}>Add Feedback</h4>
        </div>

        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Add Feedback</h2>
              </div>
            </div>
            <div className="card-body px-md-5">
              <Form onSubmit={handleSubmit} className="upload-form">
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center align-items-center`}>
                      Feedback Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Feedback Title"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      className={`form-control form-control-lg form-input`}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Feedback Sub-Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Feedback Sub Title"
                      name="sub_title"
                      value={data.sub_title}
                      onChange={handleChange}
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Feedback Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter Feedback Description"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      className={`form-control form-control-lg form-textbox`}
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
                      className="form-control form-control-lg form-input border d-flex flex-column align-items-center justify-content-center"
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
                      {data.image && (
                        <h6
                          className={`text-center text-primary ${styles.mdFont}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => setImagePreview(true)}
                        >
                          Click to preview
                        </h6>
                      )}
                    </div>

                    <Form.Control
                      id="socialLinkIcon"
                      hidden
                      type="file"
                      onChange={handleMedia}
                      placeholder="Social Link Icon"
                      className="flex-grow-1 p-2"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center align-items-center`}>
                      Image Alt
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Image Alt"
                      name="alt"
                      value={data.alt}
                      onChange={handleChange}
                      className={`form-control form-control-lg form-input`}
                      required
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
    </>
  );
};

export default AddBanner;
