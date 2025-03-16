import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { setTokens } from "@/lib/token";
import { AuthResponse, SignupRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {  password, email}: SignupRequest = await req.json();
        const url = API_URL.EXTERNAL + ENDPOINT.AUTH.LOGIN;
        
        const result = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, email})
        });

        if (!result.ok) {
            const errorData:AuthResponse = await result.json(); // Handle API error response
            console.error("API Error:", errorData);
            return NextResponse.json({ success: errorData.success, message: errorData.message || "Login failed" }, { status: result.status });
        }

        const data: AuthResponse = await result.json();
        await setTokens(data.token!, data.id)
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
