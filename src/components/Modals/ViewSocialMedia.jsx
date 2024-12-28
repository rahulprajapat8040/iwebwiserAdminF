"use client";
import { Button, Modal } from "react-bootstrap";
import Image from "next/image";

// Destructure the props correctly
const ViewSocialMedia = ({ show, handleClose, socialLinkData }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{socialLinkData?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="d-flex justify-content-center align-items-center gap-3">
            {socialLinkData && socialLinkData.icon && (
              <Image
                src={socialLinkData.icon}
                alt="social-icon"
                width={150}
                height={150}
                style={{
                  objectFit: "contain",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 mt-3 flex-column">
            <h5 className="text-center">{socialLinkData?.social_link}</h5>
            <Button
              onClick={() => window.open(socialLinkData?.social_link, "_blank")}
              variant="primary"
              className="w-25"
            >
              Visit
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewSocialMedia;
