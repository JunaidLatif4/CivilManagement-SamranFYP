const express = require("express");
const http = require("http");
const path = require("path");

// Middlewares :
const notFound = require("./middlewares/notfound");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./controller/error/errorhandler");

// Routes :
const router = require("./routes/router");
// Models :
const MessageModel = require("./model/chat/message");
const ChannelModel = require("./model/chat/channel");
// DB Connection :
require("./config/connection");

// Inits :
const app = express();
const PORT = process.env.PORT || 4000;





const server = http.createServer(app);
const io = require('socket.io')(server, {
   cors: {
      origin: '*',
   },
});


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));
app.get("/", (req, res, next) => {
   res.sendFile(path.join(__dirname, "/views", "Welcome.html"));
})
app.use("/api", router);
app.use(notFound);
app.use(errorHandler);


server.listen(PORT, () => console.log(`Server is started at http://localhost:${PORT}`));



// SOCKETS :
io.on('connection', (socket) => {
   console.log('User connected with ID: ', socket.id);

   socket.on('joinChannel', (channel) => {
      try {
         channel.forEach((channel) => {
            socket.join(channel);
            console.log('Channel joined');
         });
      } catch (e) {
         console.log('error: ' + e);
      }
   });

   socket.on('joinUserRoom', (user_id) => {
      try {
         socket.join(user_id);
         console.log('user room joined');
      } catch (e) {
         console.log('error: ' + e);
      }
   });

   socket.on('pong', function (data) {
      console.log('Pong received from client');
   });

   socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
   });


   socket.on('readMessage', async (channel_id) => {
      await MessageModel.updateMany(
         { channel_id: channel_id, status: 'unread' },
         { status: 'read' },
      );
      io.to(channel_id).emit('allMessageRead');
   });

   socket.on('messagesSeen', async (channel_id, messages) => {
      io.to(channel_id).emit('messagesSeenUpdated', messages);
   });

   socket.on('disconnect', () => {
      socket.removeAllListeners();
      console.log('User disconnected');
   });
});



MessageModel.watch().on('change', async (data) => {
   if (data?.operationType === 'insert') {
      const channel_id = data?.fullDocument.channel_id;
      const message = await MessageModel.findById(data?.fullDocument._id).populate("senderData")
      // const message = data?.fullDocument;

      const channel = await ChannelModel.findByIdAndUpdate(
         message?.channel_id,
         { hasUnreadMessage: true, latestMessage: new Date() },
         { new: true },
      )
         .populate({
            path: 'users',
         })
         .populate({
            path: 'users',
         });

      io.emit('newMessage', message, channel);
   }
});