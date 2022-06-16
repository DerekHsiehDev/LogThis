import axios from "axios";
export default async function handler(req, res) {
  const { userID } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };
  if (userID === "") {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // post to
  const url = `https://mt22-server.herokuapp.com/api/log/get-my-log?studentID=${userID}`;

  await axios
    .get(url, {
      headers: headers,
    })
    .then((data) => {
      res.status(200).json({ message: data.data.student });
      return;
    })
    .catch(function (error) {
      const emptyStudent = [];
      console.log(error);
      if (error.response) {
        // Request made and server responded
        res.status(error.response.status).json({ message: { student: [] } });
        return;
      } else if (error.request) {
        // The request was made but no response was received
        res.status(error.response.status).json({ message: { student: [] } });
        console.log(error.request);
        return;
      } else {
        // Something happened in setting up the request that triggered an Error

        res.status(error.response.status).json({ message: { student: [] } });
        return;
      }
    });
  // good response
}
