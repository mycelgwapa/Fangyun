const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

  // Log the uptime to the console
  console.log(`Uptime: ${uptimeString}`);

    res.sendFile(__dirname + '/public/index.html');
  });


module.exports = app; 