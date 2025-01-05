import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, reset } from "../../features/posts/postSlice.js";
import { logout } from "../../features/auth/authSlice.js";
import { addLikeorRemoveLike } from "../../features/posts/postSlice.js";
import logo from "../assets/logo.png";
import userImage from "../assets/user.png";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (!user || !token) {
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "15px",
          boxSizing: "border-box",
        }}
      >
        {/* Logo Image */}
        <div>
          <img
            src={logo}
            alt="Surge-Gram Logo"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </div>

        {/* App Name */}
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#444",
            letterSpacing: "1px",
          }}
        >
          Surge-Gram
        </p>
      </div>

      {/* Middle Section */}
      <div
        style={{
          flex: 2,
          overflowY: "scroll",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div>
          {isLoading && <p>Loading posts...</p>}
          {isError && <p>Error fetching posts: {message}</p>}
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "2px",
                marginBottom: "30px",
              }}
            >
              {/* Post Image */}
              <img
                src={post.imageurl}
                alt="Post"
                style={{
                  width: "100%",
                }}
              />

              {/* Content Below Post */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                {/* Likes Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <button
                    onClick={() => handleLike(post._id)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    {post.likes.includes(user.id) ? (
                      <FaHeart style={{ fill: "red" }} />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <span>{post.likes.length}</span>
                </div>

                {/* Username */}
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {post.user.username}
                </div>

                {/* Date */}
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderLeft: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            width: "50%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "6px",
          }}
        >
          <img
            src={user?.profileImage || userImage}
            alt="User"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "60%",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              {user?.fullName || "Full Name"}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                marginTop: "0px",
              }}
            >
              @{user?.username}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff6666",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "50%",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeFeed;
