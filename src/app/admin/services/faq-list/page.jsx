"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import { useRouter } from "next/navigation";
import EditFaq from "@/components/Modals/EditFaq";
import DeleteFaq from "@/components/Modals/DeleteFaq";
import Link from "next/link";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { getAllFaq } from "@/lib/redux/features/GetAllFaq";

// Update the truncateText function at the top to handle HTML content
const truncateText = (text, maxLength) => {
  if (!text) return '';
  // Create a temporary div to handle HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text;
  const plainText = tempDiv.textContent || tempDiv.innerText;
  return plainText.length > maxLength ? `${plainText.substring(0, maxLength)}...` : plainText;
};

const FaqList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { faqs, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllFaq
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch FAQs
  const fetchFaqs = () => {
    dispatch(getAllFaq({ page: currentPage, limit, search }));
  };

  useEffect(() => {
    fetchFaqs();
  }, [currentPage, limit, search]);

  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setShowEdit(true);
  };

  const handleDeleteClick = (faq) => {
    setSelectedFaq(faq);
    setShowDelete(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modified search handler with debouncing
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const response = await axios.get(Apis.searchServiceFaq, {
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
        fetchFaqs(); // Fetch all FAQs when search is empty
      }
    }, 500); // 500ms delay

    setSearchTimeout(timeoutId);
  };

  return (
    <>
      <EditFaq
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedFaq={selectedFaq}
      />
      <DeleteFaq
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedFaq={selectedFaq}
      />
      <div>
        <Container className="container-fluid">
          {/* Header */}
          <div className="dash-head">
            <div className="dash_title">
              <div onClick={() => router.back()} className=" d-inline-flex align-items-center ">
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
                <h4 className={`main-title btn`}>FAQs List</h4>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>FAQs List</h2>
                <Link href="/admin/services/add-service-faq" className="btn sub_btn">ADD</Link>
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
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search FAQs..."
                  className={`p-2  d-none d-md-block ${styles.mdFont}`}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={11} className="text-center">
                <Table responsive>
                  <thead>
                    <tr className="border-bottom">
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr>
                        <td colSpan="3" className="text-center">Searching...</td>
                      </tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((faq, index) => (
                        <tr key={index} className="border-bottom">
                          <td title={faq.question}>{truncateText(faq.question, 50)}</td>
                          <td title={faq.answer} className="text-center">{truncateText(faq.answer, 40)}</td>
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
                                onClick={() => handleEditClick(faq)}
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
                                onClick={() => handleDeleteClick(faq)}
                              >
                                <RiDeleteBin6Line color="red" size={12} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : search.trim() && searchResults.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">No results found</td>
                      </tr>
                    ) : (
                      faqs?.map((faq, index) => (
                        <tr key={index} className="border-bottom">
                          <td title={faq.question}>{truncateText(faq.question, 50)}</td>
                          <td title={faq.answer} className="text-center">{truncateText(faq.answer, 40)}</td>
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
                                onClick={() => handleEditClick(faq)}
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
                                onClick={() => handleDeleteClick(faq)}
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
                {pageInfo && pageInfo?.totalPages >= 1 && (
                  <div className="card-footer">
                    <p>{`showing ${limit} entries of FAQs`}</p>
                    <Pagination className="pagination-div">
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

export default FaqList;
