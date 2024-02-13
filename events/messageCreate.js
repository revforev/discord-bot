const { Events } = require('discord.js');
const OpenAI = require("openai");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            // Don't respond to messages sent by bots
            if (message.author.bot) return;

            // Get the content of the user's message
            const userInput = message.content;

            // Construct the messages array
            const messages = [
                {
                    role: "user",
                    content: userInput,
                },
                // Add a message containing the word 'json'
                {
                    role: "system",
                    content: "JSON",
                }
            ];

            // Make a request to the OpenAI chat API
            const completion = await openai.chat.completions.create({
                messages: messages,
                model: "gpt-3.5-turbo-0125",
                response_format: { type: "json_object" }, // Specify the response format as an object
            });

            // Get the JSON response
            const jsonResponse = JSON.parse(completion.choices[0].message.content);

            // Format the JSON with indentation for better readability
            const formattedResponse = JSON.stringify(jsonResponse, null, 2);

            // Reply to the message with the formatted JSON
            message.reply(formattedResponse);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            message.reply('There was an error processing your request.');
        }
    }
};
