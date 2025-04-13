// app/(protected)/dashboard/(admin)/documents/admission/[id]/route.tsx

import AdmissionLetter from "@/components/documents/AdmissionLetter";
import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getToken } from "@/lib/token";
import { ResponseDto, Student } from "@/lib/types";
import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'; // ensure this is not an Edge function

const apiurl = `${API_URL.EXTERNAL}${ENDPOINT.STUDENT}`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const url = `${apiurl}/${id}`;
    const token = await getToken();

    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ResponseDto = await result.json();

    const stream = await renderToStream(
      <AdmissionLetter studentInfo={data.data as Student} />
    );

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=admission-letter.pdf",
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
