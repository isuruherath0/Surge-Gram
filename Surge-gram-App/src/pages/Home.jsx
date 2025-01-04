import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, reset } from "../../features/posts/postSlice.js";
import { logout } from "../../features/auth/authSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, isLoading, isError, message } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* Logo */}
      <div className="logo">Logo</div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      {/* Posts */}
      <div className="post-list">
        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Error fetching posts: {message}</p>}
        {posts.map((post) => (
          <div key={post._id} className="post">
            {/* Post Image */}
            <img src={post.imageurl} alt="Post" className="post-image" />

            {/* Post Info */}
            <div className="post-info">
              <div className="likes">{post.noOfLikes} ❤️</div>
              <div className="username">{post.user.username}</div>
              <div className="created-at">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
