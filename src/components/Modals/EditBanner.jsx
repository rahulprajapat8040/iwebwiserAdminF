import { Button, Modal, Form } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import ImagePreview from "./ImagePreview";
import Image from "next/image";
import { getAllBanner } from "@/lib/redux/features/GetBanner";
import { useDispatch } from "react-redux";

const EditBanner = ({ show, setShowEdit, selectedBanner }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setBannerTitle(selectedBanner?.title || "");
    setBannerDescription(selectedBanner?.description || "");
    setButtonLink(selectedBanner?.button_link || "");
    setMediaUrl(selectedBanner?.image || "");
    setImagePreview(false);
  }, [selectedBanner]);

  const [bannerTitle, setBannerTitle] = useState(selectedBanner?.title);
  const [bannerDescription, setBannerDescription] = useState(
    selectedBanner?.description
  );
  const [buttonLink, setButtonLink] = useState(selectedBanner?.button_link);
  const [mediaUrl, setMediaUrl] = useState(selectedBanner?.image);
  const [imagePreview, setImagePreview] = useState(false);

  // HANDLE IMAGE UPLOAD

  const handleMedia = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(Apis.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMediaUrl(res.data.url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // HANDLE BANNER UPDATE

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateBanner}/${selectedBanner?.id}`,
        {
          title: bannerTitle,
          description: bannerDescription,
          button_link: buttonLink,
          image: mediaUrl,
        }
      );
      dispatch(getAllBanner());
      // Clear the input fields and increment the index for the next branch
      setShowEdit(false);
      setBannerTitle("");
      setBannerDescription("");
      setButtonLink("");
      setMediaUrl("");
      setImagePreview(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={() => setShowEdit(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4 pb-1 d-flex align-items-center">
              <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                Banner Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Banner Title"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 pb-1 d-flex align-items-center">
              <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                Banner Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Your Banner Description Here..."
                value={bannerDescription}
                onChange={(e) => setBannerDescription(e.target.value)}
                className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 pb-1 d-flex align-items-center">
              <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                Button Link
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Button Link..."
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3  d-flex align-items-center">
              <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                Upload Banner
              </Form.Label>
              <div
                className="w-75 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                style={{ height: "150px" }}
              >
                {mediaUrl && mediaUrl !== null ? (
                  <video
                    src={mediaUrl || null}
                    width={350}
                    height={150}
                    className="rounded-2 object-fit-cover"
                    autoPlay
                    loop
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={mediaUrl || null}
                    alt="selectedBanner"
                    width={350}
                    height={150}
                    className="rounded-2 object-fit-cover"
                  />
                )}
                <Form.Label
                  className="d-flex w-100 h-100 position-absolute flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  htmlFor="bannerImage"
                >
                  <BsCloudUpload size={40} color="white" />
                  <h6
                    className={`text-center text-white py-3 ${styles.smFont}`}
                  >
                    Upload Image / Icon
                  </h6>
                </Form.Label>
              </div>

              <Form.Control
                id="bannerImage"
                hidden
                type="file"
                onChange={handleMedia}
                placeholder="Social Link Icon"
                className="flex-grow-1 p-2"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEdit(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdateBanner}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBanner;
