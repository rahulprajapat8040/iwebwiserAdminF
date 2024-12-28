import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "@/assets/css/base.module.css";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllClient } from "@/lib/redux/features/GetClients";

const DeleteClient = ({ show, setShowDelete, selectedClient }) => {
  const dispatch = useDispatch();
  const handleDeleteClient = async () => {
    try {
      const response = await axios.delete(
        `${Apis.deleteClient}/${selectedClient?.id}`
      );
      dispatch(getAllClient( { page: 1, limit: 10, showAll: false }));
      // Clear the input fields and increment the index for the next branch
      setShowDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} centered onHide={() => setShowDelete(!show)}>
      <Modal.Header className="border-0 pb-1" closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <RiDeleteBin6Line color="red" size={24} />

          <h5 className="pt-2 text-black">Delete Client</h5>
          <h6 className={`text-center  ${styles.mdFont}`}>
            Are you sure you want to remove this Client?
          </h6>
          <div className={`d-flex mt-3 justify-content-center gap-2 `}>
            {" "}
            <Button
              className={`${styles.mdFont} btn px-3 btn-secondary`}
              onClick={() => setShowDelete(false)}
            >
              Cencel
            </Button>
            <Button
              className={`${styles.mdFont} btn px-3 btn-danger`}
              onClick={handleDeleteClient}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteClient;
