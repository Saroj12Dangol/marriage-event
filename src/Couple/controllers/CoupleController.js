// TODO: create Bride's profile

const moment = require("moment");
const { CreateCoupleService } = require("../services/CreateCoupleService");
const { FetchCoupleService } = require("../services/FetchCoupleService");
const { populateFunctionality } = require("../../../utils/Populate");
const {
  FetchCoupleByIdService,
} = require("../services/FetchCoupleByIdService");

const CreateCoupleController = async (req, res) => {
  const { eventId } = req.params;

  console.log(eventId);
  // TODO: data validation ===========

  // Check if all required fields are present
  const requiredFields = [
    "brideName",
    "groomName",
    "brideAge",
    "groomAge",
    "brideAddress",
    "groomAddress",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Check if at least one bride or groom image is provided
  if (!req.files?.brideImages || !req.files?.groomImages) {
    return res.status(400).json({
      success: false,
      error: "At least one bride or groom image is required",
    });
  }

  // TODO: ==========\

  CreateCoupleService(
    {
      brideName: req.body.brideName,
      groomName: req.body.groomName,
      brideAge: req.body.brideAge,
      groomAge: req.body.groomAge,
      brideAddress: req.body.brideAddress,
      groomAddress: req.body.groomAddress,
      groomFB: req.body.groomFB,
      groomInsta: req.body.groomInsta,
      brideInsta: req.body.brideInsta,
      brideFB: req.body.brideFB,
    },
    {
      files: req.files,
    },
    eventId,
    res
  );

  // return res.status(200).json({
  //   data: { ...req.body, couple: parsedCouple },
  // });
};

// TODO: get the data of couple
const FetchCoupleController = async (req, res) => {
  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }
  FetchCoupleService(req, res, populateObj);
};

// TODO: fetch couple detail

const FetchCoupleByIdController = async (req, res) => {
  const { coupleId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }
  FetchCoupleByIdService(coupleId, res, populateObj);
};

module.exports = {
  CreateCoupleController,
  FetchCoupleController,
  FetchCoupleByIdController,
};
