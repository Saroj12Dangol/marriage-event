const { EventModel } = require("../../Event/model/EventModel");
const AgencyModel = require("../model/AgencyModel");

const CreateAgencyServiceFromEventService = async (req, eventId, res) => {
  try {
    // TODO: post agency in database

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found`,
      });
    }

    const emailCheckAgency = await AgencyModel.findOne({
      email: req.body.email,
    });

    if (emailCheckAgency) {
      return res.status(500).json({
        message: `${req.body.email} already exists.`,
      });
    }

    const newAgency = new AgencyModel(req.body);

    event.agency = newAgency._id;

    await newAgency.save();

    await event.save();

    newAgency.event = event._id;

    const agency = await newAgency.save();

    return res.status(200).json({
      data: agency,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateAgencyServiceFromEventService };
