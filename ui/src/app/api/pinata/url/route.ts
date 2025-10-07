import pinata from "@/pinata";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const uuid = crypto.randomUUID();
  try {
    const url = await pinata.upload.public.createSignedURL({
      expires: 1000, // The only required param
      name: `cryptoCanvas/${uuid}-url`,
    });
    return NextResponse.json({ url: url }, { status: 200 }); // Returns the signed upload URL
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating signed URL:" },
      { status: 500 },
    );
  }
}
