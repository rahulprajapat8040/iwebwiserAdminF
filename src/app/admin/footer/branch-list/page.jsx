"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import styles from "@/assets/css/base.module.css";
import { useRouter } from "next/navigation";
import EditBranch from "@/components/Modals/EditBranch";
import DeleteBranch from "@/components/Modals/DeleteBranch";
import { getAllBranch } from "@/lib/redux/features/GetAllBranch";
import Link from "next/link";
import { Apis } from "@/utils/Apis";

const BranchList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { branches, isLoading, error, pageInfo } = useSelector(
    (state) => state.getAllBranch
  );

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch branches
  const fetchBranches = useCallback(() => {
    dispatch(getAllBranch({ page: currentPage, limit, search }));
  }, [dispatch, currentPage, limit, search]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleEditClick = (branch) => {
    setSelectedBranch(branch);
    setShowEdit(true);
  };

  const handleDeleteClick = (branch) => {
    setSelectedBranch(branch);
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
          const response = await axios.get(Apis.searchBranch, {
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
        fetchBranches(); // Fetch all branches when search is empty
      }
    }, 500); // 500ms delay

    setSearchTimeout(timeoutId);
  };

  return (
    <>
      <EditBranch
        show={showEdit}
        setShowEdit={setShowEdit}
        selectedBranch={selectedBranch}
      />
      <DeleteBranch
        show={showDelete}
        setShowDelete={setShowDelete}
        selectedBranch={selectedBranch}
      />
      <div>
        {/* Header */}
        <Container className="container-fluid">
        <div className="dash-head">
          <div className="dash_title">
            <div onClick={() => router.back()} className=" d-inline-flex align-items-center ">
              <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </div>
              <h4 className={`main-title btn`}>Branches List</h4>
            </div>
          </div>
        </div>

        {/* Body */}
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Branches List</h2>
                <Link href="/admin/footer/add-branch" className="btn sub_btn">ADD</Link>
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
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search branches..."
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
                      <th>Title</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>State/Province</th>
                      <th>Zip-code</th>
                      <th>Country</th>
                      <th>Page select</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <tr>
                        <td colSpan="8" className="text-center">Searching...</td>
                      </tr>
                    ) : search.trim() && searchResults.length > 0 ? (
                      searchResults.map((branch, index) => (
                        <tr key={index} className="border-bottom " >
                          <td className="py-2">{branch.title}</td>
                          <td>{branch.address.length < 15 ? branch.address : branch.address.slice(0, 14) + "..."}</td>
                          <td>{branch.city}</td>
                          <td>{branch.state}</td>
                          <td>{branch.zip_code}</td>
                          <td>{branch.country}</td>
                          <td>{branch.pageId}</td>
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
                                onClick={() => handleEditClick(branch)}
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
                                onClick={() => handleDeleteClick(branch)}
                              >
                                <RiDeleteBin6Line color="red" size={12} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : search.trim() && searchResults.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">No results found</td>
                      </tr>
                    ) : (
                      branches.map((branch, index) => (
                        <tr key={index} className="border-bottom">
                          <td className="py-3">{branch.title}</td>
                          <td>{branch.address.length < 15 ? branch.address : branch.address.slice(0, 14) + "..."}</td>
                          <td>{branch.city}</td>
                          <td>{branch.state}</td>
                          <td>{branch.zip_code}</td>
                          <td>{branch.country}</td>
                          <td>{branch.pageId}</td>
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
                                onClick={() => handleEditClick(branch)}
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
                                onClick={() => handleDeleteClick(branch)}
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
                    <p>{`showing ${limit} entries of branches`}</p>
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

export default BranchList;
