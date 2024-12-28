import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllSocialMedia } from "@/lib/redux/features/GetAllSocialMedia";
const EditSocialMedia = ({ show, setShowEdit, selectedSoicalMedia }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setLink(selectedSoicalMedia?.link || "");
  }, [selectedSoicalMedia]);

  const [link, setLink] = useState(selectedSoicalMedia?.link);

  // update client
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateSocialMedia}`,
        {
          id: selectedSoicalMedia?.id,
          link: link,
        }
      );
      dispatch(getAllSocialMedia({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Social Media</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Social Media link
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
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

export default EditSocialMedia;
