// HTML email template
const confirmationTemplate = (
  eventId,
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
Thank you for accepting the invitation.
</p>

    <p>Now second step, please fill your travel information by clicking on <a href="${process.env.TRAVEL_DETAIL_URL}/${eventId}">Send travel detail</a>. 
    </p>
    <p>
    If you have not already booked your flight, don't worry, we will send you a reminder email for travel detail in few days  
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

module.exports = { confirmationTemplate };
