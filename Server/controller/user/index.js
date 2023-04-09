const express = require("express");
const router = express();
const user = require("./user");
const auth = require("../../middlewares/auth/auth");
const roles = require("../../constants/roles");
const multer = require("../../utils/multer");
router.use(auth.authenticate);
router.get("/user/:id", user.getById);
router.patch("/", multer.single("profileImage"), user.updateAccount);
router.patch("/approve/:id", auth.restrictTo([roles.SUPERADMIN]) , user.approve);
router.patch("/ban/:id", auth.restrictTo([roles.SUPERADMIN]), user.ban);
router.get("/getAll", auth.restrictTo([roles.ADMIN, roles.SUPERADMIN]), user.getAll);

module.exports = router;