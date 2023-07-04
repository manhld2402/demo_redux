import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditUserPage() {
  let { id } = useParams();
  let [file, setFile] = useState();
  const avt = JSON.parse(localStorage.getItem("avt"));
  let [dataUser, setDataUser] = useState();
  let [inputBody, setInputBody] = useState({
    user_firstname: "",
    user_lastname: "",
    user_about: "",
  });
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/user/${id}`)
      .then((res) => res.json())
      .then((data) => setDataUser(data.dataUser))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(dataUser);
  const changeAvatar = (e) => {
    setFile(e.target.value);
    const formData = new FormData();
    formData.append("file", file);
    fetch(`http://localhost:8000/api/v1/media/post`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
  };
  return (
    <div>
      <img src={avt} alt="avatar" />
      <input onChange={changeAvatar} type="file" />
      <label htmlFor="user_lastname">Tên</label>
      <input type="text" name="user_lastname" id="user_lastname" />
      <label htmlFor="user_firstname">Họ</label>
      <input type="text" name="user_firstname" id="user_firstname" />
      <label htmlFor="user_about">giới thiệu</label>
      <input type="text" name="user_about" id="user_about" />
      <button>Lưu</button>
    </div>
  );
}

export default EditUserPage;
