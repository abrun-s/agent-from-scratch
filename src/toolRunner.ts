import type OpenAI from 'openai'
import { generateImageToolDefinition } from './tools/generateImage'
import { dadJokeToolDefinition } from './tools/dadjoke'
import { redditToolDefinition } from './tools/reddit'



export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'generate_image':
      const image = await generateImageToolDefinition(input)
      return image

    case 'dad_joke':
      return dadJokeToolDefinition(input)

    case 'reddit':
      return redditToolDefinition(input)

    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
