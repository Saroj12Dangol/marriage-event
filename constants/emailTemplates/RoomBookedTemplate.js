const moment = require("moment");

// HTML email template for room booking confirmation
const RoomBookedTemplate = (
  subject,
  guestName,
  room,
  hotel,
  checkInDate,
  checkOutDate,
  eventTitle
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
        }
        h1 {
            color: #2c3e50;
        }
        p {
            color: #000;
            font-size: 16px;
            line-height: 1.6;
        }
        .booking-details-container {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
        }
        .booking-details {
            font-size: 18px;
            margin: 0;
            color:#fff
        }
    </style>
</head>
<body>
    <div class="booking-details-container">
        <p class="booking-details">${eventTitle}</p>
    </div>
    <div style="padding: 20px;">
        <p>Dear ${guestName},</p>
        <p>We are delighted to inform you that your reservation for room ${room} at ${hotel} has been successfully confirmed.</p>
        <p>Check-in Date: ${moment
          .utc(checkInDate)
          .format("dddd, MMMM D, YYYY, h:mm A")}</p>
        <p>Check-out Date: ${moment
          .utc(checkOutDate)
          .format("dddd, MMMM D, YYYY, h:mm A")}</p>
        <p>If you have any inquiries, please do not hesitate to contact our dedicated support team through the <a href="${
          process.env.INVITATION_URL
        }">indha.com.au</a>.</p>
    </div>
</body>
</html>
`;

module.exports = { RoomBookedTemplate };
