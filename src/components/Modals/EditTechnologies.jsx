import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllTechnology } from "@/lib/redux/features/GetAllTechnologies";

const EditTechnologies = ({ show, setShowEdit, selectedTechnology }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTechnology) {
      setTechnologyTitle(selectedTechnology?.title || "");
      setTechnoloyImage(selectedTechnology?.image || "");
    }
  }, [selectedTechnology]);

  const [technologyTitle, setTechnologyTitle] = useState(selectedTechnology?.title || "");
  const [technologyImage, setTechnoloyImage] = useState(selectedTechnology?.image || "");

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
      setTechnoloyImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE TECHNOLOGY
  const updateTechnology = async (e) => {
    e.preventDefault();
    try {
      if (!selectedTechnology?.id) {
        console.error("No technology selected for update.");
        return;
      }

      const response = await axios.put(
        `${Apis.updateTechnology}/${selectedTechnology?.id}`,
        {
          title: technologyTitle,
          image: technologyImage,
        }
      );

        // Clear input fields and close modal after successful update
        setShowEdit(false);
        setTechnologyTitle("");
        setTechnoloyImage("");

        // Dispatch the action to fetch the updated technology list
        dispatch(getAllTechnology({
          page: 1,
          limit: 10,
          showAll: false
        }));
    } catch (error) {
      console.log("Error updating technology:", error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Technology</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form onSubmit={updateTechnology} className="py-5">
          {/* Technology Title Input */}
          <Row className="mb-4 pb-3 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Technology Title</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Technology Title"
                value={technologyTitle}
                onChange={(e) => setTechnologyTitle(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          {/* Image Upload Section */}
          <Row className="mb-4 pb-1 justify-content-center">
            <Col xs={12} className="d-flex justify-content-center">
              <div
                className="border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                style={{ height: "150px", maxWidth: "100%" }}
              >
                {technologyImage && (
                  <div>
                    <Image
                      src={technologyImage}
                      alt="Technology Image"
                      width={460}
                      height={153}
                      className="object-fit-contain"
                    />
                  </div>
                )}
                <Form.Label
                  className="d-flex w-100 h-100 position-absolute flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  htmlFor="technologyImage"
                >
                  <BsCloudUpload size={40} color="white" />
                  <h6 className={`text-center text-white py-3 ${styles.smFont}`}>
                    Upload Image / Icon
                  </h6>
                </Form.Label>
              </div>
            </Col>

            {/* Hidden File Input */}
            <Col xs={12} className="d-none">
              <Form.Control
                id="technologyImage"
                hidden
                type="file"
                onChange={handleMedia}
                className="flex-grow-1 p-2"
                required
              />
            </Col>
          </Row>

          {/* Buttons Section */}
          <Row className="justify-content-center gap-2">
            <Col xs="auto">
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowEdit(false)}
              >
                Close
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="submit"
                className="btn bg-primary"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTechnologies;
