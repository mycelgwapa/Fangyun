const TelegramBot = require('node-telegram-bot-api');
const helpCommand = require('./commands/help');
const db = require('./db');

const token = '6764705133:AAEe2tPeaQQ6uMJiT2d2N2yxxHhXetV9rss'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Delegate message handling to helpCommand
    helpCommand(msg, bot);
});

bot.onText(/\/(start|help|admin|owner)/, (msg) => {
    helpCommand(msg, bot);
});

console.log('Bot is running...');
