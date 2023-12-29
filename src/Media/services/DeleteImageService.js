const CloseFriendsModel = require("../../CloseFriends/model/CloseFriendsModel");
const CoupleModel = require("../../Couple/model/CoupleModel");
const DaysModel = require("../../Days/model/DaysModel");
const { EventModel } = require("../../Event/model/EventModel");
const LoveStoryModel = require("../../LoveStory/model/LoveStoryModel");
const MemoriesModel = require("../../Memories/model/MemoriesModel");
const TravelDetailModel = require("../../TravelDetails/model/TravelDetailModel");
const MediaModel = require("../model/MediaModel");

const DeleteImageService = async (imageId, res, fromDeleteImage = true) => {
  try {
    const image = await MediaModel.findById(imageId);
    if (!image) {
      return res.status(404).json({
        message: `Image ${imageId} is not found`,
      });
    } else {
      await MediaModel.deleteOne({ _id: imageId });
      // Remove references from CoupleModel
      await CoupleModel.updateMany(
        { $or: [{ brideImages: imageId }, { groomImages: imageId }] },
        { $pull: { brideImages: imageId, groomImages: imageId } }
      );

      // Remove references from travel detail Model
      await TravelDetailModel.updateMany(
        { $or: [{ ticketImage: imageId }] },
        { $pull: { ticketImage: imageId } }
      );

      // Remove references from event Model
      await EventModel.updateMany(
        { $or: [{ backgrounds: imageId }] },
        { $pull: { backgrounds: imageId } }
      );

      await CloseFriendsModel.updateMany(
        { $or: [{ image: imageId }] },
        {
          $unset: {
            image: "",
          },
        }
      );

      await DaysModel.updateMany(
        { $or: [{ image: imageId }] },
        {
          $unset: {
            image: "",
          },
        }
      );

      await LoveStoryModel.updateMany(
        { $or: [{ image: imageId }] },
        {
          $unset: {
            image: "",
          },
        }
      );

      await MemoriesModel.updateMany(
        { $or: [{ images: imageId }] },
        { $pull: { images: imageId } }
      );

      if (fromDeleteImage) {
        return res.status(200).json({
          message: "Image deleted successfully",
        });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { DeleteImageService };
