const db = require('../db');

module.exports = (msg, bot) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Only for private chats
    if (msg.chat.type === 'private') {
        // Check if user is the owner or admin
        db.get('SELECT role FROM users WHERE user_id = ?', [userId], (err, row) => {
            if (err) {
                bot.sendMessage(chatId, 'An error occurred while checking your role.');
                return;
            }

            if (row) {
                if (msg.text.startsWith('/help')) {
                    handleHelpCommand(chatId, userId, bot);
                } else if (msg.text.startsWith('/admin')) {
                    handleAdminCommand(chatId, userId, bot);
                } else if (msg.text.startsWith('/owner')) {
                    handleOwnerCommand(chatId, userId, bot);  // Add owner command here
                } else {
                    bot.sendMessage(chatId, 'Command not recognized.');
                }
            } else {
                bot.sendMessage(chatId, 'You are not registered in the system.');
            }
        });
    }
};

// Function to handle /help command
const handleHelpCommand = (chatId, userId, bot) => {
    db.get('SELECT role FROM users WHERE user_id = ?', [userId], (err, row) => {
        if (err) {
            bot.sendMessage(chatId, 'An error occurred while fetching your role.');
            return;
        }

        let helpText = `
        Welcome to the bot! Here are the commands you can use:
        /start - Start interacting with the bot
        /help - Show this help message
        `;

        if (row && row.role === 'admin') {
            helpText += `
            Admin Commands:
            /assignrole - Assign roles to users
            /admin - Admin specific commands
            `;
        }

        if (row && row.role === 'owner') {
            helpText += `
            Owner Commands:
            /assignrole - Assign roles to users
            /admin - Admin specific commands
            /owner - Owner specific commands
            `;
        }

        bot.sendMessage(chatId, helpText);
    });
};

// Function to handle /admin command
const handleAdminCommand = (chatId, userId, bot) => {
    db.get('SELECT role FROM users WHERE user_id = ?', [userId], (err, row) => {
        if (err || !row || (row.role !== 'admin' && row.role !== 'owner')) {
            bot.sendMessage(chatId, 'You do not have permission to use admin commands.');
            return;
        }

        bot.sendMessage(chatId, 'Admin specific commands: /assignrole, /admin');
    });
};

// Function to handle /owner command
const handleOwnerCommand = (chatId, userId, bot) => {
    db.get('SELECT role FROM users WHERE user_id = ?', [userId], (err, row) => {
        if (err || !row || row.role !== 'owner') {
            bot.sendMessage(chatId, 'You do not have permission to use owner commands.');
            return;
        }

        bot.sendMessage(chatId, 'Owner specific commands: /assignrole, /admin, /owner');
    });
};
