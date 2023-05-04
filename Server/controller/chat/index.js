const express = require("express");
const router = express();

const ChannelController = require("./channel");
const MessageController = require("./message")

const auth = require("../../middlewares/auth/auth")




router.use(auth.authenticate)

router.get("/channel", ChannelController.getChannelIds);
router.get("/channel/:projectId", ChannelController.GetChennelByProject)

router.post("/channel", ChannelController.CreateChannel);

router.get("/message/:channelId/:page", MessageController.get)
router.post("/message", MessageController.create)

module.exports = router;