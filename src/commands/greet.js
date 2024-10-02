// greet.js

const handleGreet = (bot, ownerId) => {
    // Listen for new chat members in group chats
    bot.on('new_chat_members', (ctx) => {
        if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            const newMembers = ctx.message.new_chat_members;
            newMembers.forEach((member) => {
                ctx.reply(`Welcome, ${member.first_name}! We're happy to have you here.`);
            });
        }
    });

    // Listen for chat members leaving in group chats
    bot.on('left_chat_member', (ctx) => {
        if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            const member = ctx.message.left_chat_member;
            ctx.reply(`Goodbye, ${member.first_name}! We hope to see you again.`);
        }
    });

    // Handle greetings in private chat with the owner
    bot.on('message', (ctx) => {
        if (ctx.chat.type === 'private') {
            if (ctx.from.id.toString() === ownerId) {
                ctx.reply('Hello, Owner use /ownerhelp to see exclusive commands.');
            } else {
                ctx.reply('Hello! Use /help to see available commands.');
            }
        }
    });
};

module.exports = handleGreet;
