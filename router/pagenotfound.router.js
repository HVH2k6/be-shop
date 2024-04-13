const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
res.send("page not found")
})
module.exports = router;