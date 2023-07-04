import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPhoto from "../layout/CardPhoto";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/media`, {
      headers: { Authorization: accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "fail") {
          navigate("/login");
        } else {
          dispatch({ type: "LOAD_DATA", payload: data.dataPhotos });
        }
      })
      .catch((err) => navigate("/login"));
  }, []);
  let dataPhotos = useSelector((state) => state.dataPhotos);
  if (dataPhotos.length == 0) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="homePage">
        {dataPhotos.map((photo, index) => (
          <CardPhoto key={index} photo={photo} />
        ))}
      </div>
    );
  }
}

export default HomePage;
