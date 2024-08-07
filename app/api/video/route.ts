import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!replicate.auth) {
      return new NextResponse("API key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Messages are required ", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has ended", { status: 403 });
    }
    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt: prompt,
      guidance_scale: 17.5,
      negative_prompt:
        "very blue, dust, noisy, washed out, ugly, distorted, broken",
    };

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    toast.error("Something went wrong");
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
