"use client";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Form,
} from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/assets/css/base.module.css";
import Image from "next/image";
import Link from "next/link";
import { getAllBlog } from "@/lib/redux/features/GetAllBlogs";
import ViewBlog from "@/components/Modals/ViewBlog";
import EditBlog from "@/components/Modals/EditBlog";
import DeleteBlog from "@/components/Modals/DeleteBlog";

const BlogList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { blogs, isLoading, error, pageInfo } = useSelector((state) => state.getAllBlog);

  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs
  const fetchBlogs = useCallback(() => {
    dispatch(getAllBlog({ page: currentPage, limit, search }));
  }, [dispatch, currentPage, limit, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleViewClick = (blog) => {
    setSelectedBlog(blog);
    setShowView(true);
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setShowEdit(true);
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setShowDelete(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <EditBlog show={showEdit} setShowEdit={setShowEdit} selectedBlog={selectedBlog} />
      <DeleteBlog show={showDelete} setShowDelete={setShowDelete} selectedBlog={selectedBlog} />
      
      <div>
        {/* Header */}
        <Container className="container-fluid">
        <div className="dash-head">
          <div className="dash_title">
            <div onClick={() => router.back()} className=" d-inline-flex align-items-center gap-2" style={{cursor: "pointer"}}>   
              <div className="d-inline-block bg-primary p-1 px-2 rounded-3" style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 -968 960 960" width={25} fill="#FFFFFF">
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </div>
              <h4 className={`main-title ${styles.xlFont}`}>Blog List</h4>
            </div>
          </div>
        </div>

        {/* Body */}
          <div className="card">
            <div className="card-header">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h2>Blog List</h2>
                <Link href="/admin/blogs/add-blog" className="btn sub_btn">ADD</Link>
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className={`p-2 mx-2 d-none d-md-block  ${styles.mdFont}`}
                style={{ width: "200px" }}
              />
            </div>

            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={11} className="text-center">
                <Table responsive>
                  <thead>
                    <tr className="border-bottom">
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Button Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs?.map((blog, index) => (
                      <tr key={index} className="border-bottom">
                        <td>
                          <Image
                            src={blog.image}
                            alt={`blog-${index}`}
                            width={80}
                            height={50}
                            className="rounded-2 object-fit-cover"
                          />
                        </td>
                        <td>{blog.title}</td>
                        <td>
                          {blog.description?.substring(0, 20)}
                          {blog.description?.length > 20 ? "..." : ""}
                        </td>
                        <td>{blog.blog_link}</td>
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
                              onClick={() => handleEditClick(blog)}
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
                              onClick={() => handleDeleteClick(blog)}
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
                    <p>{`showing ${limit} entries of blogs`}</p>
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

export default BlogList;
