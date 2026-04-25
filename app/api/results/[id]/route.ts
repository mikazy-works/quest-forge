import { NextResponse } from "next/server";
import { getDiagnosisResultById } from "@/lib/data";

export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  const result = await getDiagnosisResultById(id);

  if (!result) {
    return NextResponse.json({ error: "結果が見つかりません。" }, { status: 404 });
  }

  return NextResponse.json(result);
}
