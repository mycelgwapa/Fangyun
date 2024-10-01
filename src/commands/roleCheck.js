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
                if (row.role === 'owner') {
                    bot.sendMessage(chatId, 'Hello Owner! You have full access to all commands.');
                } else if (row.role === 'admin') {
                    bot.sendMessage(chatId, 'Hello Admin! You have access to admin commands.');
                } else {
                    bot.sendMessage(chatId, 'Hello User! You have access to regular commands.');
                }
            } else {
                bot.sendMessage(chatId, 'You are not registered in the system.');
            }
        });
    } else {
        // Handle group chats or other types
        bot.sendMessage(chatId, 'This command is only available in private chats.');
    }
};
