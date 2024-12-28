import Image from "next/image";
import styles from "@/assets/css/base.module.css";
const { Modal, Button } = require("react-bootstrap");

const ViewBanner = ({ show, setShowView, selectedBanner }) => {
  return (
    <Modal show={show} onHide={() => setShowView(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View {selectedBanner?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center ">
          {selectedBanner?.image && selectedBanner.image !== null ? (
            <video
              src={selectedBanner?.image}
              width={450}
              height={300}
              className="rounded-2 object-fit-cover"
              autoPlay
              loop
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={selectedBanner?.image}
              alt="selectedBanner"
              width={450}
              height={300}
              className="rounded-2 object-fit-cover"
            />
          )}
          <h1 className="my-3 text-center" style={{ fontSize: "16px" }}>{selectedBanner?.title}</h1>
          <p className={`text-center  ${styles.mdFont}`}>
            {selectedBanner?.description}
          </p>
          <Button
            className="btn btn-secondary"
            onClick={() => setShowView(false)}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewBanner;
