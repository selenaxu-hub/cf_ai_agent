import { routeAgentRequest, type Schedule } from "agents";
import { getSchedulePrompt } from "agents/schedule";
import { AIChatAgent } from "agents/ai-chat-agent";
import {
  generateId,
  streamText,
  type StreamTextOnFinishCallback,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ToolSet
} from "ai";
import { openai } from "@ai-sdk/openai";
import { processToolCalls, cleanupMessages } from "./utils";
import { tools, executions } from "./tools";

const model = openai("gpt-4o-mini");

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 */
export class Chat extends AIChatAgent<Env> {
  /**
   * Handles incoming chat messages and manages the response stream
   */
  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    _options?: { abortSignal?: AbortSignal }
  ) {
    console.log('Processing message, current messages:', this.messages.length);
    
    const allTools = {
      ...tools,
      ...this.mcp.getAITools()
    };

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        try {
          const cleanedMessages = cleanupMessages(this.messages);
          console.log('Cleaned messages:', cleanedMessages.length);

          const processedMessages = await processToolCalls({
            messages: cleanedMessages,
            dataStream: writer,
            tools: allTools,
            executions
          });

          console.log('Processed messages:', processedMessages.length);

          const systemPrompt = `You are a helpful AI assistant created by Cloudflare. 

Current date and time: ${new Date().toISOString()}

You can:
- Answer questions and have conversations
- Help with various tasks
- Use tools when needed (calculator, scheduling, etc.)

Be friendly, helpful, and conversational. Give complete, thoughtful responses.

${getSchedulePrompt({ date: new Date() })}`;

          console.log('Starting streamText...');

          const result = streamText({
            system: systemPrompt,
            messages: convertToModelMessages(processedMessages),
            model,
            tools: allTools,
            temperature: 0.7,
            maxTokens: 1000,
            onFinish: onFinish as unknown as StreamTextOnFinishCallback<typeof allTools>
          });

          console.log('Merging stream...');
          writer.merge(result.toUIMessageStream());
          
        } catch (error) {
          console.error('Error in onChatMessage:', error);
        }
      }
    });

    return createUIMessageStreamResponse({ stream });
  }

  async executeTask(description: string, _task: Schedule<string>) {
    await this.saveMessages([ 
      ...this.messages,
      {
        id: generateId(),
        role: "user",
        parts: [
          {
            type: "text",
            text: `Running scheduled task: ${description}`
          }
        ],
        metadata: {
          createdAt: new Date()
        }
      }
    ]);
  }
}

/**
 * Worker entry point that routes incoming requests to the appropriate handler
 */
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/check-open-ai-key") {
      const hasOpenAIKey = !!env.OPENAI_API_KEY;
      console.log('API Key check:', hasOpenAIKey);
      return Response.json({
        success: hasOpenAIKey
      });
    }
    
    if (!env.OPENAI_API_KEY) {
      console.error(
        "OPENAI_API_KEY is not set, don't forget to set it locally in .dev.vars, and use `wrangler secret bulk .dev.vars` to upload it to production"
      );
    }
    
    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }
} satisfies ExportedHandler<Env>;