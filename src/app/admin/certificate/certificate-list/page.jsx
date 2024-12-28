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
import EditCertificate from "@/components/Modals/EditCertificate";
import DeleteCertificate from "@/components/Modals/DeleteCertificate";
import { getAllCertificates } from "@/lib/redux/features/GetAllCertificates";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa6";

const CertificateList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { certificates, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllCertificates
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Fetch certificates
  const fetchCertificates = useCallback(() => {
    dispatch(getAllCertificates({ page: currentPage, limit, search }));
  }, [dispatch, currentPage, limit, search]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const handleEditClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowEdit(true);
  };

  const handleDeleteClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDelete(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <EditCertificate
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedCertificate={selectedCertificate}
      />
      <DeleteCertificate
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedCertificate={selectedCertificate}
      />
      <div>
        <Container className="container-fluid">
          {/* Header */}
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
                <h4 className={`main-title btn`}>Certificate List</h4>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card">
            <div className="card-header">
              <div
                className="card-title d-flex justify-content-between align-items-center"
              >
                <h2>Certificate List</h2>
                <Link href="/admin/certificate/add-certificate" className="btn sub_btn">ADD</Link>
              </div>
              <div className="my-3 d-flex align-items-center justify-content-between">
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
                  className={`p-2  ${styles.mdFont}`}
                  style={{ width: "200px" }}
                />
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
                    {certificates?.map((item, index) => (
                      <tr key={index} className="border-bottom">
                        <td>
                          <Image
                            src={item.image}
                            alt={`icon-${index}`}
                            width={50}
                            height={50}
                            className="rounded-2 object-fit-contain"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle border-0"
                              style={{
                                width: "25px",
                                height: "25px",
                                background: "#cff4fc",
                              }}
                              onClick={() => handleEditClick(item)}
                            >
                              <CiEdit color="green" size={12} />
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
                    <p>{`showing ${limit} entries of certificates`}</p>
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
      </div>
    </>
  );
};

export default CertificateList;
