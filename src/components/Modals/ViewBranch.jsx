import { Modal } from "react-bootstrap";

const ViewBranch = ({ show, handleClose, branchData }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{branchData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-4">{branchData?.address}</Modal.Body>
        <Modal.Footer>
          <h6 className="text-capitalize py-2">
            {branchData?.branche_location}
          </h6>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBranch;
