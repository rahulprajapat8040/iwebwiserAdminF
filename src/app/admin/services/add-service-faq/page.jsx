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

const AddServiceFaq = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${Apis.getAllServicesFull}`);
        setServices(response.data.data.services);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  // HANDLE FAQ ADD
  const handleAddFaq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Apis.createServiceFaq, {
        service_id: serviceId,
        question: question,
        answer: answer,
      });
      toast.success(response.data.message);
      // Clear the input fields
      setServiceId("");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add FAQ");
    }
  };

  return (
    <div>
      <ToastContainer />

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
            <h4 className={`main-title`}>Add FAQ</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h2>Add FAQ</h2>
            </div>
          </div>

          <div className="card-body px-0 px-md-5">
            <Form onSubmit={handleAddFaq} className="upload-form">
              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Select Sub Service <span className="text-danger">*</span>
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    as="select"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="form-control form-control-lg form-input"
                  >
                    <option value="">Select a Sub Service</option>
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
                    Question
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  <Form.Control
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter Question"
                    className="form-control form-control-lg form-input"
                  />
                </div>
              </Form.Group>

              <Form.Group className="row form-group mt-1 mt-md-2">
                <div className="col-12 col-md-3">
                  <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                    Answer
                  </Form.Label>
                </div>
                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                  {isClient && (
                    <Editor
                      apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                      value={answer}
                      init={{
                        height: 250,
                        menubar: false,
                        plugins: ["link", "lists", "image", "media"],
                        toolbar:
                          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
                      }}
                      onEditorChange={(content) => setAnswer(content)}
                    />
                  )}
                </div>
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

export default AddServiceFaq;
