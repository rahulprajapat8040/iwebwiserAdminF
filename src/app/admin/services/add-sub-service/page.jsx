"use client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsCloudUpload } from "react-icons/bs";
import { Apis } from "@/utils/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "@/components/Modals/ImagePreview";
import { useEffect, useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesFull } from "@/lib/redux/features/GetAllServices";

const AddSubService = () => {
  const router = useRouter();
  const [subServiceTitle, setSubServiceTitle] = useState("");
  const [subServiceDescription, setSubServiceDescription] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);
  const { services } = useSelector((state) => state.getAllServicesFull);

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllServicesFull());
  }, []);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await axios.get(`${Apis.getAllServicesFull}`);
  //       setServices(response.data.data.services);
  //     } catch (error) {
  //       console.error("Failed to fetch services", error);
  //     }
  //   };
  //   fetchServices();
  // }, []);

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
      setImage(res.data.url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  };

  // HANDLE SUB-SERVICE ADD
  const handleAddSubService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createSubService, {
        service_id: serviceId,
        title: subServiceTitle,
        description: subServiceDescription,
        image: image,
        button_link: buttonLink,
      });
      toast.success(response.data.message);
      // Clear the input fields
      setServiceId("");
      setSubServiceTitle("");
      setSubServiceDescription("");
      setButtonLink("");
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add sub-service");
    }
  };

  return (
    <div>
      <ToastContainer />
      {imagePreview && (
        <ImagePreview
          image={image}
          setImagePreview={setImagePreview}
        />
      )}

      <div className="dash-head">
        <div className="dash_title">
          <div
            onClick={() => router.back()}
            className="btn d-inline-flex align-items-center gap-2"
          >
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
            <h4 className={`main-title`}>Add Sub-Service</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add Sub-Services</h2>
            </div>
          </div>

          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddSubService} className="upload-form">
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Select Service
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    as="select"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="form-control form-control-lg form-input"
                  >
                    <option value="">Select a Service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Sub-Service Title
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    value={subServiceTitle}
                    onChange={(e) => setSubServiceTitle(e.target.value)}
                    placeholder="Enter Sub-Service Title"
                    className="form-control form-control-lg form-input"
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Sub-Service Description
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  {isClient && (
                    <Editor
                      apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                      value={subServiceDescription}
                      init={{
                        height: 250,
                        menubar: false,
                        plugins: [
                          'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                          'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                          'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 
                        ],
                        toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                          'alignleft aligncenter alignright alignjustify | ' +
                          'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help' 
                      }}
                      onEditorChange={(content) => setSubServiceDescription(content)}
                    />
                  )}
                </div>
              </Form.Group>
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Button Link
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    placeholder="Enter Button Link"
                    className="form-control form-control-lg form-input"
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label
                    className={`col-form-label form-label d-flex justify-content-left justify-content-md-center`}
                  >
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
                      htmlFor="subServiceImage"
                    >
                      <BsCloudUpload size={40} color="gray" />
                      <h6 className={`text-center py-3 ${styles.smFont}`}>
                        Upload Image / Icon
                      </h6>
                    </Form.Label>
                    {image && (
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
                  id="subServiceImage"
                  hidden
                  type="file"
                  onChange={handleMedia}
                  className="flex-grow-1 p-2"
                />
              </Form.Group>

              <div className="row">
                <div className="col-4 col-md-3"></div>
                <div className="col-12 col-md-9 form-button">
                  <Button
                    variant="secondary"
                    type="button"
                    className="btn form-cancel"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn form-btn"
                  >
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

export default AddSubService;
