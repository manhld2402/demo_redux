import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostPage() {
  //Cần lấy thêm user_id từ localhost
  const userId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();
  let [textPost, setTextPost] = useState({
    user_id: userId,
    tag: "",
    album_id: null,
    photoTitle: "",
    photoContent: "",
  });
  let [file, setFile] = useState();
  let [urlFile, setUrlFile] = useState();
  const handleInput = (e) => {
    setTextPost({ ...textPost, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setUrlFile(URL.createObjectURL(e.target.files[0]));
  };
  const collectionTest = [1, 2, 3, 4];
  const handlePostPhoto = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", JSON.stringify(textPost));
      fetch(`http://localhost:8000/api/v1/media/post`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => navigate(`/pin/${data.photo_id}`))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="postPage">
      <input
        id="chooseFile"
        type="file"
        name="filename"
        onChange={(e) => handleFile(e)}
      />
      <div>
        <img src={urlFile} alt="" />
      </div>

      <div>
        <label htmlFor="textTitle">Tiêu đề</label>
        <input
          id="textTitle"
          type="text"
          name="photoTitle"
          onInput={(e) => handleInput(e)}
          value={textPost.photoTitle}
          placeholder="Title..."
        />
        <label htmlFor="textContent"> Mô tả</label>
        <input
          id="textContent"
          type="text"
          name="photoContent"
          onInput={(e) => handleInput(e)}
          value={textPost.photoContent}
          placeholder="Content.,.."
        />
        <label for="textTag"> Tag</label>
        <input
          id="textTag"
          type="text"
          name="tag"
          onInput={(e) => handleInput(e)}
          value={textPost.tag}
          placeholder="Tags cách nhau bởi dấu phẩy"
        />
        <select name="album_id" onChange={(e) => handleInput(e)}>
          <option>Bảng</option>
          {collectionTest.map((collection) => (
            <option value={collection}>{collection}</option>
          ))}
        </select>
        <button onClick={(e) => handlePostPhoto(e)}>Tạo</button>
      </div>
    </div>
  );
}

export default PostPage;
