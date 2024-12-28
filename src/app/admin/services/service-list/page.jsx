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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditServices from "@/components/Modals/EditServices";
import DeleteServices from "@/components/Modals/DeleteServices";
import { getAllServices } from "@/lib/redux/features/GetAllServices";
import Link from "next/link";
import axios from "axios";
import { Apis } from "@/utils/Apis";

// Add this utility function at the top of your file
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ServiceList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { services, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllServices
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Add these helper functions
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const sliceHtmlContent = (htmlString, maxLength = 100) => {
    // Remove HTML tags for length calculation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const textContent = tempDiv.textContent || tempDiv.innerText;

    if (textContent.length <= maxLength) return htmlString;

    // Slice the text content
    const slicedText = textContent.slice(0, maxLength) + '...';

    // Return the sliced text with an ellipsis
    return `<div>${slicedText}...</div>`;
  };

  // Fetch services
  const fetchServices = () => {
    dispatch(getAllServices({ page: currentPage, limit, search }));
  };

  // Optimize useEffect to avoid unnecessary re-renders
  useEffect(() => {
    fetchServices();
  }, [currentPage, limit, search]);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setShowEdit(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
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
          const response = await axios.get(Apis.searchService, {
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
        fetchServices(); // Fetch all services when search is empty
      }
    }, 500); // 500ms delay

    setSearchTimeout(timeoutId);
  };

  return (
    <>
      <EditServices
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedService={selectedService}
      />
      <DeleteServices
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedService={selectedService}
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
                <h4 className={`main-title btn`}>Services List</h4>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Services List</h2>
                <Link href="/admin/services/add-service" className="btn sub_btn">ADD</Link>
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
                  placeholder="Search services..."
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
                      <th>Image</th>
                      <th>Title</th>
                      <th>Short description</th>
                      <th>Long description</th>
                      <th>Button Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr>
                        <td colSpan="6" className="text-center">Searching...</td>
                      </tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((service, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={service.image}
                              alt={`service-${index}`}
                              width={80}
                              height={50}
                              className="rounded-2 object-fit-cover"
                            />
                          </td>
                          <td>{service.title}</td>
                          <td className="text-center">
                            <div
                              className="description-cell"
                              title={service.short_description} // Shows full text on hover
                              dangerouslySetInnerHTML={{
                                __html: sliceHtmlContent(service.short_description, 50),
                              }}
                            />
                          </td>
                          <td className="text-center">
                            <div
                              className="description-cell"
                              title={service.long_description} // Shows full text on hover
                              dangerouslySetInnerHTML={{
                                __html: sliceHtmlContent(service.long_description, 50),
                              }}
                            />
                          </td>
                          <td>{service.button_link}</td>
                          <td>{service.sub_title}</td>
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
                                onClick={() => handleEditClick(service)}
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
                                onClick={() => handleDeleteClick(service)}
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
                      services?.map((service, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={service.image}
                              alt={`service-${index}`}
                              width={80}
                              height={50}
                              className="rounded-2 object-fit-cover"
                            />
                          </td>
                          <td>{service.title}</td>
                          <td className="text-center">
                            <div
                              className="description-cell"
                              title={service.short_description} // Shows full text on hover

                            >
                              {truncateText(service.short_description, 50)}
                            </div>
                          </td>
                          <td
                            className="text-center"
                            title={service.long_description}

                          >
                            {truncateText(service.long_description, 50)}
                          </td>
                          <td>{service.button_link}</td>
                          <td className="text-end">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle border-0"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  background: "#cff4fc",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleEditClick(service)}
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
                                onClick={() => handleDeleteClick(service)}
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
                    <p>{`showing ${limit} entries of services`}</p>
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

export default ServiceList;
