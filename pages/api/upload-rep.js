import axios from "axios";
export default async function handler(req, res) {
  const { userID, title, composer, tags, notes } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // post to
  const url = "https://mt22-server.herokuapp.com/api/users/add-rep";
  console.log(req.body);
  if (userID === "" || title === "" || composer === "") {
    // res status error
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  await axios
    .post(
      url,
      {
        userID: userID,
        title: capitalizeFirstLetter(title),
        composer: toTitleCase(composer),
        tags: tags,
        notes: notes,
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
      if (error.response) {
        // Request made and server responded
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
