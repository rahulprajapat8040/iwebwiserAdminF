import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllServices } from "@/lib/redux/features/GetAllServices";
import { Editor } from "@tinymce/tinymce-react";

const EditServices = ({ show, setShowEdit, selectedService }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setServiceTitle(selectedService?.title || "");
    setShortDescription(selectedService?.short_description || "");
    setLongDescription(selectedService?.long_description || "");
    setButtonLink(selectedService?.button_link || "");
    setServiceImage(selectedService?.image || "");
  }, [selectedService]);

  const [serviceTitle, setServiceTitle] = useState(selectedService?.title);
  const [shortDescription, setShortDescription] = useState(selectedService?.short_description);
  const [longDescription, setLongDescription] = useState(selectedService?.long_description);
  const [buttonLink, setButtonLink] = useState(selectedService?.button_link);
  const [serviceImage, setServiceImage] = useState(selectedService?.image);

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
      setServiceImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // update service
  const updateService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${Apis.updateService}/${selectedService?.id}`,
        {
          title: serviceTitle,
          image: serviceImage,
          short_description: shortDescription,
          long_description: longDescription,
          button_link: buttonLink,
        }
      );
      dispatch(getAllServices({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
      setServiceTitle("");
      setServiceImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Service Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className={`${styles.mdFont}`}>
              Short Description
            </Form.Label>
            <Editor
              apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
              value={shortDescription}
              init={{
                height: 250,
                menubar: false,
                plugins: ["link", "lists", "image", "media"],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
              }}
              onEditorChange={(content) => setShortDescription(content)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className={`${styles.mdFont}`}>
              Long Description
            </Form.Label>
            <Editor
              apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
              value={longDescription}
              init={{
                height: 250,
                width: "100%",
                menubar: false,
                plugins: ["link", "lists", "image", "media"],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
              }}
              onEditorChange={(content) => setLongDescription(content)}
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Button Link
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Button Link"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "150px" }}
            >
              {serviceImage && (
                <div>
                  <Image
                    src={serviceImage}
                    alt="service"
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
                htmlFor="serviceImage"
              >
                <BsCloudUpload size={40} color="white" />
                <h6 className={`text-center text-white py-3 ${styles.smFont}`}>
                  Upload Image / Icon
                </h6>
              </Form.Label>
            </div>
            <Form.Control
              id="serviceImage"
              hidden
              type="file"
              onChange={handleMedia}
              placeholder="Service Image"
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
            onClick={updateService}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditServices;
