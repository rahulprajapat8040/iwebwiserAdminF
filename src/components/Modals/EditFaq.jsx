import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { getAllFaq } from "@/lib/redux/features/GetAllFaq";
import { getAllServicesFull } from "@/lib/redux/features/GetAllServices";

const EditFaq = ({ show, setShowEdit, selectedFaq }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.getAllServicesFull.services);

  useEffect(() => {
    dispatch(getAllServicesFull({}));
    setFaqQuestion(selectedFaq?.question || "");
    setFaqAnswer(selectedFaq?.answer || "");
    setServiceId(selectedFaq?.service?.id || "");
  }, [selectedFaq, dispatch]);

  const [faqQuestion, setFaqQuestion] = useState(selectedFaq?.question);
  const [faqAnswer, setFaqAnswer] = useState(selectedFaq?.answer);
  const [serviceId, setServiceId] = useState(selectedFaq?.service?.id);

  // update FAQ
  const updateFaq = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${Apis.updateServiceFaq}/${selectedFaq?.id}`,
        {
          service_id: serviceId,
          question: faqQuestion,
          answer: faqAnswer,
        }
      );
      dispatch(getAllFaq({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
      setFaqQuestion("");
      setFaqAnswer("");
      setServiceId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="w-25 m-0">
              Question
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter FAQ Question"
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              className="flex-grow-1 p-2 w-75"
              style={{ fontSize: "13px" }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Answer
            </Form.Label>
            <Editor
              apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
              value={faqAnswer}
              init={{
                height: 250,
                menubar: false,
                plugins: ["link", "lists", "image", "media"],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
              }}
              onEditorChange={(content) => setFaqAnswer(content)}
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="w-25 m-0">
              Service
            </Form.Label>
            <Form.Control
              as="select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
              className="flex-grow-1 p-2 w-75"
              style={{ fontSize: "13px" }}
            >
              <option value="" disabled>Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEdit(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            className="btn bg-primary"
            onClick={updateFaq}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditFaq;
