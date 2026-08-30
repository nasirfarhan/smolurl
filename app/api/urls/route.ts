import { shortenUrl } from "@/app/services/url.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await shortenUrl(url)

    return NextResponse.json(
      {
       id : result.id,
       originalUrl : result.originalUrl ,
       shortCode : result.shortCode
      },
      { status: 201 }
    );
  } catch(error) {
     console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}