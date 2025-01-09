import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { getAllFields } from "@/lib/redux/features/GetAllFields";

const EditField = ({ show, setShowEdit, slectedField }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFields({}));
        setFieldTitle(slectedField?.title || "");
        setShortDescription(slectedField?.short_description || "");
        setDescription(slectedField?.description || "");
        setButtonText(slectedField?.buttonText || "");
        setButtonLink(slectedField?.buttonLink || "");
        setFieldImage(slectedField?.image || "");
    }, [slectedField, dispatch]);


    const [slug, setSlug] = useState(slectedField?.slug);
    const [fieldTitle, setFieldTitle] = useState(slectedField?.title);
    const [buttonText, setButtonText] = useState(slectedField?.buttonText);
    const [buttonLink, setButtonLink] = useState(slectedField?.buttonLink);
    const [shortDescription, setShortDescription] = useState(slectedField?.short_description);
    const [description, setDescription] = useState(slectedField?.description);
    const [fieldImage, setFieldImage] = useState(slectedField?.image);

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
            setFieldImage(res.data.url);
        } catch (error) {
            console.log(error);
        }
    };

    // update field
    const updateField = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${Apis.updateField}/${slectedField?.id}`,
                {
                    slug: slug,
                    title: fieldTitle,
                    short_description: shortDescription,
                    description: description,
                    buttonText: buttonText,
                    buttonLink: buttonLink,
                    image: fieldImage,
                }
            );
            dispatch(getAllFields());
            setShowEdit(false);
            setFieldTitle("");
            setShortDescription("");
            setServiceId("");
            setFieldImage("");
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
                            Slug
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Field Title"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="flex-grow-1 p-2 w-75"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4 d-flex align-items-center">
                        <Form.Label className="w-25 m-0">
                            Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Field Title"
                            value={fieldTitle}
                            onChange={(e) => setFieldTitle(e.target.value)}
                            className="flex-grow-1 p-2 w-75"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Short Description
                        </Form.Label>
                        <Editor
                            apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                            value={shortDescription}
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
                            onEditorChange={(content) => setShortDescription(content)}
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
                    <Form.Group className="mb-4 d-flex align-items-center">
                        <Form.Label className="w-25 m-0">
                            Button Text
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Button Text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            className="flex-grow-1 p-2 w-75"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4 d-flex align-items-center">
                        <Form.Label className="w-25 m-0">
                            Button Link
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Button Link"
                            value={buttonLink}
                            onChange={(e) => setButtonLink(e.target.value)}
                            className="flex-grow-1 p-2 w-75"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4 pb-1 d-flex align-items-center justify-content-center">
                        <div
                            className="w-100 border position-relative d-flex flex-column align-items-center bg-prim justify-content-center"
                            style={{ height: "150px" }}
                        >
                            {fieldImage && (
                                <div>
                                    <Image
                                        src={fieldImage}
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
                                htmlFor="fieldImage"
                            >
                                <BsCloudUpload size={40} color="white" />
                                <h6 className="text-center text-white py-3">
                                    Upload Image / Icon
                                </h6>
                            </Form.Label>
                        </div>
                        <Form.Control
                            id="fieldImage"
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

export default EditField;
