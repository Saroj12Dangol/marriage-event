// HTML email template
const dayInfoTemplate = (subject, text, link) => `
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
            color: #555555;
            font-size: 16px;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .event-card {
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #fff;
        }
        .day-title {
            font-size: 20px;
            color: #2c3e50;
        }
        .event-description {
            color: #555555;
        }
        .event-location {
            font-style: italic;
            color: #888888;
        }
        .event-date-time {
            font-weight: bold;
            color: #3498db;
        }
        .event-title-container {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
        }
        .event-title {
            font-size: 24px;
            margin: 0;
            color:#fff
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
        <p>${text}</p>
        ${days
          .map(
            (day) => `
            <div class="event-card">
                <div class="day-title">${day.title}</div>
                <div class="event-description">${day.description}</div>
                <div class="event-location">${day.location}</div>
                <div class="event-date-time">${new Date(
                  day.dateTime
                ).toLocaleString()}</div>
            </div>
        `
          )
          .join("")}
    </div>
</body>
</html>
`;

module.exports = { dayInfoTemplate };
