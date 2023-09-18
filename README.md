# gptConnector

Ready-to-use code snippet for communicating with GPT. Update the `apiConfig.json` with your own key and api.

## Sample GPT contract

A standard conversation based ChatGPT flow looks like bellow:

```
<|im_start|>system
#Instructions
##You are a helpful AI Assistant
<|im_end|>
<|im_start|>assistant
AI: How can I help you?<|im_end|>
<|im_start|>user
User: Tell me about TypeScript in a short message.<|im_end|>
<|im_start|>assistant
AI: TypeScript is a statically-typed superset of JavaScript that adds optional types, classes, and other features to JavaScript. It is designed to make large-scale JavaScript applications more manageable and easier to maintain.<|im_end|>
<|im_start|>user
User:
```
