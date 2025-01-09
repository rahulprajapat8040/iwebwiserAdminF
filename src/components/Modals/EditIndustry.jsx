import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllIndustry } from "@/lib/redux/features/GetAllIndustry";
import { Editor } from "@tinymce/tinymce-react";

const EditIndustry = ({ show, setShowEdit, selectedIndustry }) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTitle(selectedIndustry?.title || "");
    setdescription(selectedIndustry?.description || "");
    setButtonLink(selectedIndustry?.button_link || "");
    setIndustryImage(selectedIndustry?.image || "");
  }, [selectedIndustry]);

  const [title, setTitle] = useState(selectedIndustry?.title);
  const [description, setdescription] = useState(selectedIndustry?.description);
  const [buttonLink, setButtonLink] = useState(selectedIndustry?.button_link);
  const [industryImage, setIndustryImage] = useState(selectedIndustry?.image);

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
      setIndustryImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // update client
  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Apis.updateIndustry}/${selectedIndustry?.id}`,
        {
          title: title,
          image: industryImage,
          description: description,
          button_link: buttonLink,
        }
      );
      dispatch(getAllIndustry({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
      // Clear all fields
      setTitle("");
      setIndustryImage("");
      setdescription("");
      setButtonLink("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Industry</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Industry Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Industry Description
            </Form.Label>
            <div className="w-75">
              {isClient && (
                <Editor
                  apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                  value={description}
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                      'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                      'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                      'alignleft aligncenter alignright alignjustify | ' +
                      'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
                  }}
                  onEditorChange={(content) => setdescription(content)}
                />
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
              Button Link
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Service Title"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "150px" }}
            >
              {industryImage && (
                <div>
                  <Image
                    src={industryImage}
                    alt="banner"
                    width={460}
                    height={153}
                  />
                </div>
              )}
              <Form.Label
                className="d-flex w-100 h-100 position-absolute flex-column align-items-center justify-content-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                htmlFor="cleintImage"
              >
                <BsCloudUpload size={40} color="white" />
                <h6 className={`text-center text-white py-3 ${styles.smFont}`}>
                  Upload Image / Icon
                </h6>
              </Form.Label>
            </div>

            <Form.Control
              id="cleintImage"
              hidden
              type="file"
              onChange={handleMedia}
              placeholder="Social Link Icon"
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
            onClick={updateClient}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditIndustry;
