"use client";
import {
    Container,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import DeleteClient from "@/components/Modals/DeleteClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditField from "@/components/Modals/EditField";
import { getSteps } from "@/lib/redux/features/GetAllSteps";
import EditStep from "@/components/Modals/EditStep";
import DeleteStep from "@/components/Modals/DeleteStep";

const StepsList = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { steps } = useSelector(
        (state) => state.getSteps
    );
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);

    // Fetch clients
    const fetchFields = useCallback(() => {
        dispatch(getSteps());
    }, [dispatch]);

    useEffect(() => {
        fetchFields();
    }, []);

    const handleEditClick = (step) => {
        setSelectedStep(step);
        setShowEdit(true);
    };

    const handleDeleteClick = (step) => {
        setSelectedStep(step);
        setShowDelete(true);
    };

    return (
        <>
            <EditStep
                show={showEdit}
                setShowEdit={setShowEdit}
                selectedStep={selectedStep}
            />
            <DeleteStep
                show={showDelete}
                setShowDelete={setShowDelete}
                selectedStep={selectedStep}
            />
            <div>
                <Container className="container-fluid">
                    {/* Header */}
                    <div className="dash-head">
                        <div className="dash_title">
                            <div onClick={() => router.back()} className=" d-inline-flex align-items-center gap-2">
                                <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                </div>
                                <h4 className={`main-title`}>Step List</h4>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Step List</h2>
                                <Link href="/admin/steps/add-steps" className="btn sub_btn">ADD</Link>
                            </div>
                        </div>

                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={11} className="text-center">
                                <Table>
                                    <thead>
                                        <tr className="border-bottom">
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {steps?.map((step, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td>
                                                    <Image
                                                        src={step.image}
                                                        alt={`step-${index}`}
                                                        width={80}
                                                        height={50}
                                                        className="rounded-2 object-fit-contain"
                                                    />
                                                </td>
                                                <td>{step.title}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#cff4fc",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleEditClick(step)}
                                                        >
                                                            <CiEdit color="green" size={12} />
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#f8d7da",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleDeleteClick(step)}
                                                        >
                                                            <RiDeleteBin6Line color="red" size={12} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default StepsList;
