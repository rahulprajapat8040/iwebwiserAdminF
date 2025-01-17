import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { getSteps } from "@/lib/redux/features/GetAllSteps";

const EditStep = ({ show, setShowEdit, selectedStep }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setStepTitle(selectedStep?.title || "");
        setDescription(selectedStep?.description || "");
        setStepImage(selectedStep?.image || "");
    }, [selectedStep]);


    const [StepTitle, setStepTitle] = useState(selectedStep?.title);
    const [description, setDescription] = useState(selectedStep?.description);
    const [stepImage, setStepImage] = useState(selectedStep?.image);

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
            setStepImage(res.data.url);
        } catch (error) {
            console.log(error);
        }
    };

    // update field
    const updateField = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${Apis.updateSetp}/${selectedStep?.id}`,
                {
                    title: StepTitle,
                    description: description,
                    image: stepImage,
                }
            );
            dispatch(getSteps());
            setShowEdit(false);
            setStepTitle("");
            setServiceId("");
            setStepImage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Field</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-5">
                <Form className="py-5">
                    <Form.Group className="mb-4 d-flex align-items-center">
                        <Form.Label className="w-25 m-0">
                            Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Field Title"
                            value={StepTitle}
                            onChange={(e) => setStepTitle(e.target.value)}
                            className="flex-grow-1 p-2 w-75"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter Step Description"
                            className="form-control form-control-lg form-input"
                            style={{ fontSize: "13px" }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
                        <div
                            className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                            style={{ height: "150px" }}
                        >
                            {stepImage && (
                                <div>
                                    <Image
                                        src={stepImage}
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
                                htmlFor="stepImage"
                            >
                                <BsCloudUpload size={40} color="white" />
                                <h6 className="text-center text-white py-3">
                                    Upload Image / Icon
                                </h6>
                            </Form.Label>
                        </div>
                        <Form.Control
                            id="stepImage"
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
                    <button
                        variant="secondary"
                        className="btn form-cancel"
                        onClick={() => setShowEdit(false)}
                    >
                        Close
                    </button>
                    <Button
                        type="button"
                        className="btn form-btn"
                        onClick={updateField}
                    >
                        Save
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditStep;
