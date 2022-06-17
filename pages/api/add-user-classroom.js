import axios from "axios";
export default async function handler(req, res) {
  const { studentID, classroomID } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };
  if (studentID === "") {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  console.log(req.body);
  // post to
  const url = `https://mt22-server.herokuapp.com/api/classrooms/join`;
  // const url = `http://localhost:3001/api/classrooms/join`;

  await axios
    .post(
      url,
      {
        studentID: studentID,
        classroomID: classroomID,
      },
      {
        headers: headers,
      }
    )
    .then((data) => {
      res.status(200).json(data.data);
      return;
    })
    .catch(function (error) {
      const emptyStudent = [];
      console.log(error);
      if (error.response) {
        // Request made and server responded
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
        return;
      } else if (error.request) {
        // The request was made but no response was received
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
        console.log(error.request);
        return;
      } else {
        // Something happened in setting up the request that triggered an Error

        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
        return;
      }
    });
  // good response
}
