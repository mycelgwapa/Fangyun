const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../database/config.json');

// Load current config
const loadConfig = () => {
    const configData = fs.readFileSync(configPath);
    return JSON.parse(configData);
};

// Save updated config
const saveConfig = (data) => {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
};

const setRole = (bot) => {
    bot.command('setRole', (ctx) => {
        // Check if the user is the owner
        if (ctx.from.id.toString() !== ctx.bot.config.ownerId) {
            return ctx.reply('Only the owner can set roles.');
        }

        const args = ctx.message.text.split(' ').slice(1);
        if (args.length !== 2) {
            return ctx.reply('Usage: /setRole <user_id> <role(admin|moderator)>');
        }

        const userId = args[0];
        const role = args[1].toLowerCase();

        if (!['admin', 'moderator'].includes(role)) {
            return ctx.reply('Role must be either "admin" or "moderator".');
        }

        // Load the current config
        const config = loadConfig();

        // Add user ID to the specified role
        if (!config.roles[role].includes(userId)) {
            config.roles[role].push(userId);
            saveConfig(config);
            ctx.reply(`User with ID ${userId} has been assigned as a ${role}.`);
        } else {
            ctx.reply(`User with ID ${userId} is already a ${role}.`);
        }
    });
};

console.log('shitsrunning');

module.exports = setRole;
