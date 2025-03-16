import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getCookieId, getToken } from "@/lib/token";
import { AuthResponse, UserInfo } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = API_URL.EXTERNAL + ENDPOINT.AUTH.USER;
        const id= await getCookieId();
        const token=await getToken()

        const result = await fetch(`${url}?userId=${encodeURIComponent(id!)}`, {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
             },
        });

        if (!result.ok) {
            const errorData:AuthResponse = await result.json(); // Handle API error response
            console.error("API Error:", errorData);
            return NextResponse.json({message: errorData.message || "Login failed" });
        }

        const data:UserInfo = await result.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}