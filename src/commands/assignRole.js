const db = require('../db');

const assignRoleCommand = (msg, bot) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const [command, targetUserId, newRole] = msg.text.split(' ');

    // Only allow the bot owner to assign roles
    const OWNER_ID = 6059491264; // Replace this with the actual owner ID

    if (userId !== OWNER_ID) {
        bot.sendMessage(chatId, 'You do not have permission to assign roles.');
        return;
    }

    // Validate the role
    if (newRole !== 'admin' && newRole !== 'user' && newRole !== 'owner') {
        bot.sendMessage(chatId, 'Invalid role. Available roles are: admin, user, owner.');
        return;
    }

    // Assign the role in the database
    db.run('UPDATE users SET role = ? WHERE user_id = ?', [newRole, targetUserId], function(err) {
        if (err) {
            bot.sendMessage(chatId, 'An error occurred while assigning the role.');
        } else {
            bot.sendMessage(chatId, `Role "${newRole}" has been assigned to user ${targetUserId}.`);
        }
    });
};

module.exports = assignRoleCommand;
