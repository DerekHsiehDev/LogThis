// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  const { email, password, firstName, lastName } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  };

  // post to
  const url = "https://mt22-server.herokuapp.com/api/users/create";
  if (email === "" || password === "" || firstName === "" || lastName === "") {
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
        firstName: firstName,
        lastName: lastName,
        role: "student",
      },
      {
        headers: headers,
      }
    )
    .then((data) => {
      console.log("this ran");
      console.log(data);
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

// export default async function handler(req, res) {

//     console.log(req)
//     if (req.body.type === "multiple-choice") {

//         const questionChoice = []

//         req.body.correctChoices.forEach((choice) => {
//             questionChoice.push(choice.choiceID)
//         })

//         // try {
//         const multi_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`,
//             {
//                 "answers": [{
//                     "type": "multiple-choice", "questionId": `${req.body.questionId}`,
//                     "choices":

//                         // questionChoice
//                         questionChoice

//                     // req.body.correctChoices.forEach((choice) => {
//                     //     return choice.choiceID
//                     // })

//                 }]
//             },
//             {
//                 headers: {
//                     'Cookie': `token=${req.body.userToken}`
//                 }
//             }
//         )
//         console.log(multi_response.data)
//         res.send(multi_response.data);

//         // }
//         // catch(error) {
//         //     res.status(404).json({ error: "error making requests" });

//         //     console.log(error)
//         // }

//     }

//     else if (req.body.type === "open-ended") {

//         const open_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`,
//             { "answers": [{ "type": "open-ended", "questionId": `${req.body.questionId}`, "body": [{ "text": `${req.body.openEndedAnswer}`, "html": "" }] }] },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': `token=${req.body.userToken}`
//                 }
//             });
//         console.log(open_response.data)
//         res.send("GOOD OPEN ENDED")

//     }

// }
