const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fetchJson = require("fetch-json");

router.get("/:membershipId", async (req, res) => {
  try {
    const headers = {
      "X-API-KEY": process.env.TRACKER_API_KEY
    };
    const {
      membershipId
    } = req.params;
    const asdf = membershipId;
    console.log("req params : " + asdf);
    const response = await fetch(
      `${process.env.TRACKER_API_URL2}User/GetMembershipsById/${membershipId}/-1/`, {
        headers
      }
    );
    const data1 = await response.json();
    const primaryPlayerId = data1.Response.destinyMemberships[0].membershipId;
    const primaryPlayerType = data1.Response.destinyMemberships[0].membershipType;
    console.log('response de bungie membership ID : ' + primaryPlayerId + 'et membership Type: ' +
      primaryPlayerType);
    const response2 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/?components=100`, {
        headers
      }
    );
    const data2 = await response2.json();
    console.log(data2)
    res.json(data2);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});



module.exports = router