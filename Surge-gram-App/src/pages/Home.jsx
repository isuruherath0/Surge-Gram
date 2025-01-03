
import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/post/all");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      {/* Logo */}
      <div className="logo">Logo</div>

      {/* Posts */}
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post">
            {/* Post Image */}
            <img src={post.imageurl} alt="Post" className="post-image" />

            {/* Post Info */}
            <div className="post-info">
              <div className="likes">{post.noOfLikes} ❤️</div>
              <div className="username">{post.user.username}</div>
              <div className="created-at">
                {post.createdAt }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
