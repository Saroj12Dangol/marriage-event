// TODO: for using .env
const dotEnvConfig = require("dotenv").config();

// TODO: import the environment variables
const PORT = process.env.PORT;
const HOST = process.env.HOST_DEV;

// TODO: package imports==============

const express = require("express"); //Import Express

const cors = require("cors");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

var cron = require("node-cron");

// TODO: package imports--=======================

// TODO: import routes ============
const { CoupleRouter } = require("./src/Couple/routes/CoupleRoutes");
const { EventRouter } = require("./src/Event/routes/EventRoutes");
const { updateStatusEvent } = require("./src/Event/model/EventModel");
const { AgencyRouter } = require("./src/Agency/routes/AgencyRoutes");
const { MediaRouter } = require("./src/Media/routes/MediaRoutes");
const { MemoriesRouter } = require("./src/Memories/routes/MemoriesRoute");
const { GuestRouter } = require("./src/Guest/routes/GuestRoutes");
const { TeamRouter } = require("./src/Team/routes/TeamRoutes");
const { EmailRouter } = require("./src/Notification_Emails/routes/EmailRoutes");
const { DaysRouter } = require("./src/Days/routes/DaysRoutes");
const {
  CloseFriendsRouter,
} = require("./src/CloseFriends/routes/CloseFriendsRoutes");
const { LoveStoryRouter } = require("./src/LoveStory/routes/LoveStoryRoutes");
const {
  TravelRouter,
} = require("./src/TravelDetails/routes/TravelDetailRoutes");
const { FaqRouter } = require("./src/Faqs/routes/FaqRoutes");
const {
  ContactRouter,
} = require("./src/EmergencyContact/routes/ContactRoutes");
const { AuthRouter } = require("./src/Auth/routes/AuthRoutes");

// ==============

const app = express(); // create instance of express()

app.use(bodyParser.json());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

// TODO: cors error
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
  })
);

// TODO: connect to mongodb
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Successfully connected to ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message, "error", process.env.DB);
  });

// TODO: routes
app.use("/v1/couple", CoupleRouter);
app.use("/v1/event", EventRouter);
app.use("/v1/agency", AgencyRouter);
app.use("/v1/media", MediaRouter);
app.use("/v1/memories", MemoriesRouter);
app.use("/v1/guest", GuestRouter);
app.use("/v1/team", TeamRouter);
app.use("/v1/notification", EmailRouter);
app.use("/v1/days", DaysRouter);
app.use("/v1/love-story", LoveStoryRouter);
app.use("/v1/friends", CloseFriendsRouter);
app.use("/v1/travel", TravelRouter);
app.use("/v1/faq", FaqRouter);
app.use("/v1/contact", ContactRouter);
app.use("/v1/auth", AuthRouter);

app.get("/v1", (req, res) => {
  res.send("Welcome to marriage event management");
});

cron.schedule("0 0 * * *", () => {
  updateStatusEvent();
});
