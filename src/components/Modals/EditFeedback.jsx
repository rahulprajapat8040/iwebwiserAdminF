import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllFeedback } from "@/lib/redux/features/GetAllFeddBack";

const EditFeedback = ({ show, setShowEdit, selectedFeddback }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFeddback) {
      setFeddbackTitle(selectedFeddback?.title || "");
      setFeedbackSubTitle(selectedFeddback?.sub_title || "");
      setFeedbackDescription(selectedFeddback?.description || "");
      setfeedbackImage(selectedFeddback?.image || "");
    }
  }, [selectedFeddback]);

  const [feddbackTitle, setFeddbackTitle] = useState(selectedFeddback?.title);
  const [feddbackSubTitle, setFeedbackSubTitle] = useState(selectedFeddback?.sub_title);
  const [feedbackDescription, setFeedbackDescription] = useState(selectedFeddback?.description);
  const [feedbackImage, setfeedbackImage] = useState(selectedFeddback?.image);

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
      setfeedbackImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // Update client feedback
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFeddback?.id) {
        console.error("No feedback selected for update.");
        return;
      }

      const response = await axios.put(
        `${Apis.updateFeedback}/${selectedFeddback?.id}`,
        {
          title: feddbackTitle,
          sub_title: feddbackSubTitle,
          description: feedbackDescription,
          image: feedbackImage,
        }
      );

      if (response.status === 200) {
        // Clear input fields and close modal after successful update
        setShowEdit(false);
        setFeddbackTitle("");
        setfeedbackImage("");

        // Dispatch the action to fetch the updated feedback list
        dispatch(getAllFeedback({
          page: 1,
          limit: 10,
          showAll: false,
        }));
      }
    } catch (error) {
      console.log("Error updating Feedback:", error);
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form>
          {/* Feedback Title */}
          <Row className="mb-4">
            <Col xs={12} md={3} className="d-flex align-items-center">
              <Form.Label className={`m-0 ${styles.mdFont}`}>Feedback Title</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type="text"
                placeholder="Enter Feedback Title"
                value={feddbackTitle || ""}
                onChange={(e) => setFeddbackTitle(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Feedback Sub-Title */}
          <Row className="mb-4">
            <Col xs={12} md={3} className="d-flex align-items-center">
              <Form.Label className={`m-0 ${styles.mdFont}`}>Feedback Sub-Title</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type="text"
                placeholder="Enter Feedback Sub-Title"
                value={feddbackSubTitle || ""}
                onChange={(e) => setFeedbackSubTitle(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Feedback Description */}
          <Row className="mb-4">
            <Col xs={12} md={3} className="d-flex align-items-center">
              <Form.Label className={`m-0 ${styles.mdFont}`}>Feedback Description</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Feedback Description"
                value={feedbackDescription || ""}
                onChange={(e) => setFeedbackDescription(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Image Upload */}
          <Row className="mb-4 pb-1">
            <Col xs={12} md={12} className="d-flex align-items-center justify-content-center">
              <div
                className="border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                style={{ height: "150px" , width: '300px'}}
              >
                {feedbackImage && (
                  <div>
                    {feedbackImage && feedbackImage !== null ? (
                      <video
                        src={feedbackImage || null}
                        className="rounded-2 object-fit-cover"
                        width={300}
                        height={150}
                        autoPlay
                        loop
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={feedbackImage || null}
                        alt="Feedback Image"
                        width={350}
                        height={150}
                        className="rounded-2 object-fit-cover"
                      />
                    )}
                  </div>
                )}
                <Form.Label
                  className="d-flex w-100 h-100  position-absolute flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  htmlFor="clientImage"
                >
                  <BsCloudUpload size={40} color="white" />
                  <h6 className={`text-center text-white  ${styles.smFont}`}>
                    Upload Image / Icon
                  </h6>
                </Form.Label>
              </div>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                id="clientImage"
                hidden
                type="file"
                onChange={handleMedia}
                placeholder="Social Link Icon"
                className="flex-grow-1 p-2"
                required
              />
            </Col>
          </Row>
        </Form>

        {/* Buttons */}
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="d-flex justify-content-center gap-2 flex-column flex-md-row">
            <Button
              type="button"
              className="btn btn-secondary mb-2 mb-md-0"
              onClick={() => setShowEdit(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              className="btn bg-primary"
              onClick={updateClient}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EditFeedback;
