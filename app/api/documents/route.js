import { NextResponse } from "next/server";
import { getAvailableDocuments } from "@/lib/documents";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const documents = getAvailableDocuments();
    return NextResponse.json({
      success: true,
      count: documents.length,
      documents: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
