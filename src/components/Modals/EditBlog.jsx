import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAllBlog } from "@/lib/redux/features/GetAllBlogs";

const EditBlog = ({ show, setShowEdit, selectedBlog }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setBlogTitile(selectedBlog?.title || "");
    setBlogDescription(selectedBlog?.description || "");
    setBlogLink(selectedBlog?.blog_link || "");
    setMediaUrl(selectedBlog?.image || "");
  }, [selectedBlog]);

  const [blogTitle, setBlogTitile] = useState(selectedBlog?.title);
  const [blogDescription, setBlogDescription] = useState(selectedBlog?.description);
  const [blogLink, setBlogLink] = useState(selectedBlog?.blog_link);
  const [mediaUrl, setMediaUrl] = useState(selectedBlog?.image);

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
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE BLOG UPDATE
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Apis.updateBlog}/${selectedBlog?.id}`, {
        title: blogTitle,
        description: blogDescription,
        blog_link: blogLink,
        image: mediaUrl,
      });
      dispatch(getAllBlog({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Blog Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Blog Title"
              value={blogTitle}
              onChange={(e) => setBlogTitile(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4  d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Blog Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Blog Description"
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Blog Link
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Blog Link"
              value={blogLink}
              onChange={(e) => setBlogLink(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border  position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "153px" }}
            >
              {mediaUrl && (
                <div>
                  <Image
                    src={mediaUrl}
                    alt="blog"
                    width={460}
                    height={153}
                    className="object-fit-cover"
                  />
                </div>
              )}
              <Form.Label
                className="d-flex w-100 top-0 h-100 position-absolute flex-column align-items-center justify-content-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                htmlFor="blogImage"
              >
                <BsCloudUpload size={40} color="white" />
                <h6 className={`text-center text-white py-3 ${styles.smFont}`}>
                  Upload Image / Icon
                </h6>
              </Form.Label>
            </div>

            <Form.Control
              id="blogImage"
              hidden
              type="file"
              onChange={handleMedia}
              placeholder="Blog Image"
              className="flex-grow-1 p-2"
              required
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEdit(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            className={`btn bg-primary `}
            onClick={handleUpdateBlog}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBlog;
