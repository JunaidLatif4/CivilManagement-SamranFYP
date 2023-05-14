const express = require("express");
const router = express();
const auth = require("../../middlewares/auth/auth")
const projectController = require("./project");
const multer = require("../../utils/multer");




router.use(auth.authenticate)

router.get("/", projectController.projectGet);
router.get("/static", projectController.projectStatics);
router.get("/:projectId", projectController.GetProjectById);
router.post("/", projectController.projectPost);

router.post("/inviteResponse", projectController?.inviteResponse)

router.post("/step/:projectId", projectController.addStepToProject);
router.patch("/step/:projectId", multer.single("document"), projectController.ProjectStepResponse);

router.patch("/complete", projectController.completeProject);

// router.route("/:id")
//     .get()

module.exports = router;