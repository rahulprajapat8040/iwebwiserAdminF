"use client";
import { Form, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import ImagePreview from "@/components/Modals/ImagePreview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClient = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: "",
    clientImageUrl: null,
    alt: "",
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
      setFormData((prev) => ({ ...prev, clientImageUrl: res.data.url }));
      toast.success("Client image uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Apis.createClient, {
        title: formData.clientName,
        image: formData.clientImageUrl,
        alt: formData.alt,
      });

      setFormData({ clientName: "", clientImageUrl: null, alt: "" });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview
          image={formData.clientImageUrl}
          setImagePreview={setImagePreview}
        />
      )}
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={() => router.back()}
            className="d-inline-block bg-primary px-2 py-1 rounded-3"
            style={{ cursor: "pointer" }}
          >
            <IoMdArrowBack color="white" size={25} />
          </div>
          <h4 className={`m-0 ${styles.xlFont}`}>Add Client</h4>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add Clients</h2>
            </div>
          </div>
          <div className="card-body px-md-4">
            <Form onSubmit={createClient} className="upload-form">
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Client Name
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 me-5 mt-0">
                  <Form.Control
                    type="text"
                    placeholder="Enter Client Name..."
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="row form-group">
                <div className="col-12 col-md-3">
                  <Form.Label
                    htmlFor="inputClientFile"
                    className="col-form-label form-label d-flex justify-content-left justify-content-md-center"
                  >
                    Upload Logo
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-5">
                  <div
                    className="form-group d-flex flex-column align-items-center mb-20 upload-input"
                    style={{ height: "150px" }}
                  >
                    <Form.Label
                      className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4"
                      style={{ cursor: "pointer" }}
                      htmlFor="socialLinkIcon"
                    >
                      <BsCloudUpload size={40} color="gray" />
                      <h6 className={`text-center py-3 ${styles.smFont}`}>
                        Upload Image / Icon
                      </h6>
                    </Form.Label>
                    {formData.clientImageUrl && (
                      <h6
                        className={`text-center text-primary ${styles.mdFont}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setImagePreview(true)}
                      >
                        Click to preview
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
                  required
                />
              </Form.Group>
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Image Alt
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 me-5 mt-0">
                  <Form.Control
                    type="text"
                    placeholder="Enter Image Alt..."
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
                    className="form-control form-control-lg form-input"
                    required
                  />
                </div>
              </Form.Group>
              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-9 form-button">
                  <Button
                    role="button"
                    variant="secondary"
                    className="btn form-cancel"
                  >
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

export default AddClient;
