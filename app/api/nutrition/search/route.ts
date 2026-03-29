import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const apiKey = process.env.NUTRITION_API_KEY;

  console.log("Server received query: " + query);

  if (!query) {
    return NextResponse.json({ success: false, data: [] });
  }

  try {
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey || "",
        },
      },
    );

    const data = await response.json();

    return NextResponse.json({ success: true, data: data.items });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
