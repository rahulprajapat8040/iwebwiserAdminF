import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "@/assets/css/base.module.css";
import { Apis } from "@/utils/Apis";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllBlog } from "@/lib/redux/features/GetAllBlogs";

const DeleteBlog = ({ show, setShowDelete, selectedblog }) => {
    const dispatch = useDispatch();
  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(
        `${Apis.deleteBlog}/${selectedblog?.id}`
      );
      dispatch(getAllBlog( { page: 1, limit: 10, showAll: false }));
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

          <h5 className="pt-2 text-black">Delete Blog</h5>
          <h6 className={`text-center  ${styles.mdFont}`}>
            Are you sure you want to remove this Blog?
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
              onClick={handleDeleteBlog}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteBlog;