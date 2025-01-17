import { Modal, Button } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllHeader } from "@/lib/redux/features/GetAllHeader";
const DeleteHeader = ({ show, setShowDelete, selectedHeader }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${Apis.deleteHeader}/${selectedHeader?.id}`
      );
      dispatch(getAllHeader());
      setShowDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="md" centered show={show} onHide={() => setShowDelete(!show)}>
      <Modal.Header className="border-0 pb-0" closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <RiDeleteBin6Line color="red" size={24} />
          <h6 className="text-center pt-3 pb-5 text-black">
            Are you sure you want to delete {selectedHeader?.title}?
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteHeader;
