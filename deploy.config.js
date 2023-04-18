module.exports = {
  apps: [
    {
      name: "JCWDOL00804", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8804,
      },
      time: true,
    },
  ],
};
