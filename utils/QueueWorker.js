const Queue = require("bull");
const { SendEmail } = require("./Email");
const redisConfig = {
  host: "localhost", // Replace with your Redis host
  port: 6379, // Replace with your Redis port
  password: "your-password", // Replace with your Redis password (if any)
};

// Create a Redis-backed queue with explicit connection details

const emailQueue = new Queue("emailQueue", { redis: redisConfig });
try {
  emailQueue.process(async (job) => {
    console.log(job, "n");

    const { to, subject, text } = job.data;
    await SendEmail(to, subject, text);
  });
} catch (error) {
  return res.status(500).json({
    message: error.message,
  });
}

module.exports = { emailQueue };
