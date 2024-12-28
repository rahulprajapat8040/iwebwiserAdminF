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

const AddBanner = () => {
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [feddbackSubTitile, setfeedbackSubTitle] = useState("");
  const [feedbackImage, setFeedbackImage] = useState(null);
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
      setFeedbackImage(res.data.url);
      toast.success("Client image uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Apis.addFeedback, {
        title: feedbackTitle,
        description: feedbackDescription,
        sub_title: feddbackSubTitile,
        image: feedbackImage,
      })
      setFeedbackImage(null);
      setFeedbackDescription("");
      setFeedbackTitle("");
      setfeedbackSubTitle("");

      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      {
        imagePreview && (
          <ImagePreview image={feedbackImage} setImagePreview={setImagePreview} />
        )
      }
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
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2 >
                  Add Feedback
                </h2>
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
                      value={feedbackTitle}
                      onChange={(e) => setFeedbackTitle(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 ">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Feddback Sub-Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      rows={4}
                      placeholder="Enter Your Feedback Sub Title Here..."
                      value={feddbackSubTitile}
                      onChange={(e) => setfeedbackSubTitle(e.target.value)}
                      className={`form-control form-control-lg form-input`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="row form-group mt-1 mt-md-2 ">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Feddback Description
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter Your Feedback Description Here..."
                      value={feedbackDescription}
                      onChange={(e) => setFeedbackDescription(e.target.value)}
                      className={`form-control form-control-lg form-textbox`}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="row form-group mt-1 mt-md-2 ">
                  <div className="col-12 col-md-3">
                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                      Upload Banner
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
                      {feedbackImage && (
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
                      id="socialLinkIcon"
                      hidden
                      type="file"
                      onChange={handleMedia}
                      placeholder="Social Link Icon"
                      className="flex-grow-1 p-2"
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
      </div >
    </>
  );
};

export default AddBanner;
