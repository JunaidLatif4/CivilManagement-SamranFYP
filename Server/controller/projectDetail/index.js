const express = require("express");
const router = express();
const auth = require("../../middlewares/auth/auth")
const projectController = require("./project");




router.use(auth.authenticate)

router.get("/", projectController.projectGet);
router.get("/:projectId", projectController.GetProjectById);
router.post("/", projectController.projectPost);

router.post("/inviteResponse", projectController?.inviteResponse)

router.post("/step/:projectId", projectController.addStepToProject);

// router.route("/:id")
//     .get()

module.exports = router;