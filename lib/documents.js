import fs from "fs";
import path from "path";
import { documentMetadataConfig } from "@/data/documents";

/**
 * Format bytes into human readable format (e.g. 10.3 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Clean a filename into a human readable title
 * e.g. "transfer_rates.pdf" -> "Transfer Rates"
 */
function filenameToTitle(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Get all available documents from public/documents directory,
 * enriched with custom metadata from data/documents.js.
 */
export function getAvailableDocuments() {
  const documentsDir = path.join(process.cwd(), "public", "documents");

  // Create public/documents directory if it doesn't exist
  if (!fs.existsSync(documentsDir)) {
    try {
      fs.mkdirSync(documentsDir, { recursive: true });
    } catch (e) {
      console.error("Failed to create public/documents directory:", e);
    }
  }

  let fileNames = [];
  try {
    fileNames = fs.readdirSync(documentsDir);
  } catch (err) {
    console.error("Error reading public/documents directory:", err);
  }

  const docMap = new Map();
  documentMetadataConfig.forEach((doc) => {
    docMap.set(doc.filename.toLowerCase(), doc);
  });

  const documents = [];

  for (const filename of fileNames) {
    // Skip hidden files, system files, or temp files
    if (filename.startsWith(".") || filename.startsWith("~")) continue;

    const filePath = path.join(documentsDir, filename);
    let stats;
    try {
      stats = fs.statSync(filePath);
      if (!stats.isFile()) continue;
    } catch {
      continue;
    }

    const ext = path.extname(filename).toLowerCase().replace(".", "");
    const lowerFilename = filename.toLowerCase();
    const customConfig = docMap.get(lowerFilename) || {};

    const docId =
      customConfig.id ||
      filename
        .toLowerCase()
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-z0-9]+/g, "-");

    const documentItem = {
      id: docId,
      filename: filename,
      title: customConfig.title || filenameToTitle(filename),
      category: customConfig.category || "General Documents",
      badge: customConfig.badge || (ext === "pdf" ? "PDF Document" : ext.toUpperCase()),
      description:
        customConfig.description ||
        `Official document: ${filenameToTitle(filename)}. Available for viewing and direct download.`,
      tags: customConfig.tags || [ext.toUpperCase(), "Official"],
      fileType: ext.toUpperCase(),
      sizeBytes: stats.size,
      size: formatBytes(stats.size),
      url: `/documents/${filename}`,
      downloadUrl: `/api/documents/download?file=${encodeURIComponent(filename)}`,
      updatedAt: customConfig.updatedAt || new Date(stats.mtime).toLocaleDateString("en-MY", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      order: customConfig.order ?? 999,
      featured: Boolean(customConfig.featured),
    };

    documents.push(documentItem);
  }

  // Sort by order ascending, then by title
  documents.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  // If public/documents is somehow empty, fall back to initial configured document
  if (documents.length === 0) {
    const fallback = documentMetadataConfig[0];
    if (fallback) {
      documents.push({
        id: fallback.id,
        filename: fallback.filename,
        title: fallback.title,
        category: fallback.category,
        badge: fallback.badge,
        description: fallback.description,
        tags: fallback.tags,
        fileType: "PDF",
        size: "10.3 MB",
        sizeBytes: 10824400,
        url: `/documents/${fallback.filename}`,
        downloadUrl: `/api/documents/download?file=${encodeURIComponent(fallback.filename)}`,
        updatedAt: fallback.updatedAt,
        order: fallback.order,
        featured: fallback.featured,
      });
    }
  }

  return documents;
}

/**
 * Get a specific document by its id or filename
 */
export function getDocumentById(idOrFilename) {
  const docs = getAvailableDocuments();
  if (!idOrFilename) return docs[0] || null;

  const needle = idOrFilename.toLowerCase();
  return (
    docs.find(
      (d) =>
        d.id.toLowerCase() === needle ||
        d.filename.toLowerCase() === needle ||
        encodeURIComponent(d.filename.toLowerCase()) === needle
    ) || docs[0] || null
  );
}
