import { useEffect, useState } from "react";
import CardPhoto from "../layout/CardPhoto";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function DetailPage() {
  //truyền vào photo_id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  let avt = JSON.parse(localStorage.getItem("avt"));
  let user_firstname = JSON.parse(localStorage.getItem("user_firstname"));
  let user_lastname = JSON.parse(localStorage.getItem("user_lastname"));
  let { id } = useParams();
  let [detailPhoto, setDetailPhoto] = useState(null);
  let [inputComment, setInputComment] = useState("");

  let photos = [
    { url: "/assits/image/coffe.jpg" },
    { url: "/assits/image/connan1.jpg" },
    { url: "/assits/image/connan2.jpg" },
    { url: "/assits/image/connan3.jpg" },
  ];
  // ở đây có user_id
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/media/detail/${id}`, {
      headers: { Authorization: userId },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("detail comment", data.dataComment);
        dispatch({ type: "LOAD_COMMENT", payload: data.dataComment });
        dispatch({ type: "LOAD_RELATEDIMAGES", payload: data.relatedImages });
        setDetailPhoto({ ...data });
      })
      .catch((err) => navigate("/login"));
  }, [id]);

  const handleFollow = (id) => {
    console.log(id);
  };
  const handleLike = (comment_id) => {
    let body = { comment_id: comment_id };
    fetch("http://localhost:8000/api/v1/action/like", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: userId },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE_LIKE",
          payload: { comment_id, quantity: +1 },
        });
      })
      .catch((err) => navigate("/login"));
  };
  const handleDislike = (comment_id) => {
    fetch(`http://localhost:8000/api/v1/action/like/${comment_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: userId },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE_LIKE",
          payload: { comment_id, quantity: -1 },
        });
      })
      .catch((err) => navigate("/login"));
  };
  const handleInputComment = (e) => {
    setInputComment(e.target.value);
  };
  const handleDeleteComment = (comment_id, index) => {
    fetch(`http://localhost:8000/api/v1/comment/delete/${comment_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: userId },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "DELETE_COMMENT", payload: index });
      })
      .catch((err) => console.log(err));
  };
  const handleComment = async (e, photo_id) => {
    e.preventDefault();
    if (inputComment) {
      let now = await Date.now();
      let body = {
        photo_id: photo_id,
        user_id: userId,
        comment_content: inputComment,
        now,
      };
      fetch(`http://localhost:8000/api/v1/comment/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("detail line 105", data);
          dispatch({
            type: "NEW_COMMENT",
            payload: {
              ...data.data,
              checkLike: false,
              likes: 0,
              user_lastname,
              user_firstname,
              user_avatar: avt,
            },
          });
        })
        .catch((err) => navigate("/login"));
    }
  };
  const comments = useSelector((state) => state.dataComments);
  console.log("comment", comments);
  const relatedImages = useSelector((state) => state.dataRelatedImages);
  if (!detailPhoto || !comments) {
    return <div className="loader">Loading</div>;
  }
  return (
    <div className="detailPage">
      <div className="detailBox">
        <div className="detail-img">
          {" "}
          <img
            className="detailPhoto"
            src={detailPhoto.dataPhoto.photo_path}
            alt="detailPhoto"
          />
        </div>

        <div className="commentBox">
          <div className="commentHeader">
            <div>
              <i class="fa-sharp fa-solid fa-ellipsis"></i>
              <i class="fa-solid fa-upload"></i>
              <i class="fa-solid fa-link"></i>
            </div>
            <div>
              <span>
                Hồ sơ <i class="fa-solid fa-v"></i>
              </span>
              <button>Lưu</button>
            </div>
          </div>
          <div className="dataOwner">
            <h3>{detailPhoto.dataPhoto.photo_title}</h3>
            <p>{detailPhoto.dataPhoto.photo_content}</p>
            <div>
              <div>
                <img
                  onClick={() =>
                    navigate(`/profile/${detailPhoto.dataOwner.user_id}`)
                  }
                  src={detailPhoto.dataOwner.user_avatar}
                  alt="avatar"
                />
                <div>
                  <p
                    onClick={() =>
                      navigate(`/profile/${detailPhoto.dataOwner.user_id}`)
                    }
                    className="userName"
                  >
                    {detailPhoto.dataOwner.user_firstname + " "}
                    {detailPhoto.dataOwner.user_lastname}
                  </p>
                  <p>{detailPhoto.dataOwner.follower} người theo dõi</p>
                </div>
              </div>
              <button
                onClick={() => handleFollow(detailPhoto.dataOwner.user_id)}
              >
                Theo dõi
              </button>
            </div>
          </div>
          <div className="comments">
            <p>{comments.length} Nhận xét</p>
            {comments.map((comment, index) =>
              comment.isEdit ? (
                <div>
                  Chưa có nhận xét nào! Thêm nhận xét để bắt đầu cuộc trò
                  chuyện.
                </div>
              ) : (
                <div className="comment">
                  <img
                    onClick={() => navigate(`/profile/${comment.user_id}`)}
                    src={
                      comment.user_avatar
                        ? comment.user_avatar
                        : "/avtarnull.jpg"
                    }
                    alt="avatar"
                  />
                  <div>
                    <p
                      onClick={() => navigate(`/profile/${comment.user_id}`)}
                      className="userName"
                    >
                      {comment.user_firstname}
                      {comment.user_lastname}{" "}
                      <span>{comment.comment_content}</span>
                    </p>
                    <div className="reactionCmt">
                      <p>{comment.comment_create_time}</p>
                      <p>Trả lời</p>
                      <i
                        onClick={() =>
                          comment.checkLike
                            ? handleDislike(comment.comment_id)
                            : handleLike(comment.comment_id)
                        }
                        class="fa-solid fa-heart"
                      >
                        {comment.likes}
                      </i>
                      {userId == comment.user_id ? (
                        <div>
                          <i class="fa-sharp fa-solid fa-pen"></i>
                          <i
                            onClick={() =>
                              handleDeleteComment(comment.comment_id, index)
                            }
                            class="fa-solid fa-trash"
                          ></i>
                        </div>
                      ) : (
                        <div>
                          <i class="fa-solid fa-exclamation"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <form
            onSubmit={(e) => handleComment(e, detailPhoto.dataPhoto.photo_id)}
          >
            <input
              className="inputCmt"
              type="text"
              placeholder="Thêm nhận xét..."
              value={inputComment}
              onInput={(e) => handleInputComment(e)}
            />
          </form>
        </div>
      </div>
      <div className="connectionPhoto">
        {relatedImages.map((photo, index) => (
          <CardPhoto key={index} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;
