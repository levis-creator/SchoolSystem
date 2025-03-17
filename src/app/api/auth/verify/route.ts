import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { AuthResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token: string = await req.text(); // Use req.text() for raw string input

        const url = API_URL.EXTERNAL + ENDPOINT.AUTH.VERIFY;

        const result = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: token // Send raw token as expected by the API
        });
        if (!result.ok) {
            try {
                const errorData: AuthResponse = await result.json();
                console.error("API Error:", errorData);
                return NextResponse.json({ success: errorData.success, message: errorData.message || "Login failed" }, { status: result.status });
            } catch (parseError) {
                console.error("Error parsing API error response:", parseError);
                return NextResponse.json({ success: false, message: "Unexpected API error" }, { status: result.status });
            }
        }

        const data: AuthResponse =await result.json()
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
