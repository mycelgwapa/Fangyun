const { Telegraf } = require('telegraf');
const config = require('../database/config.json');
const handleGreet = require('./commands/greet');
const setRole = require('./commands/setRole');


// Initialize the bot
const bot = new Telegraf(config.telegramBotToken);

// Help command
bot.command('help', (ctx) => {
    ctx.reply('Here are some commands you can use:\n---------------------------------------------- \n/start - Greet the bot\n/help - Get command list');
});

bot.command('ownerhelp', (ctx) => {
    if (ctx.from.id.toString() === config.ownerId) {
        ctx.reply('Owner Exclusive Commands:\n/ownerhelp - Get this help\n/announce - Send an announcement to all groups\n/setRole <user_id> <role(admin|moderator)> - Assign a role to a user.');
    } else {
        ctx.reply('Sorry, this command is exclusive to the owner.');
    }
});

// Register passive greeting functionality, passing the ownerId
handleGreet(bot, config.ownerId);
setRole(bot);


// Export bot
module.exports = bot;
