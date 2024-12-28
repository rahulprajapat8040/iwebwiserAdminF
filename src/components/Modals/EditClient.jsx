import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllClient } from "@/lib/redux/features/GetClients";

const EditClient = ({ show, setShowEdit, selectedClient }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setClientName(selectedClient?.title || "");
    setClientImageUrl(selectedClient?.image || "");
  }, [selectedClient]);

  const [clientName, setClientName] = useState(selectedClient?.title);
  const [clientImageUrl, setClientImageUrl] = useState(selectedClient?.image);

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
      setClientImageUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE CLIENT
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateClient}/${selectedClient?.id}`,
        {
          title: clientName,
          image: clientImageUrl,
        }
      );
      dispatch(getAllClient({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
      setClientName("");
      setClientImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Client</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form onSubmit={updateClient} className="py-5">
          <Row className="mb-4 pb-5 align-items-center">
            <Col md={4} xs={12}>
              <Form.Label className={`m-0 ${styles.mdFont}`}>Client Name</Form.Label>
            </Col>
            <Col md={8} xs={12}>
              <Form.Control
                type="text"
                placeholder="Enter Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`p-2 ${styles.mdFont}`}
                required
              />
            </Col>
          </Row>

          <Row className="mb-4 pb-1 justify-content-center">
            <Col xs={12} className="d-flex justify-content-center">
              <div
                className="border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                style={{ height: "150px", maxWidth: "100%" }}
              >
                {clientImageUrl && (
                  <Image
                    src={clientImageUrl}
                    alt="Client Image"
                    width={300}
                    height={150}
                    className="object-fit-contain"
                  />
                )}
                <Form.Label
                  className="d-flex w-100 h-100 position-absolute flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  htmlFor="cleintImage"
                >
                  <BsCloudUpload size={40} color="white" />
                  <h6 className={`text-center text-white  ${styles.smFont}`}>
                    Upload Image / Icon
                  </h6>
                </Form.Label>
              </div>
            </Col>
            <Col xs={12} className="d-none">
              <Form.Control
                id="cleintImage"
                hidden
                type="file"
                onChange={handleMedia}
                className="flex-grow-1 p-2"
                required
              />
            </Col>
          </Row>

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

export default EditClient;
