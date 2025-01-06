import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, reset, addLikeorRemoveLike } from "../../features/posts/postSlice.js";
import { logout } from "../../features/auth/authSlice.js";
import logo from "../assets/logo.jpg";
import userImage from "../assets/user.png";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";

import { styles } from "../styles/homFeed.js";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector((state) => state.post);

  const [sortBy, setSortBy] = useState("likes");

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "likes") {
      return b.likes.length - a.likes.length;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  useEffect(() => {
    if (!user || !token || !user.id) {
      navigate("/login");
    } else {
      dispatch(getPosts());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLike = (postId) => {
    if (user && token) {
      dispatch(addLikeorRemoveLike({ postId, token }));
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <img src={logo} alt="Surge-Gram Logo" style={styles.logo} />
        <p style={styles.title}>Surge-Gram</p>
      </div>

      <div style={styles.middlePanel}>
        <div style={styles.filterSection}>
          <h3>Filter By:</h3>
          <button
            onClick={() => setSortBy("date")}
            style={styles.filterButton(sortBy === "date")}
          >
            <BsCalendarDateFill style={{ marginRight: "5px" }} />
          </button>
          <button
            onClick={() => setSortBy("likes")}
            style={styles.filterButton(sortBy === "likes")}
          >
            <FaHeart style={{ marginRight: "5px" }} />
          </button>
        </div>

        <div>
          {isLoading && <p>Loading posts...</p>}
          {isError && <p>Error fetching posts: {message}</p>}
          {sortedPosts.map((post) => (
            <div key={post._id} style={styles.postContainer}>
              <img src={post.imageurl} alt="Post" style={styles.postImage} />
              <div style={styles.postFooter}>
                <div style={styles.likesSection}>
                  <button
                    onClick={() => handleLike(post._id)}
                    style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
                  >
                    {post.likes.includes(user.id) ? <FaHeart style={{ fill: "red" }} /> : <FaRegHeart />}
                  </button>
                  <span>{post.likes.length}</span>
                </div>
                <div style={styles.username}>{post.user.username}</div>
                <div style={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.userDetails}>
          <img src={user?.imageurl || userImage} alt="User" style={styles.userImage} />
          <div>
            <p style={styles.userName}>{user?.fullname || "Full Name"}</p>
            <p style={styles.usernameHandle}>@{user?.username}</p>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeFeed;
