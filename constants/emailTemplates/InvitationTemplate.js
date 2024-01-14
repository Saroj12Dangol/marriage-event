// HTML email template
const invitationTemplate = (
  subject = "Invitation to Celebrate Medha and Inderpreet's Wedding!",
  eventTitle,
  guestName,
  brideName,
  groomName
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
 

    <div style="padding: 20px;">
        <p>Dear ${guestName},</p>

        
        <p>
        We hope this message finds you well. Exciting news – ${brideName} and ${groomName} are taking the plunge into marital bliss! In celebrating this joyous occasion, we would be honored to have you join us on our special day. Your presence holds great significance for us as we embark on this remarkable journey together.
        </p>
        <p>Save the Date: 7th March to 9th March</p>
        <p>Venue: Godavari Resort, Kathmandu</p>
        <p>
        Our wedding promises to be a beautiful blend of love and laughter, and we sincerely wish for you to be a part of the festivities. Kindly let us know by 20th January 2024 if you can share in this joyous moment with us.</p>
        <p>

        Please confirm your attendance and provide your RSVP along with travel details via our dedicated website: <a href="${process.env.INVITATION_URL}">www.indha.com.au</a>
        </p>

        <br/>
        <p>
        To ensure your convenience, we would also appreciate it if you could provide your travel details on our website. This will assist us in arranging for your airport transportation, making your journey to and from the celebration as seamless as possible.
        </p>

        <p>
        Looking forward to celebrating this joyous occasion with you!
        </p>


        <p>Warm regards</p>
        <p>${brideName} and ${groomName}</p>

    </div>
</body>
</html>
`;

module.exports = { invitationTemplate };
