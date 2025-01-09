import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubService } from "@/lib/redux/features/GetAllSubServices";
import { getAllServicesFull } from "@/lib/redux/features/GetAllServices";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";

const EditSubService = ({ show, setShowEdit, selectedService }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.getAllServicesFull.services);

  useEffect(() => {
    dispatch(getAllServicesFull({}));
    setSubServiceTitle(selectedService?.title || "");
    setDescription(selectedService?.description || "");
    setServiceId(selectedService?.service?.id || "");
    setServiceImage(selectedService?.image || "");
  }, [selectedService, dispatch]);

  const [subServiceTitle, setSubServiceTitle] = useState(selectedService?.title);
  const [description, setDescription] = useState(selectedService?.description);
  const [serviceId, setServiceId] = useState(selectedService?.service?.id);
  const [serviceImage, setServiceImage] = useState(selectedService?.image);

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
      setServiceImage(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // update service
  const updateService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${Apis.updateSubService}/${selectedService?.id}`,
        {
          service_id: serviceId,
          title: subServiceTitle,
          description: description,
          image: serviceImage,
        }
      );
      dispatch(getAllSubService({ page: 1, limit: 10, showAll: false }));
      setShowEdit(false);
      setSubServiceTitle("");
      setDescription("");
      setServiceId("");
      setServiceImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Sub-Service</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-5">
        <Form className="py-5">
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="w-25 m-0">
              Sub Service Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Sub Service Title"
              value={subServiceTitle}
              onChange={(e) => setSubServiceTitle(e.target.value)}
              className="flex-grow-1 p-2 w-75"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Description
            </Form.Label>
            <Editor
              apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
              value={description}
              init={{
                height: 250,
                menubar: false,
                plugins: [
                  'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                  'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                  'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                ],
                toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
              }}
              onEditorChange={(content) => setDescription(content)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Service
            </Form.Label>
            <Form.Control
              as="select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
            >
              <option value="" disabled>Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
            <div
              className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
              style={{ height: "150px" }}
            >
              {serviceImage && (
                <div>
                  <Image
                    src={serviceImage}
                    alt="service"
                    width={460}
                    height={153}
                    className="object-fit-contain"
                  />
                </div>
              )}
              <Form.Label
                className="d-flex w-100 h-100 position-absolute flex-column align-items-center justify-content-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                htmlFor="serviceImage"
              >
                <BsCloudUpload size={40} color="white" />
                <h6 className="text-center text-white py-3">
                  Upload Image / Icon
                </h6>
              </Form.Label>
            </div>
            <Form.Control
              id="serviceImage"
              hidden
              type="file"
              onChange={handleMedia}
              placeholder="Service Image"
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
            className="btn bg-primary"
            onClick={updateService}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditSubService;
