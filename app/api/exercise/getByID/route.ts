import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("query");

  if (!id) {
    return NextResponse.json({ success: false, data: [] });
  }

  try {
    const response = await fetch(
      `https://exercisedb.dev/api/v1/exercises/${id}`,
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, data: [] });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
