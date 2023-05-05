import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import moment from "moment";

const Write = () => {
  const user = sessionStorage.getItem("id");
  const state = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("session", user);
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);
  const user_id = sessionStorage.getItem("id");

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState(state?.tag || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // const dataObject = { user_id, title, img: file, tag, desc: value };

  const handleSubmit = async (e)  => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      // state
      //   ? await axios.put(
      //       `https://blog.shbootcamp.com.ng/writepost.php/${state.id}`,
      //       {
      //         user_id,
      //         title,
      //         desc: value,
      //         tag,
      //         img: file ? imgUrl : "",
      //       }
      //     )
      //   : 
        await axios.post(`https://blog.shbootcamp.com.ng/writepost.php`, {
            user_id,
            title,
            desc: value,
            tag,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
    } catch (err) {
      console.log(err);
    }

    console.log("Clicked");

    // fetch("https://blog.shbootcamp.com.ng/writepost.php", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataObject),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  return (
    <div className="px-6">
      <div className="add">
        <div className="content">
          <input
            className="p-[10px] border border-solid"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <div className="h-[300px] overflow-scroll">
            <ReactQuill
              className="h-full border-b border-b-solid"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status:</b> Draft
            </span>
            <span>
              <b>Visibility:</b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="file"
            />
            <label htmlFor="file">Upload Image</label>
            <div className="flex justify-between mt-2">
              <Button primary={true} text="Update" />
              <Button text="Save blog" onClick={handleSubmit} />
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "art"}
                onChange={() => setTag("art")}
                value="art"
                id="art"
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "science"}
                onChange={() => setTag("science")}
                value="art"
                id="science"
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "technology"}
                onChange={() => setTag("technology")}
                value="art"
                id="technology"
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "cinema"}
                onChange={() => setTag("cinema")}
                value="art"
                id="cinema"
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "design"}
                onChange={() => setTag("design")}
                value="art"
                id="design"
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                checked={tag === "food"}
                onChange={() => setTag("food")}
                value="art"
                id="food"
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
