import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const defaultMessage = {
  role: "system",
  content:
    "You are a code generator. You provide code for any language. Code should be written in markdown well fomatted. Use code comments for explanations",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    if (!openai.apiKey) {
      return new NextResponse("API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required ", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [defaultMessage, ...messages],
    });

    console.log(response.choices[0]);
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
