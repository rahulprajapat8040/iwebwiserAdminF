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
import EditTechnologies from "@/components/Modals/EditTechnologies";
import DeleteTechnologies from "@/components/Modals/DeleteTechnologies";
import { getAllCaseStudy } from "@/lib/redux/features/GetAllCaseStudy";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa6";
import DeleteCaseStudy from "@/components/Modals/DeleteCaseStudy";
const CaseStudyList = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    // Redux state
    const { caseStudyData, isLoading, error, pageInfo } = useSelector(
        (state) => state.getAllCaseStudy
    );


    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);

    // Fetch caseStudyData
    const fetchTechnologies = useCallback(() => {
        dispatch(getAllCaseStudy({ page: currentPage, limit, search }));
    }, [dispatch, currentPage, limit, search]);


    useEffect(() => {
        fetchTechnologies();
    }, [currentPage, limit, search, fetchTechnologies]);


    const handleDeleteClick = (caseStudyData) => {
        setSelectedCase(caseStudyData);
        setShowDelete(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <>
            <DeleteCaseStudy
                show={showDelete}
                setShowDelete={setShowDelete}
                selectedCase={selectedCase}
            />
            <div>
                {/* Header */}
                <Container className="container-fluid">
                    <div className="dash-head">
                        <div className="dash_title">
                            <div onClick={() => router.back()} className="  d-inline-flex align-items-center ">

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
                                <h4 className={`main-title btn`}>Case Study List</h4>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card">
                        <div className="card-header">
                            <div
                                className="card-title d-flex justify-content-between align-items-center"
                            >
                                <h2>Case Study List</h2>
                                <Link href="/admin/case-study/add-case-study" className="btn sub_btn">ADD</Link>
                            </div>
                            <div className="my-3  d-flex align-items-center justify-content-between">
                                <Form.Select
                                    value={limit}
                                    onChange={(e) => setLimit(parseInt(e.target.value))}
                                    className={`p-2  ${styles.mdFont}`}
                                    style={{ width: "100px" }}
                                >
                                    <option value="10">Show 10</option>
                                    <option value="20">Show 20</option>
                                    <option value="50">Show 50</option>
                                </Form.Select>
                                <Form.Control
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search"
                                    className={`p-2 d-none d-md-block ${styles.mdFont}`}
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
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseStudyData?.map((item, index) => (

                                            <tr key={index} className="border-bottom">
                                                <td>
                                                    {/* Uncomment this block if you want to include an image */}
                                                    <Image
                                                        src={item.addCaseStudy?.image}
                                                        alt={`icon-${index}`}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-2 object-fit-contain"
                                                    />
                                                </td>
                                                <td>{item.addCaseStudy?.productName}</td>
                                                <td>{item.addCaseStudy?.short_description.slice(0, 20) + "..."}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        <div
                                                            className="d-flex bg-primary-subtle align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                            }}
                                                        >
                                                            <Link href={{ pathname: `/admin/case-study/view`, query: { id: item.id } }}>  <FaRegEye color="blue" size={12} /></Link>
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#cff4fc",
                                                            }}
                                                        >
                                                            <Link href={{ pathname: `/admin/case-study/${item.id}` }}>  <CiEdit color="green" size={12} /></Link>
                                                        </div>
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "25px",
                                                                height: "25px",
                                                                background: "#f8d7da",
                                                            }}
                                                            onClick={() => handleDeleteClick(item)}
                                                        >
                                                            <RiDeleteBin6Line color="red" size={12} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                {/* Pagination */}
                                {pageInfo && pageInfo?.totalPages >= 1 && (
                                    <div className="card-footer">
                                        <p>{`showing ${limit} enteris of case study`}</p>
                                        <Pagination className="pagination-div ">
                                            <Pagination.Prev
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            />
                                            {Array.from({ length: pageInfo?.totalPages }).map((_, index) => (
                                                <Pagination.Item
                                                    key={index + 1}
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </Pagination.Item>
                                            ))}
                                            <Pagination.Next
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === pageInfo?.totalPages}
                                            />
                                        </Pagination>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
        </>
    );
};

export default CaseStudyList;
