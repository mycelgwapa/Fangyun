const server = require('./public/server.js');
const bot = require('./src/bot');

bot.launch()
.then(() => console.log('Bot is running...'))
.catch(err => console.error('Error launching the bot:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

server.listen(8769, () => {
  console.log(`Working at 9to5`);
});

