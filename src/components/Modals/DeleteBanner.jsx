import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { getAllBanner } from "@/lib/redux/features/GetBanner";



const DeleteBanner = ({ show, setShowDelete, selectedBanner }) => {
    const dispatch = useDispatch();
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `${Apis.deleteBanner}/${selectedBanner.id}`
      );
      dispatch(getAllBanner());
      setShowDelete(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Modal centered show={show} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this banner?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary"
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </Button>
          <Button className="btn btn-danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBanner;
