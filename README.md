# cf_ai_agent

A comprehensive AI-powered chat agent built on Cloudflare's infrastructure, demonstrating advanced workflow coordination, real-time communication, and intelligent tool integration.

## Features

### Core Requirements Implementation

- **LLM Integration**: OpenAI GPT-4 with fallback to Cloudflare Workers AI
- **Workflow Coordination**: Durable Objects for persistent state management and complex workflow orchestration
- **Dual Input Methods**: Text chat interface with voice-to-text input capability
- **Memory & State**: Persistent conversation history and context retention across sessions

### Advanced Capabilities

- **Real-time Communication**: WebSocket-based streaming responses
- **Tool Integration**: Calculator, time queries, text analysis, and project planning tools
- **Voice Input**: Browser-based speech recognition with visual feedback
- **Workflow Visualization**: Real-time display of processing steps and coordination
- **Responsive UI**: Dark/light mode with modern, accessible design
- **Error Handling**: Comprehensive error recovery and user feedback

## Architecture

### Frontend

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Phosphor React icon library

### Backend

- **Runtime**: Cloudflare Workers with Durable Objects
- **AI Framework**: Cloudflare Agents SDK
- **State Management**: Durable Objects for persistent, distributed state
- **Communication**: WebSocket connections for real-time interactions

### AI & Tools

- **Primary LLM**: OpenAI GPT-4o-mini for cost-effective, fast responses
- **Tool System**: Extensible tool framework with human-in-the-loop confirmations
- **Workflow Engine**: Built-in scheduling and task orchestration

## Local Development

### Prerequisites

- Node.js 18+ installed
- Cloudflare account (free tier sufficient)
- OpenAI API key (optional - can use Cloudflare AI)

### Setup Instructions

1. **Clone and Install**

   ```bash
   git clone [your-repository-url]
   cd cf_ai_agent
   npm install
   ```

2. **Environment Configuration**
   Create a `.dev.vars` file in the project root:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1 - Frontend development server
   npm start

   # Terminal 2 - Backend Workers development server
   npx wrangler dev
   ```

4. **Access the Application**
   Open your browser to `http://localhost:8787`

### Testing the Features

**Text Chat:**

- Type any message and observe real-time streaming responses
- Try complex queries that trigger tool usage
- Test conversation memory by referencing previous messages

**Voice Input:**

- Click the microphone button (allow browser permission)
- Speak clearly and observe speech-to-text conversion
- Voice input populates the text field for editing before sending

**Workflow Visualization:**

- Send any message to see the workflow coordination display
- Observe the step-by-step processing visualization
- Notice how different tools and processes coordinate

**Tool Demonstrations:**

- "What's 15 \* 23?" (calculator tool)
- "What time is it in Tokyo?" (time tool)
- "Analyze this text: [paste text]" (text analysis)
- "Create a task called 'Submit project'" (project planning)

## Deployment

### Production Deployment

1. **Set Production Secrets**

   ```bash
   wrangler secret bulk .dev.vars
   ```

2. **Deploy to Cloudflare**

   ```bash
   wrangler deploy
   ```

3. **Access Your Live Application**
   Your app will be available at: `https://cf-ai-agent.[your-subdomain].workers.dev`

### Deployment Verification

- Verify all features work in production
- Test voice input across different browsers
- Confirm persistent state across sessions
- Validate tool integrations function correctly

## Project Structure

```
cf_ai_agent/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── VoiceInput.tsx   # Voice recognition component
│   │   └── WorkflowStatus.tsx # Workflow visualization
│   ├── app.tsx              # Main chat interface
│   ├── server.ts            # AI agent backend logic
│   ├── tools.ts             # Tool definitions and implementations
│   └── styles.css           # Global styles
├── wrangler.jsonc           # Cloudflare Workers configuration
├── package.json             # Dependencies and scripts
├── README.md               # This documentation
└── PROMPTS.md              # AI assistance documentation
```

## Technical Highlights

### Performance Optimizations

- **Edge Computing**: Runs on Cloudflare's global edge network
- **Streaming Responses**: Real-time AI response streaming
- **Efficient State Management**: Minimized round-trips through smart caching
- **Responsive Design**: Optimized for various screen sizes and devices

## Browser Compatibility

- **Voice Input**: Chrome, Edge, Safari (latest versions)
- **Chat Interface**: All modern browsers
- **WebSocket Support**: Universal modern browser support

## License

MIT License - See LICENSE file for details
