// HTML email template
const invitationTemplate = (
  subject,
  text,
  eventId,
  eventTitle,
  guestName,
  brideName,
  groomName,
  startDate,
  startTime,
  place,
  alert
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            margin-bottom: 20px;
        }
        h1 {
            color: #2c3e50;
        }
        p {
            color: #555555;
            font-size: 16px;
            text-align: justify;
            margin-bottom: 15px;
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            border: 2px solid #3498db;
            box-shadow: 2px 2px 5px #888888;
            margin-top: 30px;
        }
        .event-title-container {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            margin-bottom: 10px;
        }
        .event-title {
            font-size: 24px;
            margin: 0;
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="event-title-container">
        <p class="event-title">${eventTitle}</p>
    </div>
    <header>
        <h1>${subject}</h1>
    </header>

    <div style="padding: 20px;">
        <p>Hi ${guestName},</p>
        <p>${brideName} and ${groomName} are tying the knot! We want you to be a part of our special day. Your presence would mean a lot to us as we take this big step together. Looking forward to sharing this joyful moment with you.</p>
        <p>Date: ${startDate}</p>
        <p>Time: ${startTime}</p>
        <p>Place: ${place}</p>
        <p>We're planning a day filled with love and laughter, and we'd love for you to join us. Please let us know if you can make it by ${startDate} ${startTime}.</p>
        <a href="${process.env.INVITATION_URL}/${eventId}#rsvp" style="text-decoration: none;">Accept Invitation</a>

        <p>After accepting the invitation, kindly provide your travel details <a href="${process.env.TRAVEL_DETAIL_URL}/${eventId}">here</a>.</p>

        <p>Best, ${brideName} and ${groomName}</p>

    </div>
</body>
</html>
`;

module.exports = { invitationTemplate };
