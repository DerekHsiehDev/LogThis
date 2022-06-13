import axios from "axios";
export default async function handler(req, res) {
  const { email, password, firstName, lastName } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };

  // post to
  const url = "https://mt22-server.herokuapp.com/api/auth/login";
  if (email === "" || password === "") {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  const response = await axios
    .post(
      url,
      {
        email: email,
        password: password,
      },
      {
        headers: headers,
      }
    )
    .then((data) => {
      res
        .status(200)
        .json({ message: data.data.message, user: data.data.user });
      return;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
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
