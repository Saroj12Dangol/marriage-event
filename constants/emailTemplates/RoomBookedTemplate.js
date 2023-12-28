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
            background-color: #3498db;
            color: #ffffff;
            text-align: center;
            padding: 10px;
        }
        h1 {
            color: #3498db;
        }
        p {
            color: #555555;
            font-size: 16px;
        }
        .booking-details-container {
            background-color: #3498db;
            color: #ffffff;
            text-align: center;
            padding: 10px;
        }
        .booking-details {
            font-size: 18px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="booking-details-container">
        <p class="booking-details">Booking Confirmation for ${eventTitle}</p>
    </div>
    <header>
        <h1>${subject}</h1>
    </header>
    <div style="padding: 20px;">
        <p>Hello ${guestName},</p>
        <p>Your room (${room}) at ${hotel} has been booked successfully.</p>
        <p>Check-in Date: ${checkInDate}</p>
        <p>Check-out Date: ${checkOutDate}</p>
        <p>For any inquiries, please contact our customer service.</p>
    </div>
</body>
</html>
`;

module.exports = { RoomBookedTemplate };
