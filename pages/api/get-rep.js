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
  const url = `https://mt22-server.herokuapp.com/api/users/get-rep?userID=${userID}`;
  console.log(req.body);

  await axios
    .get(url, {
      headers: headers,
    })
    .then((data) => {
      res.status(200).json({ message: data.data.repertoire });
      return;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        res
          .status(error.response.status)
          .json({ message: error.response.data.repertoire });
        return;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        res
          .status(error.response.status)
          .json({ message: error.response.data.repertoire });
        return;
      } else {
        // Something happened in setting up the request that triggered an Error

        res
          .status(error.response.status)
          .json({ message: error.response.data.repertoire });
        return;
      }
    });
  // good response
}
