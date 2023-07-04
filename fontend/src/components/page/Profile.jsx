import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardPhoto from "../layout/CardPhoto";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  let { id } = useParams();
  let [check, setCheck] = useState(true);
  let dispatch = useDispatch();
  console.log("line6", id);
  let [dataUser, setDataUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOAD_DATA", payload: [...data.dataPhoto] });
        setDataUser({ ...data.dataUser });
      })
      .catch((err) => console.log(err));
  }, [check]);
  console.log("dataUser", dataUser);
  let dataPhotos = useSelector((state) => state.dataPhotos);
  if (!dataUser || !dataPhotos) {
    return <div className="loader"></div>;
  }
  return (
    <div className="profilePage">
      <img className="avatar" src={dataUser.user_avatar} alt="avatar" />
      <h3>
        {dataUser.user_firstname} {dataUser.user_lastname}
      </h3>
      <p>Có bao nhiêu người fl và fl bao nhiêu người</p>
      {userId == dataUser.user_id ? (
        <button
          onClick={() => navigate(`/edit/${userId}`)}
          className="btnEditUser"
        >
          Chỉnh sửa hồ sơ
        </button>
      ) : (
        <button className="btnFollow">Follow</button>
      )}
      <div>
        <button>Đã tạo</button>
        <button>Đã lưu</button>
        <div className="connectionPhoto">
          {dataPhotos.map((photo, index) => (
            <div>
              <CardPhoto key={index} index={index} photo={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
