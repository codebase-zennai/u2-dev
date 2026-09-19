"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  Share2,
  Check,
  Search,
  FolderOpen,
  Eye,
  Maximize2,
  Minimize2,
  Printer,
  Info,
  Calendar,
  HardDrive,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet,
  File,
  HelpCircle,
} from "lucide-react";

export default function DocumentViewerSection({ initialDocuments = [] }) {
  // Always default to the first document in the list as requested
  const [selectedDocId, setSelectedDocId] = useState(
    initialDocuments[0]?.id || initialDocuments[0]?.filename || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Determine active document
  const activeDoc = useMemo(() => {
    return (
      initialDocuments.find(
        (d) => d.id === selectedDocId || d.filename === selectedDocId
      ) ||
      initialDocuments[0] ||
      null
    );
  }, [initialDocuments, selectedDocId]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialDocuments.map((d) => d.category || "General"));
    return ["ALL", ...Array.from(cats)];
  }, [initialDocuments]);

  // Filtered document list
  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesCategory =
        selectedCategory === "ALL" || doc.category === selectedCategory;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description &&
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialDocuments, selectedCategory, searchQuery]);

  const handleCopyLink = () => {
    if (!activeDoc) return;
    const url = `${window.location.origin}${activeDoc.url}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    if (!activeDoc) return;
    const printWindow = window.open(activeDoc.url, "_blank");
    if (printWindow) {
      printWindow.focus();
    }
  };

  const getFileIcon = (fileType) => {
    const type = fileType?.toUpperCase();
    if (type === "PDF") return <FileText className="w-5 h-5 text-red-500" />;
    if (type === "XLS" || type === "XLSX")
      return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
    return <File className="w-5 h-5 text-blue-500" />;
  };

  if (!activeDoc) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-[#fbf9f4] py-20 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-neutral-200">
          <FolderOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">No Documents Available</h2>
          <p className="text-neutral-600 text-sm mb-6">
            Place your files in <code className="bg-neutral-100 px-2 py-1 rounded text-primary font-mono text-xs">public/documents/</code> to make them immediately viewable here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#013b85] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-900 transition"
          >
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f1e5] min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#013b85] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#013b85] font-medium">Documents</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-700 font-semibold truncate max-w-xs sm:max-w-md">
            {activeDoc.title}
          </span>
        </nav>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#013b85] via-[#024a9e] to-[#012d66] rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#7ff74b]" />
                <span>U2 Travels & Tours Document Portal</span>
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
                Official Documents & Rates
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Access, view, and download verified transfer rates, service sheets, and official travel documents.
              </p>
            </div>

            {/* Quick Primary Download Button */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={activeDoc.downloadUrl}
                download={activeDoc.filename}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#7ff74b] text-[#080808] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download {activeDoc.fileType}</span>
                <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full ml-1 font-semibold">
                  {activeDoc.size}
                </span>
              </a>
              <a
                href={activeDoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Grid: Viewer + Document Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Viewer Column (8 cols on lg) */}
          <div
            className={`lg:col-span-8 transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-0 z-50 bg-black/90 p-4 sm:p-8 flex flex-col justify-center"
                : ""
            }`}
          >
            {/* Viewer Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-neutral-200/80 overflow-hidden flex flex-col h-full">
              {/* Viewer Toolbar */}
              <div className="px-5 py-4 bg-neutral-50/90 border-b border-neutral-200 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-red-50 border border-red-100 flex-shrink-0">
                    {getFileIcon(activeDoc.fileType)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-neutral-900 truncate">
                      {activeDoc.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-mono">{activeDoc.filename}</span>
                      <span>•</span>
                      <span>{activeDoc.size}</span>
                    </div>
                  </div>
                </div>

                {/* Toolbar Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    title="Copy Direct Link"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    type="button"
                    title="Print Document"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print</span>
                  </button>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    type="button"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition"
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Exit</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Expand</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeDoc.downloadUrl}
                    download={activeDoc.filename}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#013b85] hover:bg-blue-900 text-white shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Embedded Document Frame */}
              <div
                className={`w-full bg-neutral-900 relative ${
                  isFullscreen ? "flex-1 min-h-0" : "h-[650px] sm:h-[750px] lg:h-[820px]"
                }`}
              >
                {activeDoc.fileType === "PDF" ? (
                  <iframe
                    src={`${activeDoc.url}#toolbar=1&navpanes=0&view=FitH`}
                    className="w-full h-full border-0"
                    title={activeDoc.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
                    {getFileIcon(activeDoc.fileType)}
                    <h3 className="text-xl font-bold mt-4 mb-2">{activeDoc.title}</h3>
                    <p className="text-sm text-neutral-300 max-w-md mb-6">
                      This document format is ready for direct download. Click the button below to download and view the file.
                    </p>
                    <a
                      href={activeDoc.downloadUrl}
                      download={activeDoc.filename}
                      className="inline-flex items-center gap-2 bg-[#7ff74b] text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition"
                    >
                      <Download className="w-4 h-4" />
                      Download {activeDoc.filename}
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Friendly Notice & Quick Link */}
              <div className="p-4 bg-amber-50/70 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    Having trouble viewing in browser? You can open directly or download.
                  </span>
                </div>
                <div className="flex items-center gap-3 font-semibold">
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#013b85] hover:underline inline-flex items-center gap-1"
                  >
                    Open Directly <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>|</span>
                  <a
                    href={activeDoc.downloadUrl}
                    download={activeDoc.filename}
                    className="text-[#013b85] hover:underline inline-flex items-center gap-1"
                  >
                    Download PDF <Download className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Document Info, Selector & Customization Guide (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Document Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-neutral-200/80">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#013b85] border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#013b85]" />
                  {activeDoc.badge || "Verified Document"}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeDoc.fileType}
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-snug">
                {activeDoc.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                {activeDoc.description}
              </p>

              <div className="divide-y divide-neutral-100 text-xs sm:text-sm mb-6">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-neutral-400" /> File Size
                  </span>
                  <span className="font-semibold text-neutral-800">{activeDoc.size}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-400" /> Published / Updated
                  </span>
                  <span className="font-semibold text-neutral-800">{activeDoc.updatedAt}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-neutral-400" /> Category
                  </span>
                  <span className="font-semibold text-neutral-800">{activeDoc.category}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-neutral-400" /> Storage Location
                  </span>
                  <span className="font-mono text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                    public/documents/{activeDoc.filename}
                  </span>
                </div>
              </div>

              {/* Big Action Button */}
              <a
                href={activeDoc.downloadUrl}
                download={activeDoc.filename}
                className="w-full flex items-center justify-center gap-2 bg-[#013b85] hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-2xl shadow transition-all duration-200 text-sm group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download {activeDoc.filename}</span>
              </a>
            </div>

            {/* Document Library / Switcher (Allows switching any document added to public/documents) */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-neutral-200/80">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#013b85]" />
                  <span>Available Documents</span>
                </h4>
                <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-semibold">
                  {initialDocuments.length} File{initialDocuments.length === 1 ? "" : "s"}
                </span>
              </div>

              {/* Search & Filter if more than 1 document */}
              {initialDocuments.length > 1 && (
                <div className="space-y-3 mb-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#013b85]"
                    />
                  </div>

                  {categories.length > 2 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition ${
                            selectedCategory === cat
                              ? "bg-[#013b85] text-white"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Document List */}
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredDocs.map((doc) => {
                  const isSelected =
                    doc.id === activeDoc.id || doc.filename === activeDoc.filename;
                  return (
                    <div
                      key={doc.id || doc.filename}
                      onClick={() => setSelectedDocId(doc.id || doc.filename)}
                      className={`p-3 rounded-2xl cursor-pointer transition-all border text-left ${
                        isSelected
                          ? "bg-blue-50/70 border-[#013b85] shadow-sm"
                          : "bg-neutral-50 hover:bg-neutral-100/80 border-neutral-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="mt-0.5 flex-shrink-0">
                            {getFileIcon(doc.fileType)}
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-xs font-bold truncate ${
                                isSelected ? "text-[#013b85]" : "text-neutral-900"
                              }`}
                            >
                              {doc.title}
                            </p>
                            <p className="text-[11px] text-neutral-500 truncate">
                              {doc.filename} • {doc.size}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold tracking-wide bg-[#013b85] text-white px-2 py-0.5 rounded-full flex-shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customization Guide Box */}
            <div className="bg-[#fcfaf5] rounded-3xl p-5 border border-dashed border-[#013b85]/30">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#013b85] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-700">
                  <h5 className="font-bold text-[#013b85] mb-1">
                    How to Add More Documents
                  </h5>
                  <p className="mb-2 leading-relaxed text-neutral-600">
                    This endpoint is fully dynamic and customizable:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-neutral-600 font-medium">
                    <li>
                      Drop any document into <code className="bg-white px-1.5 py-0.5 rounded border text-[#013b85]">public/documents/</code>
                    </li>
                    <li>
                      (Optional) Customize title & metadata in <code className="bg-white px-1.5 py-0.5 rounded border text-[#013b85]">data/documents.js</code>
                    </li>
                    <li>The document appears instantly in this portal!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Contact / Custom Quote Support Box */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 shadow-md">
              <h5 className="text-base font-bold mb-2">Need a Custom Quote or Rate?</h5>
              <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                For customized group itineraries, corporate MICE logistics, or special coach rates, speak directly with our operations team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#7ff74b] text-neutral-900 font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#6ee23d] transition"
              >
                <span>Contact Reservations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
