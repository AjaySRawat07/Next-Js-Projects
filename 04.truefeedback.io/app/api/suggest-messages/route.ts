import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return Response.json(
                {
                    success: false,
                    message: "Gemini API key is not configured in environment variables",
                },
                { status: 500 }
            );
        }

        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What\'s a hobby you\'ve recently started?||If you could have dinner with any historical figure, who would it be?||What\'s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const ai = new GoogleGenAI({ apiKey });

        const candidateModels = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-2.5-pro"];

        let responseStream = null;
        let lastError = null;

        for (const model of candidateModels) {
            try {
                responseStream = await ai.models.generateContentStream({
                    model,
                    contents: prompt,
                });
                if (responseStream) break;
            } catch (err) {
                lastError = err;
            }
        }

        if (!responseStream) {
            throw lastError || new Error("Failed to generate response stream from Gemini");
        }

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of responseStream) {
                        if (chunk.text) {
                            controller.enqueue(encoder.encode(chunk.text));
                        }
                    }
                } catch (streamError) {
                    controller.error(streamError);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error: any) {
        console.error("Error generating suggestions with Gemini:", error);
        return Response.json(
            {
                success: false,
                message: error?.message || "Internal server error while generating suggestions",
            },
            { status: 500 }
        );
    }
}

