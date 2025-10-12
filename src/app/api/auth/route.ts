import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("[LOGIN] Incoming POST request...");

  try {
    const body = await req.json();
    console.log("[LOGIN] Request body received:", body);

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login-employee`;
    console.log("[LOGIN] Backend URL:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    console.log("[LOGIN] Backend response status:", res.status);

    const text = await res.text();
    console.log("[LOGIN] Raw backend response text:", text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("[LOGIN] Parsed backend JSON:", data);
    } catch (err) {
      console.error("[LOGIN] Failed to parse backend JSON:", err);
      return NextResponse.json(
        { success: false, message: "Invalid backend JSON response." },
        { status: 500 }
      );
    }

    // Check if backend returned a valid token
    if (!data?.data?.token) {
      console.warn("[LOGIN] No token found in backend response!", data);
      return NextResponse.json(
        { success: false, message: "Invalid Credentials." },
        { status: 401 }
      );
    }

    console.log("[LOGIN] Token found, creating response and setting cookie...");

    const response = NextResponse.json({
      success: true,
      user: data.data.username,
    });

    // Set cookie
    response.cookies.set("token", data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    console.log("[LOGIN] Cookie set successfully. Returning response...");
    return response;
  } catch (error: any) {
    console.error("[LOGIN] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during login." },
      { status: 500 }
    );
  }
}
