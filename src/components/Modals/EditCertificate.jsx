import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllCertificates } from "@/lib/redux/features/GetAllCertificates";
const EditCertificate = ({ show, setShowEdit, selectedCertificate }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setCertificateName(selectedCertificate?.title || "");
    setCertificateImage(selectedCertificate?.image || "");
  }, [selectedCertificate]);

  const [certificateName, setCertificateName] = useState(
    selectedCertificate?.title
  );
  const [certificateImage, setCertificateImage] = useState(
    selectedCertificate?.image
  );

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
      setCertificateImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // update client
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateCertificate}/${selectedCertificate?.id}`,
        {
          title: certificateName,
          image: certificateImage,
        }
      );
      dispatch(getAllCertificates({ page: 1, limit: 10, showAll: false }));
      // Clear the input fields and increment the index for the next branch
      setShowEdit(false);
      setCertificateName("");
      setCertificateImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {certificateName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 pb-5 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Certificate Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Client Name"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "150px" }}
            >
              {certificateImage && (
                <div>
                  <Image
                    src={certificateImage}
                    alt="banner"
                    width={460}
                    height={150}
                    className="object-fit-cover"
                  />
                </div>
              )}
              <Form.Label
                className="d-flex w-100 top-0 h-100 position-absolute flex-column align-items-center justify-content-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                htmlFor="cleintImage"
              >
                <BsCloudUpload size={40} color="white" />
                <h6 className={`text-center text-white py-3 ${styles.smFont}`}>
                  Upload Image / Icon
                </h6>
              </Form.Label>
            </div>

            <Form.Control
              id="cleintImage"
              hidden
              type="file"
              onChange={handleMedia}
              placeholder="Social Link Icon"
              className="flex-grow-1 p-2"
              required
            />
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
            className={`btn bg-primary `}
            onClick={updateClient}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditCertificate;
