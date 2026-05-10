import { NextResponse } from "next/server";
import { createPrediction } from "@/lib/data";
import type { Prediction } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Prediction, "id">;
    const prediction = await createPrediction(body);
    return NextResponse.json({ prediction });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create prediction." },
      { status: 400 },
    );
  }
}
