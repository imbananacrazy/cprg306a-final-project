import { NextResponse } from "next/server";

//api route. allows code on the client to securely access private api keys without exposing them.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const apiKey = process.env.NUTRITION_API_KEY;
  //.env.local nutrition api key. .env.local is hidden and cannot be seen on the client unless variable is marked with the prefix 'NEXT_PUBLIC'.

  try {
    const response = await fetch(
      //retrieves data provided by this url.
      // url will not return data unless api is provided
      `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
      {
        headers: {
          //api key provided by calorie ninjas.
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
