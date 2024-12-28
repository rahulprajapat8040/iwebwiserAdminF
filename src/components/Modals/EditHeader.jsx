import { Modal, Form, Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import styles from "@/assets/css/base.module.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch } from "react-redux";
import { getAllHeader } from "@/lib/redux/features/GetAllHeader";
const EditHeader = ({ show, setShowEdit, selectedHeader }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setHeaderTitle(selectedHeader?.title || "");
        setheaderLink(selectedHeader?.link || "");
    }, [selectedHeader]);

    const [headerTitle, setHeaderTitle] = useState(selectedHeader?.title);
    const [headerLink, setheaderLink] = useState(selectedHeader?.link);


    // update client
    const updateHeader = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${Apis.updateHeader}/${selectedHeader?.id}`,
                {
                    title: headerTitle,
                    link: headerLink
                }
            );
            dispatch(getAllHeader());
            // Clear the input fields and increment the index for the next branch
            setShowEdit(false);
            setClientName("");
            setClientImageUrl("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal size="md" centered show={show} onHide={() => setShowEdit(!show)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Header</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-5">
                <Form className="py-5">
                    <Form.Group className="mb-4 pb-5 d-flex align-items-center">
                        <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                            Header Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Client Name"
                            value={headerTitle}
                            onChange={(e) => setHeaderTitle(e.target.value)}
                            className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4 pb-5 d-flex align-items-center">
                        <Form.Label className={`w-25 m-0 ${styles.mdFont}`}>
                            Header Link
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Client Name"
                            value={headerLink}
                            onChange={(e) => setheaderLink(e.target.value)}
                            className={`flex-grow-1 p-2 w-75 ${styles.mdFont}`}
                            required
                        />
                    </Form.Group>
                </Form>
                <div className="d-flex justify-content-center gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        className="btn form-cancel"
                        onClick={() => setShowEdit(false)}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        className={`btn form-btn `}
                        onClick={updateHeader}
                    >
                        Save
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditHeader;
