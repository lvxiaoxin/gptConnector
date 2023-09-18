import openAIConfig from "./apiConfig.json";
import fetch from "node-fetch";

/**
 * Method to get the response from the GPT API
 * @param input The input from the user
 * @returns The response from the GPT API
 */
export const getGPTResponse = async (input: string): Promise<string> => {
    updateMessage(input);
    const response = await fetch(openAIConfig.endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": `${openAIConfig.apiKey}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 2000,
            temperature: 0.2
        }),
    });

    if (!response.ok) {
        prompt = conversationStartPrompt;
        return "Max token reached. We will clear the conversation history and start over.";
    }

    const responseJson = await response.json();
    const answer = responseJson.choices[0].text.trim();
    updateMessage(answer, true);
    console.log(answer);
    return answer.replace(/<\|im_start\|>/g, "").replace(/<\|im_end\|>/g, "");
}

/**
 * Method to update the prompt with latest conversation
 * @param intput the message to be added to the prompt
 * @param isBotInput whether the message is from the bot or the user
 */
const updateMessage = (intput: string, isBotInput: boolean = false): void => {
    prompt += `${intput} \n<|im_end|>\n${isBotInput ? "<|im_start|>user\nUser:" : "<|im_start|>assistant\nAI:"}: `;
}

/**
 * Pre-define system prompt for your scenario
 */
const systemPrompt = `You are a helpful AI Assistant, and your job is to help users to ... \n\n`;

/**
 * The start of the conversation prompt
 */
const conversationStartPrompt = `<|im_start|>system\n ${systemPrompt}<|im_end|>\n`
    + `<|im_start|>user\nUser:`;

/**
 * Global storage for the conversation. The prompt will be updated with the latest conversation.
 */
let prompt = conversationStartPrompt;