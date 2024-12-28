"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Form,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/lib/redux/features/GetClients";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
import EditClient from "@/components/Modals/EditClient";
import DeleteClient from "@/components/Modals/DeleteClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Apis } from "@/utils/Apis";

const ClientList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { ourClients, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllClient
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch clients
  const fetchClients = useCallback(() => {
    dispatch(getAllClient({ page: currentPage, limit, search }));
  }, [dispatch, currentPage, limit, search]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setShowEdit(true);
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
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
          const response = await axios.get(Apis.searchClient, {
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
        fetchClients(); // Fetch all clients when search is empty
      }
    }, 500); // 500ms delay

    setSearchTimeout(timeoutId);
  };

  return (
    <>
      <EditClient
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedClient={selectedClient}
      />
      <DeleteClient
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedClient={selectedClient}
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
              <h4 className={`main-title`}>Client List</h4>
            </div>
          </div>
        </div>

        {/* Body */}
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Client List</h2>
                <Link href="/admin/client/add-client" className="btn sub_btn">ADD</Link>
              </div>
            </div>

            <div className="mb-3 pe-4 d-flex align-items-center justify-content-between">
              <Form.Select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className={`p-2 mx-2 ${styles.mdFont}`}
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
                placeholder="Search clients..."
                className={`p-2 mx-2 d-none d-md-block ${styles.mdFont}`}
                style={{ width: "200px" }}
              />
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
                    {isSearching ? (
                      <tr>
                        <td colSpan="3" className="text-center">Searching...</td>
                      </tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((client, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={client.image}
                              alt={`client-${index}`}
                              width={80}
                              height={50}
                              className="rounded-2 object-fit-contain"
                            />
                          </td>
                          <td>{client.title}</td>
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
                                onClick={() => handleEditClick(client)}
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
                                onClick={() => handleDeleteClick(client)}
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
                      ourClients?.map((client, index) => (
                        <tr key={index} className="border-bottom">
                          <td>
                            <Image
                              src={client.image}
                              alt={`client-${index}`}
                              width={80}
                              height={50}
                              className="rounded-2 object-fit-contain"
                            />
                          </td>
                          <td>{client.title}</td>
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
                                onClick={() => handleEditClick(client)}
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
                                onClick={() => handleDeleteClick(client)}
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
                    <p>{`showing ${limit} entries of clients`}</p>
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

export default ClientList;
