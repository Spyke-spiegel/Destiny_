const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fetchJson = require("fetch-json");

// router.get("/:gamertag", async (req, res) => {
//   try {
//     const headers = {
//       "X-API-KEY": process.env.TRACKER_API_KEY
//     };

//     const { gamertag } = req.params;
//     const response = await fetch(
//       `${process.env.TRACKER_API_URL2}/SearchUsers/?q=${gamertag}`,
//       {
//         headers
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.error(err);
//     res.status(500).json({
//       message: "Server Error"
//     });
//   }
// });


router.get("/:merbershipId", async (req, res) => {
  try {
    const headers = {
      "X-API-KEY": process.env.TRACKER_API_KEY
    };
    const membershipId = req.params;
    //console.log(membershipId)
    // console.log(typeof membershipId)
    const asdf = membershipId.merbershipId
    //console.log(asdf)
    const destinyId = await fetch(
      `${process.env.TRACKER_API_URL2}/User/GetMembershipsById/${asdf}/-1/`,
      {
        headers
      }
    );
    const data = await destinyId.json();
    //console.log(data.Response)
    const membershipType = data.Response.destinyMemberships[1].membershipType
    const idDestiny = data.Response.destinyMemberships[1].membershipId
    console.log(membershipType);
    console.log(idDestiny);
    const persoInfos = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${membershipType}/Profile/${idDestiny}/?components=100`,
      {
        headers
      }
    );
    const data2 = await persoInfos.json();
    console.log(data2.Response.profile.data.characterIds)
  } catch (error) {
    console.error(err);
    res.status(500).json({  
      message: "Server Error"
    });
  }
});


module.exports = router;
