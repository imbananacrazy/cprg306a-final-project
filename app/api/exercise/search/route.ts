import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    //try for search by muscle first. if failed, try for search by body part.
    const muscleResult = await fetch(
      `https://exercisedb.dev/api/v1/muscles/${query}/exercises`,
    );
    const muscleData = await muscleResult.json();

    if (!muscleData.success || muscleData.data.length === 0) {
      const bodyPartResult = await fetch(
        `https://exercisedb.dev/api/v1/bodyparts/${query}/exercises`,
      );
      const bodyPartData = await bodyPartResult.json();
      return NextResponse.json(bodyPartData);
    }

    return NextResponse.json(muscleData);
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
