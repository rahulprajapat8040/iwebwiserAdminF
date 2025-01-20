"use client";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";

const AddTechnology = () => {
  const [imagePreview, setImagePreview] = useState(false);

  // Managing form data in a single state object
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
    alt: "",
  });

  const router = useRouter();

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
      setData((prevData) => ({
        ...prevData,
        image: res.data.url,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // HANDLE TECHNOLOGY ADD
  const handleAddTechnology = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createTechnology, {
        title: data.title,
        description: data.description,
        image: data.image,
        alt: data.alt,
      });
      toast.success(response.data.message);
      // Clear the input fields after successful submission
      setData({
        title: "",
        description: "",
        image: null,
        alt: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview
          image={data.image}
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
            {/* Card header start here */}
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Add Technology</h2>
              </div>
            </div>

            <div className="card-body">
              <Form className="upload-form" onSubmit={handleAddTechnology}>
                {/* Technology Title */}
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                      Technology Title
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Technology Title..."
                      value={data.title}
                      onChange={(e) => setData({ ...data, title: e.target.value })}
                      className="form-control form-control-lg form-input"
                      required
                    />
                  </div>
                </Form.Group>

                {/* Upload Image */}
                <Form.Group className="row form-group mt-1 mt-md-2 ">
                  <div className="col-12 col-md-3">
                    <Form.Label className="col-form-label form-label d-flex justify-content-start justify-content-md-center">
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
                    {data.image && (
                      <h6
                        className={`text-center text-primary ${styles.mdFont}`}
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
                    className="flex-grow-1 p-2"
                    required
                  />
                </Form.Group>

                {/* Image Alt */}
                <Form.Group className="row form-group mt-1 mt-md-2">
                  <div className="col-12 col-md-3">
                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                      Image Alt
                    </Form.Label>
                  </div>
                  <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                    <Form.Control
                      type="text"
                      placeholder="Enter Image Alt..."
                      value={data.alt}
                      onChange={(e) => setData({ ...data, alt: e.target.value })}
                      className="form-control form-control-lg form-input"
                      required
                    />
                  </div>
                </Form.Group>

                {/* Action Buttons */}
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
