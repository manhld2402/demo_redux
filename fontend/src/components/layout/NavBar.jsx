import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [check, setCheck] = useState(false);
  const avatar = JSON.parse(localStorage.getItem("avt"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  let [inputSearch, setInputSearch] = useState("");
  const handeleLogout = () => {
    localStorage.removeItem("avt");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_firstname");
    localStorage.removeItem("user_lastname");
    setCheck(false);
    navigate("/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/v1/media/search?search=${inputSearch}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOAD_DATA", payload: data.data });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={userId ? "navBar" : "hidden"}>
      <div>
        <img
          onClick={() => navigate("/")}
          className="logo"
          src="/assits/image/Pinterest-logo.png"
          alt="logo"
        />
        <button className="btnHome" onClick={() => navigate("/")}>
          Trang chủ
        </button>
        <button className="btnCreate" onClick={() => navigate("/create")}>
          Tạo v
        </button>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            value={inputSearch}
            onInput={(e) => setInputSearch(e.target.value)}
            type="text"
            placeholder="Search...."
          />
        </form>

        {/* <i class="fa-solid fa-magnifying-glass"></i> */}
      </div>
      <div>
        <i class="fa-solid fa-bell"></i>
        <i class="fa-brands fa-facebook-messenger"></i>
      </div>
      <div className="divProfile">
        <img
          className="avatar"
          src={avatar ? avatar : "/avtarnull.jpg"}
          alt="avatar"
        />
        <button onClick={() => setCheck(!check)}>
          <i class="fa-solid fa-v"></i>
        </button>

        <div className={check ? "boxLogout" : "hidden"}>
          <button onClick={() => navigate(`/profile/${userId}`)}>
            Trang cá nhân
          </button>
          <button className="btnLogout" onClick={handeleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
