import { Modal, Button, Form } from "react-bootstrap";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
const ViewBlog = ({ show, setShowView, selectedblog }) => {
  return (
    <Modal show={show} onHide={() => setShowView(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View {selectedblog?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center ">
          <Image
            src={selectedblog?.image}
            alt="banner"
            width={450}
            height={300}
            className="rounded-2 object-fit-cover"
          />
          <h4 className="mt-3 text-black">{selectedblog?.title}</h4>
          <p className={`text-center  ${styles.mdFont}`}>
            {selectedblog?.description}
          </p>
          <Button className={`btn btn-secondary px-3 py-2 ${styles.mdFont}`} onClick={() => setShowView(false)}>
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewBlog;
