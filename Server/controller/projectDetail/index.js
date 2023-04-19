const express = require("express");
const router = express();
const projectController = require("./project");

router.post("/project", projectController.projectPost);
router.get("/project/:id", projectController.projectGet);

module.exports = router;