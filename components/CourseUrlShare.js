"use client";
import React, { useState } from "react";
import { Check, Copy, ExternalLink, Link2 } from "lucide-react";
import toast from "react-hot-toast";

const CourseUrlShare = ({ courseId }) => {
  const [copied, setCopied] = useState(false);
  const host = (process.env.NEXT_PUBLIC_HOST_NAME || "").replace(/\/$/, "");
  const url = `${host}/course/${courseId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link Copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed To Copy");
    }
  };

  return (
    <div className="mt-6 mb-18 sm:mb-24 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-3">
        <Link2 size={28} className="mt-0.5 shrink-0 text-[#155DFC]" strokeWidth={2} />
        <div className="min-w-0">
          <h2 className="font-semibold text-sm sm:text-base text-slate-900">
            Course URL
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Share this link so others can view and start your course.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
        <div className="flex-1 min-w-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
          <p className="text-sm text-slate-600 font-mono truncate" title={url}>
            {url}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-lg bg-[#155DFC] px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="Open course"
          >
            <ExternalLink size={14} />
            <span className="sm:inline">Open</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseUrlShare;
