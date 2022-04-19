import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function Blogs() {
  const [blogs, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios("http://localhost:8080/blogs");
      console.log(res.data);
      setBlog(res.data);
    };
    getBlogs();
  }, []);
  const deletehandler = (id) => {
    axios
      .delete(`http://localhost:8080/blogs/delete-blog/${id}`)
      .then((res) => console.log(res.data));
      window.location.reload();
    };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div class="row">
          <div class="col-sm-8 col-4">
            <h4 class="page-title">Blog</h4>
          </div>
          <div class="col-sm-4 col-8 text-right m-b-30">
            <Link
              class="btn btn-primary btn-rounded float-right"
              to={"/patient/add-blog"}
              component={Link}
            >
              <i class="fa fa-plus"></i> Add Blog
            </Link>
          </div>
        </div>
        <div className="row">
          {blogs.map((el, index) => {
            console.log(el);
            return (
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="dropdown profile-action ">
                  <a
                    href="#"
                    className="action-icon dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link
                      className="dropdown-item"
                      to={`/patient/edit-blog/${el._id}`}
                      component={Link}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-toggle="modal"
                      data-target="#delete_doctor"
                      onClick={() => {
                        deletehandler(el._id);
                      }}
                    >
                      <i className="fa fa-trash-o m-r-5" /> Delete
                    </a>
                  </div>
                </div>
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <Link
                      className="dropdown-item"
                      to={`/patient/blog-details/${el._id}`}
                      component={Link}
                    >
                      <img
                        className="img-fluid"
                        src="assets/img/blog/blog-01.jpg"
                        alt
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <Link to="/patient/blog-details" component={Link}>
                        {el.title}
                      </Link>
                    </h3>
                    <p>{el.description}</p>
                    <Link
                      className="read-more"
                      to="/patient/blog-details"
                      component={Link}
                    >
                      <i className="fa fa-long-arrow-right" /> Read More
                    </Link>

                    <div className="blog-info clearfix">
                      <div className="post-left">
                        <ul>
                          <li>
                            <a href="#.">
                              <i className="fa fa-calendar" />{" "}
                              {dayjs(`${el.dateCreation}`).format("DD/MM/YYYY")}{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="post-right">
                        <a href="#.">
                          <i className="fa fa-heart-o" />
                          21
                        </a>{" "}
                        <a href="#.">
                          <i className="fa fa-eye" />8
                        </a>{" "}
                        <a href="#.">
                          <i className="fa fa-comment-o" />
                          17
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
}

export default Blogs;
