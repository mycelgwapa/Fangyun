const server = require('./public/server.js');

server.listen(8769, () => {
  console.log(`Working at 9to5`);
});

require('./src/app.js');