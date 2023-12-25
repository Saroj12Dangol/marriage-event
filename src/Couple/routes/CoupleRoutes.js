const express = require("express");
const {
  FetchCoupleController,
  CreateCoupleController,
  FetchCoupleByIdController,
} = require("../controllers/CoupleController");
const { upload } = require("../../../utils/ImageUpload");
const IsAdmin = require("../../../middlewares/AdminProtect");

const CoupleRouter = express.Router();

// TODO: post couple controller============
CoupleRouter.post(
  "/:eventId",
  IsAdmin,
  upload.fields([{ name: "brideImages" }, { name: "groomImages" }]),
  CreateCoupleController
);
// =========

// TODO: get couple Router

CoupleRouter.get("/", IsAdmin, FetchCoupleController);

// ===========

// TODO: get couple Router

CoupleRouter.get("/detail/:coupleId", IsAdmin, FetchCoupleByIdController);
// ===========

module.exports = { CoupleRouter };
