const promise = await list.date.map(async (date) => {
  const leaveDay = new Promise(async (resolve, reject) => {
    OnLeave.findOne({ userId: userId, date: date })
      .then((day) => {
        if (!day) {
          const newOnLeave = new OnLeave({
            userId: userId,
            date: date,
            day: 1,
            reason: req.body.reason,
          });
          newOnLeave.save().catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
          resolve((req.user.annualLeave -= 1));
        } else {
          //Render rejected on leave
          resolve("no-select");
        }
      })
      .catch((err) => reject(err));
  });
  return leaveDay;
});
Promise.all(promise)
  .then((item) => {
    const find = item.find((x) => x === "no-select");
    if (!find) {
      req.user
        .save()
        .then((item) => res.redirect("/attendance"))
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    } else {
      req.user
        .save()
        .then((item) => {
          //Render rejected on leave
          res.redirect(
            url.format({
              pathname: "/attendance",
              query: {
                denied: "no-select",
              },
            })
          );
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    }
  })
  .catch((item) => {
    //Render rejected on leave
    res.redirect(
      url.format({
        pathname: "/attendance",
        query: {
          denied: "no-select",
        },
      })
    );
  });
