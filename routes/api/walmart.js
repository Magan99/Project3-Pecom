const router = require("express").Router();

// Matches with "/api/items"

// Matches with "/api/items/:id"
router
  .route("/:query")
  .get(function(req, res){return res.json(
      axios.get("https://api.walmartlabs.com/v1/search?&apiKey=vng9pukufs97mcyyjs5ps266&query=" 
  +  req.params.query + "&format=json")
  );})

module.exports = router;
