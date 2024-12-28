import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllIndustry } from "@/lib/redux/features/GetAllIndustry";
const EditIndustry = ({ show, setShowEdit, selectedIndustry }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle(selectedIndustry?.title || "");
    setdescription(selectedIndustry?.description || "");
    setButtonLink(selectedIndustry?.button_link || "");
    setService(selectedIndustry?.services || "");
    setIndustryImage(selectedIndustry?.image || "");
  }, [selectedIndustry]);

  const [title, setTitle] = useState(selectedIndustry?.title);
  const [description, setdescription] = useState(selectedIndustry?.description);
  const [buttonLink, setButtonLink] = useState(selectedIndustry?.button_link);
  const [services, setService] = useState(selectedIndustry?.services);
  const [industryImage, setIndustryImage] = useState(selectedIndustry?.image);

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
      setIndustryImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // update client
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateIndustry}/${selectedIndustry?.id}`,
        {
          title: title,
          image: industryImage,
          description: description,
          button_link: buttonLink,
          services: services,
        }
      );
      dispatch(getAllIndustry({ page: 1, limit:10, showAll: false }));
      // Clear the input fields and increment the index for the next branch
      setShowEdit(false);
      setTitle("");
      setIndustryImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Industy</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Industry Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4  d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Industry Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Service Title"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Button Link
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Sub Service
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={services}
              onChange={(e) => setService(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "150px" }}
            >
              {industryImage && (
                <div>
                  <Image
                    src={industryImage}
                    alt="banner"
                    width={460}
                    height={153}
                  />
                </div>
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

export default EditIndustry;
