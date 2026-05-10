import { NextResponse } from "next/server";
import { deletePrediction, updatePrediction } from "@/lib/data";
import type { Prediction } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = (await request.json()) as Omit<Prediction, "id">;
    const { id } = await params;
    const prediction = await updatePrediction(id, body);
    return NextResponse.json({ prediction });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update prediction." },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deletePrediction(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete prediction." },
      { status: 400 },
    );
  }
}
