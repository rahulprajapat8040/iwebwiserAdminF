"use client";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsCloudUpload } from "react-icons/bs";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";
import { useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";

const AddSteps = () => {
  const router = useRouter();
  const [StepTitle, setStepTitle] = useState("");
  const [StepDescription, setStepDescription] = useState("");
  const [StepImage, setStepImage] = useState(null);
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
      setStepImage(res.data.url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // HANDLE STEP ADD
  const handleAddStep = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createStep, {
        title: StepTitle,
        description: StepDescription,
        image: StepImage,
      });
      toast.success(response.data.message);
      // Clear the input fields
      setStepTitle("");
      setStepDescription("");
      setStepImage("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview image={StepImage} setImagePreview={setImagePreview} />
      )}
      <div className="dash-head">
        <div className="dash_title">
          <div onClick={() => router.back()} className="btn d-inline-flex align-items-center gap-2">
            <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
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
            <h4 className={`main-title`}>Add Step</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add Step</h2>
            </div>
          </div>

          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddStep} className="upload-form">
              {/* Step Title Input */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Step Title
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    placeholder="Enter Step Title"
                    className="form-control form-control-lg form-input"
                    style={{ fontSize: "13px" }}
                    value={StepTitle}
                    onChange={(e) => setStepTitle(e.target.value)}
                  />
                </div>
              </Form.Group>

              {/* Step Description Input */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Step Description
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter Step Description"
                    className="form-control form-control-lg form-textbox"
                    style={{ fontSize: "13px" }}
                    value={StepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                  />
                </div>
              </Form.Group>

              {/* Upload Image */}
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}>
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
                      htmlFor="StepImage"
                    >
                      <BsCloudUpload size={40} color="gray" />
                      <h6 className={`text-center py-3 ${styles.smFont}`}>
                        Upload Image
                      </h6>
                    </Form.Label>
                    {StepImage && (
                      <h6
                        className={`text-center text-primary ${styles.mdFont}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setImagePreview(true)}
                      >
                        click to preview
                      </h6>
                    )}
                  </div>
                </div>
                <Form.Control
                  id="StepImage"
                  hidden
                  type="file"
                  onChange={handleMedia}
                  className="flex-grow-1 p-2"
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-8 form-button">
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

export default AddSteps;
