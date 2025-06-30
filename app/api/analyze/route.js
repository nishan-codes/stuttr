// import OpenAI from 'openai';
import { GoogleGenAI, Type } from '@google/genai'; // NEW

export const config = {
  api: {
    bodyParser: false,  // Disable body parsing to handle file uploads
  }
}

// const openai = new OpenAI({
//   apiKey: process.env.API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
// });

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
}); // NEW

export const POST = async (req) => {

  try {
    const formData = await req.formData();
    const file = formData.get('csvFile');

    if (!file) {
      return new Response(JSON
        .stringify({ error: 'No file uploaded' }),
        { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const csvData = Buffer.from(arrayBuffer).toString('utf-8');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
           You are a professional game performance analyst. Analyze the following CSV log of game performance metrics. Identify causes of lag or stutter.

             \`\`\`csv
             ${csvData.slice(0, 5000)}  // Limit input size to first 5000 chars
            \`\`\`
             `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: {
              type: Type.NUMBER
            },
            status: {
              type: Type.STRING,
              enum: ["excellent", "good", "fair", "poor"],
            },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.STRING
                  },
                  title: {
                    type: Type.STRING
                  },
                  description: {
                    type: Type.STRING
                  },
                  severity: {
                    type: Type.STRING,
                    enum: ["low", "medium", "high"],
                  },
                  category: {
                    type: Type.STRING
                  },
                  impact: {
                    type: Type.STRING
                  },
                }
              }
            },
            metrics: {
              type: Type.OBJECT,
              properties: {
                averageFps: {
                  type: Type.NUMBER
                },
                frameTimeVariance: {
                  type: Type.NUMBER
                },
                memoryUsage: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.NUMBER
                  },
                },
                cpuUsage: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.NUMBER
                  },
                },
                fps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.NUMBER
                  },
                },
                timestamps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.NUMBER,
                    description: "ISO 8601 format",
                  },
                },
                lagSpikes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      timestamp: { type: Type.NUMBER },
                      duration: {
                        type: Type.NUMBER
                      },
                      severity: {
                        type: Type.NUMBER,
                        minimum: 0,
                        maximum: 10
                      },
                    },
                  },
                },
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.STRING
                  },
                  title: {
                    type: Type.STRING
                  },
                  description: {
                    type: Type.STRING
                  },
                  priority: {
                    type: Type.STRING,
                    enum: ["low", "medium", "high"],
                  },
                  category: {
                    type: Type.STRING
                  },
                  icon: {
                    type: Type.STRING
                  },
                  learnmore: {
                    type: Type.STRING,
                    description: "Valid link to a real website related to the recommendation or issue"
                  },
                },
              },
            },
          }
        }
      }
    });

    const completion = response.candidates[0].content.parts[0].text;
    console.log(completion);

    return new Response(completion, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(JSON.stringify({ error: 'Error processing file' }), { status: 500 });
  }
}