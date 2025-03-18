import "./tasks.scss";

function RenderTask() {
  return (
    <>
      <div className="container">
        <div className="tasks-column">
          <div className="progress">დასაწყები</div>
          <div className="task">
            <div className="task-top">
              <div>
                <div className="task-priority">
                  <img
                    src="https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"
                    alt=""
                  />
                  <span>საშუალო</span>
                </div>
                <div className="task-profession">დიზაინი</div>
              </div>
              <p> 22 იანვ, 2022 </p>
            </div>
            <div className="task-middle">
              <h6>Redberry-ს საიტის ლენდინგის დიზაინი </h6>
              <p>
                შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
                ნავიგაციას.
              </p>
            </div>
            <div className="task-bottom">
              <img src="/assets/images/black.png" alt="profile" />
              <div>
                <img src="/assets/images/comments.svg" alt="" />
                <span>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RenderTask;
