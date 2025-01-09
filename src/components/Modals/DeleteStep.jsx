import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getSteps } from "@/lib/redux/features/GetAllSteps";

const DeleteStep = ({ show, setShowDelete, selectedStep }) => {
  const dispatch = useDispatch();
  const handleDelete = async (selectedStep) => {
    try {
      await axios.delete(`${Apis.deleteSetp}/${selectedStep?.id}`);
      dispatch(getSteps());
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
            Are you sure you want to delete this Step?
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
            onClick={() => handleDelete(selectedStep)}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteStep;