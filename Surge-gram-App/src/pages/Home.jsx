import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, reset } from "../../features/posts/postSlice.js";
import { logout } from "../../features/auth/authSlice.js";
import { addLikeorRemoveLike } from "../../features/posts/postSlice.js"; // import the addLikeorRemoveLike action

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector((state) => state.post);

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
      // Dispatch add/remove like action
      dispatch(addLikeorRemoveLike({ postId, token }));
    }
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
              <div className="likes">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(post._id)}
                  className={`like-button ${post.likes.includes(user.id) ? 'liked' : 'unliked'}`}
                >
                  {post.likes.includes(user.id) ? '❤️' : '🤍'} {/* Full heart if liked, empty heart if not */}
                </button>
              </div>
              <div className="username">{post.user.username}</div>
              <div className="created-at">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
