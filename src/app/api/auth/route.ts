import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
    const body = await req.json();

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login-employee`;

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("[LOGIN] Failed to parse backend JSON:", err);
      return NextResponse.json(
        { success: false, message: "Invalid backend JSON response." },
        { status: 500 }
      );
    }


    // Check if backend returned a valid token
    if (!data?.data?.token) {
      console.warn("[LOGIN] No token found in backend response!");
      return NextResponse.json(
        { success: false, message: "Invalid login or missing token." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: data.data.username,
    });

    // Set cookie
    response.cookies.set("token", data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in production
      sameSite: "lax", // use lax for navigation
      path: "/", // accessible across all routes
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error: any) {
    console.error("[LOGIN] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during login." },
      { status: 500 }
    );
  }
}
