"use client";
import { Container, Row, Col, Table, Pagination, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import DeleteServiceDetail from "@/components/Modals/DeleteServiceDetail";
import { getAllIndustryDetail } from "@/lib/redux/features/GetAllIndustryDetails";
import DeleteIndustryDetail from "@/components/Modals/DeleteIndustryDetail";

const truncateText = (text, maxLength) => {
    if (!text) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    return plainText.length > maxLength ? `${plainText.substring(0, maxLength)}...` : plainText;
};

const ServiceDetailList = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    // Redux state
    const { industryDetail } = useSelector(
        (state) => state.getAllIndustryDetail
    );

    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [showDeleteServiceDetail, setShowDeleteServiceDetail] = useState(false);
    const [selectedIndustryDetail, setSelectedIndustryDetail] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Fetch Service Details
    const fetchServiceDetails = () => {
        dispatch(getAllIndustryDetail());
    };

    useEffect(() => {
        fetchServiceDetails();
    }, [dispatch]);

    const handleEditClick = (industryDetail) => {
        router.push(`/admin/industry/edit-industryDetail/${industryDetail.id}`);
    };


    const handleDeleteClick = (industryDetail) => {
        setSelectedIndustryDetail(industryDetail);
        setShowDeleteServiceDetail(true);
    };

    return (
        <>
            <DeleteIndustryDetail
                show={showDeleteServiceDetail}
                setShowDelete={setShowDeleteServiceDetail}
                selectedIndustryDetail={selectedIndustryDetail}
            />
            <div>
                <Container className="container-fluid">
                    {/* Header */}
                    <div className="dash-head">
                        <div className="dash_title">
                            <div onClick={() => router.back()} className="d-inline-flex align-items-center">
                                <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                </div>
                                <h4 className={`main-title btn`}>Service Details List</h4>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Service Details List</h2>
                                <Link href="/admin/industry/industry-detail" className="btn sub_btn">ADD</Link>
                            </div>
                        </div>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={11} className="text-center">
                                <Table responsive>
                                    <thead>
                                        <tr className="border-bottom">
                                            <th>Industry Name</th>
                                            <th>Title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {industryDetail?.map((industryDetail, index) => (
                                            // ... existing service detail rendering code ...
                                            // Add delete button to existing rows
                                            <tr key={index} className="border-bottom">
                                                <td>{truncateText(industryDetail?.industry?.title, 30)}</td>
                                                <td>{truncateText(industryDetail.hero_title, 40)}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        {/* Existing edit button */}
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#cff4fc",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleEditClick(industryDetail)}
                                                        >
                                                            <CiEdit color="green" size={12} />
                                                        </div>
                                                        {/* Add delete button */}
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#f8d7da",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleDeleteClick(industryDetail)}
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

export default ServiceDetailList;
