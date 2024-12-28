import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllSocialMedia } from "@/lib/redux/features/GetAllSocialMedia";

const DeleteTechnologies = ({ show, setShowDelete, selectedSoicalMedia }) => {
  const dispatch = useDispatch();
  const handleDelete = async (selectedSoicalMedia) => {
    try {
      const response = await axios.delete(
        `${Apis.deleteSocialLink}/${selectedSoicalMedia?.id}`
      );
      dispatch(getAllSocialMedia({
        page: 1,
        limit: 10,
        showAll: false
      }));
      // Clear the input fields and increment the index for the next branch
      setShowDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="md" centered show={show} onHide={() => setShowDelete(!show)}>
      <Modal.Header className="border-0 pb-0" closeButton></Modal.Header>
      <Modal.Body className="p">
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <RiDeleteBin6Line color="red" size={24} />
          <h6 className="text-center pt-3 pb-5 text-black">
            Are you sure you want to delete this Social Media?
          </h6>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowDelete(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(selectedSoicalMedia)}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTechnologies;