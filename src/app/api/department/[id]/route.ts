import { API_URL, ENDPOINT } from "@/lib/ApiUrl";
import { getToken } from "@/lib/token";
import { ResponseDto } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET Request - Fetch a single user by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } =await params;
        const url = `${API_URL.EXTERNAL}${ENDPOINT.DEPARTMENT}/${id}`;
        const token = await getToken();

        const result = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data: ResponseDto = await result.json();
        return NextResponse.json(data , { status: data.statusCode });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT Request - Update user details
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } =await params;
        const url = `${API_URL.EXTERNAL}${ENDPOINT.DEPARTMENT}/${id}`;
        const token = await getToken();
        const requestBody = await req.json();

        console.log("Updating User:", { id, requestBody });

        const result = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

     

        const data: ResponseDto = await result.json();
        return NextResponse.json(data, { status: data.statusCode });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE Request - Remove a user by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const url = `${API_URL.EXTERNAL}${ENDPOINT.DEPARTMENT}/${id}`;
        const token = await getToken();

        console.log("Deleting User:", id);

        const result = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: ResponseDto = await result.json();

        return NextResponse.json(data, { status: data.statusCode });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
