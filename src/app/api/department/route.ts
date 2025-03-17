import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getToken } from "@/lib/token";
import { ResponseDto } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET Request - Fetch all users
export async function GET() {
    try {
        const url = API_URL.EXTERNAL + ENDPOINT.DEPARTMENT;
        const token = await getToken();

        const result = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!result.ok) {
            const errorData: ResponseDto = await result.json();
            console.error("API Error:", errorData);
            return NextResponse.json(
                { message: errorData.message },
                { status: errorData.statusCode }
            );
        }

        const data: ResponseDto = await result.json();
        return NextResponse.json(data.data, { status: 200 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST Request - Add a new user
export async function POST(req: NextRequest) {
    try {
        const url = API_URL.EXTERNAL + ENDPOINT.DEPARTMENT;
        const token = await getToken();
        const requestBody = await req.json(); // Extract request body

        console.log("Received Data:", requestBody);

        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!result.ok) {
            const errorData: ResponseDto = await result.json();
            console.error("API Error:", errorData);
            return NextResponse.json(
                { message: errorData.message },
                { status: errorData.statusCode }
            );
        }

        const data: ResponseDto = await result.json();
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
