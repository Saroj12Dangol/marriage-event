// HTML email template
const TravelDetailTemplate = (
  subject = "Invitation to Celebrate Medha and Inderpreet's Wedding!",
  eventTitle,
  guestName,
  brideName,
  groomName,
  eventId
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
        <p>We hope this message finds you well. ${brideName} and ${groomName} are thrilled to announce their upcoming wedding, and we would be honoured to have you share in the joy of our special day.</p>
        <p>If you haven't already, kindly send travel detail through our website at <a href="${process.env.INVITATION_URL}/${eventId}">www.indha.com.au</a> Your prompt response would be greatly appreciated. </p>
       
        <br/>
        <p>To ensure your convenience, we would also appreciate it if you could provide your travel details on our website. This will assist us in arranging for your airport transportation, making your journey to and from the celebration as seamless as possible.</p> 
    
        <p>
        Looking forward to celebrating this joyous occasion with you!
        </p>


        <p>Warm regards</p>
        <p>${brideName} and ${groomName}</p>

    </div>
</body>
</html>
`;

module.exports = { TravelDetailTemplate };
