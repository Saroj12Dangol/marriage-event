// HTML email template
const ForgotPasswordTemplate = (subject, text, link) => `
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
   
    <header>
        <h1>${subject}</h1>
    </header>
    <div style="padding: 20px;">
        <p>${text}</p>
        <a href="${link}" style="text-decoration: none;">RESET PASSWORD</a>
    </div>
</body>
</html>
`;

module.exports = { ForgotPasswordTemplate };
