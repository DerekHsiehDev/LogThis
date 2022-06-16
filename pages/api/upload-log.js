import axios from "axios";
export default async function handler(req, res) {
  const { userID, minutes, piece, notes, id } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };

  // post to
  const url = "https://mt22-server.herokuapp.com/api/log/practice";
  //   const url = "localhost:3001/api/log/practice";
  console.log(req.body);
  if (userID === "" || userID === undefined) {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  await axios
    .post(
      url,
      {
        studentID: userID,
        minutes: minutes,
        piece: piece,
        notes: notes,
        id: id,
      },
      {
        headers: headers,
      }
    )
    .then((data) => {
      res.status(200).json({ message: data.data.message });
      return;
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        res.status(500).json({ message: error.response.data.message });
        return;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
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
