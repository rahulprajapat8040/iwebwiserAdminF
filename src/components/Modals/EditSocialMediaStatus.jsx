import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { useDispatch } from "react-redux";
import { getAllSocialMedia } from "@/lib/redux/features/GetAllSocialMedia";
const EditSocialMediaStatus = ({ show, setShowstatus, selectedSoicalMedia }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setSocialMediaStatus(selectedSoicalMedia?.active || "");
    }, [selectedSoicalMedia]);

    const [socialMediaStatus, setSocialMediaStatus] = useState(selectedSoicalMedia?.title);

    // update client
    const updateStatus = async () => {
        try {
            const response = await axios.put(
                `${Apis.updateSocialMedia}`,
                {
                    id: selectedSoicalMedia?.id,
                    active: !socialMediaStatus
                }
            );
            dispatch(getAllSocialMedia({ page: 1, limit: 10, showAll: false }));
            // Clear the input fields and increment the index for the next branch
            setShowstatus(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal size="md" centered show={show} onHide={() => setShowstatus(!show)}>
            <Modal.Header className="border-0" closeButton>
            </Modal.Header>
            <Modal.Body className="pt-4 pb-5">
                <div className="d-flex flex-column align-items-center justify-content-center gap-1">
                    <Modal.Title className="text-capitalize">{socialMediaStatus === true ? 'hide' : 'show'} Media</Modal.Title>
                    <h6 className="text-center  pb-4 text-black">
                        Are you sure you want to {socialMediaStatus === true ? 'hide' : 'show'} this Social Media?
                    </h6>
                </div>
                <div className="d-flex justify-content-center gap-2">
                    <Button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowstatus(false)}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        className={`btn bg-primary `}
                        onClick={updateStatus}
                    >
                        {socialMediaStatus === true ? 'Hide' : 'Show'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditSocialMediaStatus;
