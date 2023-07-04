import { useDispatch } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

function CardPhoto({ photo, index }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handeleNavigte = (link) => {
    navigate(`/pin/${link}`);
  };
  const handleDeletePhoto = (index, id) => {
    fetch(`http://localhost:8000/api/v1/media/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "DELETE_PHOTO", payload: index });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="photoCard">
      <div
        onClick={() => handeleNavigte(photo.photo_id)}
        className="mask"
      ></div>
      <button
        onClick={() => handleDeletePhoto(index, photo.photo_id)}
        className={userId == photo.user_id ? "btnDelete" : "hidden"}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
      {/* <i class="fa-solid fa-trash" }></i> */}
      <img className="photo" src={photo.photo_path} alt="photo" />
    </div>
  );
}

export default CardPhoto;
