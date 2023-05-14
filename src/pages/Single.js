import { CiEdit } from "react-icons/ci";
import {
  RiDeleteBin3Line,
  RiShareForward2Fill,
  RiFacebookFill,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
// import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { getText } from "../utils/getText";
import { ToastContainer, toast } from "react-toastify";
import Picture from "../img/marguerite-729510__340.jpg";
import Button from "../components/Button";
import { FaHeart, FaTwitter } from "react-icons/fa";
import { MdWhatsapp } from "react-icons/md";

const Single = () => {
  const [posts, setPosts] = useState("");
  const [post, setPost] = useState("");
  const [fetching, setFetching] = useState("Fetching Blogs...");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [tag, setTag] = useState("");
  const [tagPosts, setTagPosts] = useState("");
  const [count_id, setCount] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const user = sessionStorage.getItem("id");

  const user_id = parseInt(user);

  const url = window.location.href;

  console.log(url, post, posts);

  const shareButton = (e) => {
    setHidden(!hidden);
  };

  const counter = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    if (clicked === false) {
      setCount(count_id - 1);
    } else {
      setCount(count_id + 1);
    }

    const likeData = { id, user_id, count_id };

    fetch("https://blog.shbootcamp.com.ng/new_likes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data, likeData);
      });
  };

  useEffect(() => {
    async function blogs() {
      const res = await fetch(
        `https://blog.shbootcamp.com.ng/fetch_post.php?id=${id}`
      );
      const data = await res.json();
      // console.log(data);
      const blog = data.fetch_post.post;
      setPosts(blog);
      setPost(blog);
      setFetching("");
      setTag(data.fetch_post.post[0].tags);
    }
    blogs();
  }, [setPosts, id]);

  const editPost = () => {
    const editData = { id, user_id };

    fetch("https://blog.shbootcamp.com.ng/auth_edit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          toast.error(data.message, {
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-right",
            theme: "dark",
            pauseOnHover: true,
          });
        } else {
          navigate(`/write?edit=${id}`, {
            state: { post },
          });
        }
      });
  };

  const deletePost = () => {
    const deleteData = { id, user_id };

    fetch("https://blog.shbootcamp.com.ng/delete_post.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message, {
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-right",
            theme: "dark",
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } else {
          toast.error(data.message, {
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-right",
            theme: "dark",
            pauseOnHover: true,
          });
        }
      });
  };

  const addComment = () => {
    const commentData = { id, user_id, comment };

    fetch("https://blog.shbootcamp.com.ng/comment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message, {
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-right",
            theme: "dark",
            pauseOnHover: true,
          });
        } else {
          toast.error(data.message, {
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-right",
            theme: "dark",
            pauseOnHover: true,
          });
        }
      });
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     addComment()
  //   }, 2000)
  // }, [addComment])

  useEffect(() => {
    async function comments() {
      const res = await fetch(
        `https://blog.shbootcamp.com.ng/get_comment.php?id=${id}`
      );
      const data = await res.json();
      if (data.status === "error") {
        setDisplayMessage(data.message);
      } else {
        const allComments = data.message.all_comment;
        setComments(allComments);
        setDisplayMessage("");
      }
    }
    comments();
  }, [id]);

  // const addLike = () => {
  //   const likeData = { id, user_id, count };

  //   fetch("https://blog.shbootcamp.com.ng/like.php", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(likeData),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.status === "success") {
  //         toast.success(data.message, {
  //           hideProgressBar: true,
  //           autoClose: 2000,
  //           position: "bottom-right",
  //           theme: "dark",
  //           pauseOnHover: true,
  //         });
  //       } else {
  //         toast.error(data.message, {
  //           hideProgressBar: true,
  //           autoClose: 2000,
  //           position: "bottom-right",
  //           theme: "dark",
  //           pauseOnHover: true,
  //         });
  //       }
  //     });
  // };

  useEffect(() => {
    async function postByTags() {
      const res = await fetch(
        `https://blog.shbootcamp.com.ng/tag_post.php?tag=${tag}`
      );
      const data = await res.json();
      const blogs = data.message.all_tag;
      // console.log(tag, blogs);

      setTagPosts(blogs);
    }
    postByTags();
  }, [tag]);

  return (
    <div className="px-6 flex md:flex-row flex-col mt-8">
      <span className="flex text-lg justify-center">{fetching}</span>
      <div className="md:pr-4 single-content flex flex-col gap-[30px]">
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <div className="single-content flex flex-col gap-[30px]">
                <img
                  className="w-full h-80 md:h-[400px] object-cover"
                  src={
                    post.blog_picture
                      ? `https://blog.shbootcamp.com.ng/${post.blog_picture}`
                      : Picture
                  }
                  alt="blog"
                />
                <div className="flex items-center gap-[10px] text-[14px]">
                  {/* <img
                    className=" w-[100px] h-[100px] rounded-full object-cover"
                    src={post.author_picture}
                    alt="User"
                  /> */}
                  <div className=" flex items-center gap-[10px] text-[14px]">
                    <div>
                      <span className=" md:text-lg font-bold">
                        {post.author_name}
                      </span>
                      <p>{post.date_publish}</p>
                    </div>
                  </div>
                </div>
                <ToastContainer />
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-bold md:text-start text-center">
                    {post.blog_title}
                  </h1>
                  <span className="flex gap-2 -mt-4">
                    <span onClick={editPost}>
                      {
                        <CiEdit className="text-2xl md:text-3xl cursor-pointer hover:text-blue-600" />
                      }
                    </span>
                    <span onClick={deletePost}>
                      {
                        <RiDeleteBin3Line className="text-2xl md:text-3xl cursor-pointer hover:text-red-500" />
                      }
                    </span>
                  </span>
                </div>
                <div className="text-lg flex flex-col gap-2 my-4  text-justify">
                  {getText(post.body)}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span
                  onClick={counter}
                  className={
                    clicked
                      ? " hover:text-black text-red-600 cursor-pointer text-xl transition duration-100 ease-linear"
                      : "hover:text-red-600 text-black cursor-pointer text-xl transition duration-100 ease-linear"
                  }
                >
                  <FaHeart />
                </span>
                <span className="text-2xl"></span>
                <span
                  className=" text-2xl cursor-pointer"
                  onClick={shareButton}
                >
                  <RiShareForward2Fill />
                </span>
                <span
                  className={
                    hidden
                      ? "flex py-2 px-4 bg-gray-100 rounded-2xl gap-4 opacity-0 transition ease-linear duration-300"
                      : "flex py-2 px-4 bg-gray-100 rounded-2xl gap-4 opacity-100 transition ease-linear duration-300"
                  }
                >
                  <span>
                    <a href={``}>
                      <MdWhatsapp />
                    </a>
                  </span>
                  <span>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${url}?title=${post.blog_title}?text=${post.body}`}
                      target="_blank"
                    >
                      <FaTwitter />
                    </a>
                  </span>
                  <span>
                    <a href="/">
                      <RiFacebookFill />
                    </a>
                  </span>
                </span>
              </div>

              <h1 className="font-bold text-lg uppercase py-2">Comments:</h1>
              <span>{displayMessage}</span>
              {comments &&
                comments.map((comment) => (
                  <div className="pb-4 border-b">
                    <div
                      key={comment.comment_id}
                      className="flex gap-4 items-end"
                    >
                      <span className="font-bold">{comment.username} - </span>
                      <span>{comment.comment}</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {comment.date}
                    </span>
                  </div>
                ))}

              <div className="flex flex-col items-center md:items-start">
                <label htmlFor="comment" className="mt-4 font-semibold text-lg">
                  Add comments:
                </label>
                <textarea
                  className="p-2 block mt-2 w-80 h-24 border border-gray-500 rounded-lg"
                  name=""
                  id="comment"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="mt-2 mb-4">
                  <Button text="Post Comment" onClick={addComment} />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className=" pt-2 border-t md:border-l md:border-t-0 md:pl-4 single-menu">
        <h1 className="text-lg font-semibold uppercase text-center mb-4">
          Other posts you may like
        </h1>
        {tagPosts &&
          tagPosts
            .filter((post) => id !== post.post_id)
            .map((post) => (
              <div
                className="flex flex-col border-t pt-6 mb-6"
                key={post.post_id}
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={
                    post.blog_picture
                      ? `https://blog.shbootcamp.com.ng/${post.blog_picture}`
                      : Picture
                  }
                  alt=""
                />
                <h2 className="text-xl mb-4">{post.blog_title}</h2>
                <Button primary={true} text="Read More" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Single;
