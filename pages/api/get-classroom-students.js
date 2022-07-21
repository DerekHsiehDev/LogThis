import axios from "axios";
export default async function handler(req, res) {
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };
  const classroomID = req.query.classroomID;
  if (classroomID === "") {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // post to
  // const url = `https://mt22-server.herokuapp.com/api/log/get-my-log?studentID=${userID}`;
  const url = `https://mt22-server.herokuapp.com/api/classrooms/all-students?classroomID=${classroomID}`;
  //   const url =
  // "http://localhost:3001/api/get-classroom-data?classroomID=A7p62uZ";

  console.log(classroomID);
  await axios
    .get(url, {
      headers: headers,
      classroomID: classroomID,
    })
    .then((data) => {
      res.status(200).json({
        message: data.data.message,
        practiceLogs: data.data.practiceLogs,
      });
      return;
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
        return;
      } else if (error.request) {
        // The request was made but no response was received
        res.status(error.response.status).json({ message: "unexpected error" });
        console.log(error.request);
        return;
      } else {
        // Something happened in setting up the request that triggered an Error

        res.status(400).json({ message: "unexpected error" });
        return;
      }
    });
  // good response
}
