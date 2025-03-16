import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getToken } from "@/lib/token";
import { ResponseDto } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = API_URL.EXTERNAL + ENDPOINT.USERMANAGER.USERS;
        const token=await getToken()

        const result = await fetch(`${url}`, {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
             },
        });

        if (!result.ok) {
            const errorData:ResponseDto = await result.json(); // Handle API error response
            console.error("API Error:", errorData);
            return NextResponse.json({message: errorData.message },{status:errorData.statusCode});
        }

        const data:ResponseDto = await result.json();
        return NextResponse.json(data.data, { status: 200 });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}