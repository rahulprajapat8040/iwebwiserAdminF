"use client";
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Button,
    Form,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditFeedback from "@/components/Modals/EditFeedback";
import DeleteTechnologies from "@/components/Modals/DeleteTechnologies";
import { getAllFeedback } from "@/lib/redux/features/GetAllFeddBack";
import Link from "next/link";
import axios from "axios"; // For API calls
import { Apis } from "@/utils/Apis"; // Assuming you have API URLs here

const FeedbackList = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    // Redux state
    const { feedbacks, isLoading, error, pageInfo } = useSelector(
        (state) => state.getAllFeedback
    );

    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedFeddback, setSelectedFeddback] = useState(null);
    const [searchResults, setSearchResults] = useState([]); // For filtered feedbacks
    const [isSearching, setIsSearching] = useState(false); // Show "Searching..." message
    const [searchTimeout, setSearchTimeout] = useState(null); // To store debounce timeout

    // Fetch feedbacks based on current search term or page limit
    const fetchFeedbacks = useCallback(() => {
        if (search.trim()) {
            // Fetch filtered feedbacks based on search term
            axios
                .get(Apis.searchFeedback, { params: { query: search } })
                .then((response) => {
                    setSearchResults(response.data.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching feedbacks:", error);
                    setSearchResults([]);
                })
                .finally(() => setIsSearching(false));
        } else {
            // If no search, fetch all feedbacks
            dispatch(getAllFeedback({ page: currentPage, limit }));
        }
    }, [dispatch, currentPage, limit, search]);



    useEffect(() => {
        fetchFeedbacks();
    }, [currentPage, limit, search, fetchFeedbacks]);

    const handleEditClick = (feedback) => {
        setSelectedFeddback(feedback);
        setShowEdit(true);
    };

    const handleDeleteClick = (feedback) => {
        setSelectedFeddback(feedback);
        setShowDelete(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Debounced search handler
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        setIsSearching(true);

        // Clear previous timeout if any
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set a new timeout for debounce
        const timeoutId = setTimeout(() => {
            fetchFeedbacks(); // Fetch feedbacks after a delay
        }, 500); // Delay of 500ms
        setSearchTimeout(timeoutId);
    };

    return (
        <>
            <EditFeedback
                show={showEdit}
                setShowEdit={setShowEdit}
                selectedFeddback={selectedFeddback}
            />
            <DeleteTechnologies
                show={showDelete}
                setShowDelete={setShowDelete}
                selectedFeddback={selectedFeddback}
            />
            <div className="container-fluid">
                <Container className="container-fluid">
                    {/* Header */}
                    <div className="dash-head ">
                        <div className="dash_title">
                            <div
                                onClick={() => router.back()}
                                className="btn d-inline-flex align-items-center gap-2"
                            >
                                <div
                                    className="d-inline-block bg-primary p-1 px-2 rounded-3"
                                    style={{ cursor: "pointer" }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height={25}
                                        viewBox="0 -968 960 960"
                                        width={25}
                                        fill="#FFFFFF"
                                    >
                                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                                    </svg>
                                </div>
                                <h4 >Feedback List</h4>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Feedback List</h2>
                                <Link href="/admin/feedback/add-feedback" className="btn sub_btn">
                                    ADD
                                </Link>
                            </div>

                            <div className="my-3 d-flex align-items-center justify-content-between">
                                <Form.Select
                                    value={limit}
                                    onChange={(e) => setLimit(parseInt(e.target.value))}
                                    className={`p-2 ${styles.mdFont}`}
                                    style={{ width: "100px" }}
                                >
                                    <option value="10">Show 10</option>
                                    <option value="20">Show 20</option>
                                    <option value="50">Show 50</option>
                                </Form.Select>
                                <Form.Control
                                    type="search"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search Feedback"
                                    className={`p-2  d-md-block d-none ${styles.mdFont}`}
                                    style={{ width: "200px" }}
                                />
                            </div>
                        </div>

                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={11} className="text-center">
                                <Table responsive>
                                    <thead>
                                        <tr className="border-bottom">
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isSearching ? (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    Searching...
                                                </td>
                                            </tr>
                                        ) : search.trim() && searchResults.length > 0 ? (
                                            searchResults.map((feedback, index) => (
                                                <tr key={index} className="border-bottom">
                                                    <td>
                                                        {feedback.image ? (
                                                            <video
                                                                src={feedback.image}
                                                                width={80}
                                                                height={50}
                                                                className="rounded-2 object-fit-cover"
                                                                autoPlay
                                                            >
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        ) : (
                                                            <Image
                                                                src="/placeholder.jpg"
                                                                alt="feedback"
                                                                width={80}
                                                                height={50}
                                                                className="rounded-2 object-fit-cover"
                                                            />
                                                        ) }
                                                    </td>
                                                    <td>{feedback.title}</td>
                                                    <td>{feedback.description?.substring(0, 20)}...</td>
                                                    <td>
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <div
                                                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    background: "#cff4fc",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => handleEditClick(feedback)}
                                                            >
                                                                <CiEdit color="green" size={12} />
                                                            </div>
                                                            <div
                                                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    background: "#f8d7da",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => handleDeleteClick(feedback)}
                                                            >
                                                                <RiDeleteBin6Line color="red" size={12} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : search.trim() && searchResults.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">No results found</td>
                                            </tr>
                                        ) : (
                                            feedbacks?.feedbacks?.map((feedback, index) => (
                                                <tr key={index} className="border-bottom">
                                                    <td>
                                                        {feedback.image ? (
                                                            <video
                                                                src={feedback.image}
                                                                width={80}
                                                                height={50}
                                                                className="rounded-2 object-fit-cover"
                                                                autoPlay
                                                            >
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        ) : (
                                                            <Image
                                                                src="/placeholder.jpg"
                                                                alt="feedback"
                                                                width={80}
                                                                height={50}
                                                                className="rounded-2 object-fit-cover"
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{feedback.title}</td>
                                                    <td>{feedback.description?.substring(0, 20)}...</td>
                                                    <td>
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <div
                                                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    background: "#cff4fc",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => handleEditClick(feedback)}
                                                            >
                                                                <CiEdit color="green" size={12} />
                                                            </div>
                                                            <div
                                                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    background: "#f8d7da",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => handleDeleteClick(feedback)}
                                                            >
                                                                <RiDeleteBin6Line color="red" size={12} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                </Table>

                                {/* Pagination */}
                                {feedbacks?.pageInfo && feedbacks?.pageInfo?.totalPages >= 1 && (
                                    <div className="card-footer">
                                        <p>
                                            Showing {limit} entries of feedbacks
                                        </p>
                                        <Pagination className="pagination-div">
                                            <Pagination.Prev
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            />
                                            {Array.from({ length: feedbacks.pageInfo?.totalPages }).map(
                                                (_, index) => (
                                                    <Pagination.Item
                                                        key={index + 1}
                                                        onClick={() => handlePageChange(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </Pagination.Item>
                                                )
                                            )}
                                            <Pagination.Next
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === feedbacks.pageInfo?.totalPages}
                                            />
                                        </Pagination>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default FeedbackList;
