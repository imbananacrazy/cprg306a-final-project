import { NextResponse } from "next/server";

//api route. allows code on the client to securely access private api keys without exposing them.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const apiKey = process.env.EXERCISE_API_KEY;
  //.env.local exercise api key. .env.local is hidden and cannot be seen on the client unless variable is marked with the prefix 'NEXT_PUBLIC'.

  try {
    const response = await fetch(
      //retrieves data provided by this url.
      // url will not return data unless api is provided
      `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${query}`,
      {
        headers: {
          //headers provided by rapidapi.com and the api on there.
          "X-Rapidapi-Key": apiKey || "",
          "X-Rapidapi-Host": "exercises-by-api-ninjas.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
