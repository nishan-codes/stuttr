import OpenAI from 'openai';
import { config } from 'dotenv';
import fs from 'fs';

config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

async function main() {
  const csvData = fs.readFileSync('./sample.csv', 'utf8')

  const completion = await openai.chat.completions.create({
    "model": 'openai/gpt-4o',
    "messages": [
      {
        'role': 'user',
        'content': `
        You are a professional game performance analyst. Analyze the following CSV log of game performance metrics. Identify causes of lag or stutter.

        \`\`\`csv
        ${csvData.slice(0, 5000)}  // Limit input size to first 5000 chars
        \`\`\`
        `,
      },
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "lag_analysis",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "summary": {
              "type": "string",
              "description": "Detailed analysis of lag causes"
            },
            "issues": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": { "type": "string", "description": "Issue type" },
                  "detail": { "type": "string", "description": "Detailed explanation of the issue" },
                  "severity": {
                    "type": "string",
                    "enum": ["low", "medium", "high"],
                    "description": "Severity level",
                  },
                },
                "required": ["type", "detail", "severity"],
                "additionalProperties": false,
              },
            },
            "recommendations": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "Recommended actions to resolve the issues",
              },
            },
          },
          "required": ["summary", "issues", "recommendations"],
          "additionalProperties": false
        }
      },
    },
    max_tokens: 500,
    });

  console.log(completion.choices[0].message);
}

main();
