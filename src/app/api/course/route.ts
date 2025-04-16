import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getToken } from "@/lib/token";
import { ResponseDto } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


const url = API_URL.EXTERNAL + ENDPOINT.COURSE;
// GET Request - Fetch all users
export async function GET() {
    try {
       
        const token = await getToken();

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const results:ResponseDto=await response.json();    
        return NextResponse.json(results, {status: results.statusCode});
        
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST Request - Add a new user
export async function POST(req: NextRequest) {
    try {
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
        const data: ResponseDto = await result.json();
        if (!data.success) {
            return NextResponse.json(data, {status:data.statusCode})
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
