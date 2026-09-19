import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedFile = searchParams.get("file");

    if (!requestedFile) {
      return NextResponse.json(
        { error: "File parameter is required" },
        { status: 400 }
      );
    }

    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(requestedFile);
    const documentsDir = path.join(process.cwd(), "public", "documents");
    const filePath = path.join(documentsDir, safeFilename);

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Requested document was not found" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return NextResponse.json(
        { error: "Invalid document request" },
        { status: 400 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(safeFilename).toLowerCase().replace(".", "");
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    const response = new NextResponse(fileBuffer);
    response.headers.set("Content-Type", contentType);
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );
    response.headers.set("Content-Length", stat.size.toString());
    response.headers.set("Cache-Control", "public, max-age=3600");

    return response;
  } catch (error) {
    console.error("Error serving document download:", error);
    return NextResponse.json(
      { error: "Failed to download document" },
      { status: 500 }
    );
  }
}
