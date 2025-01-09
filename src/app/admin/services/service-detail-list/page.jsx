"use client";
import { Container, Row, Col, Table, Pagination, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllServiceDetail } from "@/lib/redux/features/GetAllServiceDetail";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import DeleteServiceDetail from "@/components/Modals/DeleteServiceDetail";

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
  const { serviceDetails, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllServiceDetail
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showDeleteServiceDetail, setShowDeleteServiceDetail] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch Service Details
  const fetchServiceDetails = () => {
    dispatch(getAllServiceDetail({ page: currentPage, limit, search }));
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [currentPage, limit, search]);

  const handleEditClick = (serviceDetail) => {
    router.push(`/admin/services/edit-serviceDetail/${serviceDetail.id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const response = await axios.get(Apis.searchServiceDetail, {
            params: { query: searchTerm }
          });
          setSearchResults(response.data.data || []);
        }
        catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        fetchServiceDetails();
      }
    }, 500);

    setSearchTimeout(timeoutId);
  };

  const handleDeleteClick = (serviceDetail) => {
    setSelectedServiceDetail(serviceDetail);
    setShowDeleteServiceDetail(true);
  };

  return (
    <>
      <DeleteServiceDetail
        show={showDeleteServiceDetail}
        setShowDelete={setShowDeleteServiceDetail}
        selectedServiceDetail={selectedServiceDetail}
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
                <Link href="/admin/services/service-details" className="btn sub_btn">ADD</Link>
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
                  placeholder="Search Services..."
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
                      <th>Service Name</th>
                      <th>Title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr><td colSpan="4" className="text-center">Searching...</td></tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((serviceDetail, index) => (
                        // Render search results
                        <tr key={index} className="border-bottom">
                          <td>{truncateText(serviceDetail?.service?.title, 30)}</td>
                          <td>{truncateText(serviceDetail.hero_title, 40)}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              {/* Edit button */}
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  background: "#cff4fc",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleEditClick(serviceDetail)}
                              >
                                <CiEdit color="green" size={12} />
                              </div>
                              {/* Delete button */}
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  background: "#f8d7da",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleDeleteClick(serviceDetail)}
                              >
                                <RiDeleteBin6Line color="red" size={12} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : search.trim() && searchResults.length === 0 ? (
                      <tr><td colSpan="4" className="text-center">No results found</td></tr>
                    ) : (
                      // Regular data display
                      serviceDetails?.map((serviceDetail, index) => (
                        // ... existing service detail rendering code ...
                        // Add delete button to existing rows
                        <tr key={index} className="border-bottom">
                          <td>{truncateText(serviceDetail?.service?.title, 30)}</td>
                          <td>{truncateText(serviceDetail.hero_title, 40)}</td>
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
                                onClick={() => handleEditClick(serviceDetail)}
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
                                onClick={() => handleDeleteClick(serviceDetail)}
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
                {pageInfo && pageInfo?.totalPages > 1 && (
                  <div className="card-footer">
                    <p>{`showing ${limit} entries of Services`}</p>
                    <Pagination className="pagination-div">
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {Array.from({ length: pageInfo?.totalPages }).map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={currentPage === index + 1}
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

export default ServiceDetailList;
