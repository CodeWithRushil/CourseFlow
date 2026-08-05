"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const messages = {
  layout: {
    title: "Designing course structure",
    subtitle: "Organizing chapters and roadmap",
  },
  content: {
    title: "Generating course content",
    subtitle: "Creating lessons and explanations",
  },
};

/** Rough estimate: layout ~20s; content ~25s per chapter */
function estimateSeconds(mode, chapterCount) {
  const n = Math.max(1, Number(chapterCount) || 3);
  if (mode === "layout") return 20;
  return n * 25;
}

function formatRemaining(totalSeconds) {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `about ${r}s left`;
  if (r === 0) return `about ${m} min left`;
  return `about ${m}m ${r}s left`;
}

const Loading = ({ loading, mode = "layout", chapterCount = 3 }) => {
  const { title, subtitle } = messages[mode] || messages.layout;
  const [etaSeconds, setEtaSeconds] = useState(0);
  const [etaTotal, setEtaTotal] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setEtaSeconds(0);
      setEtaTotal(0);
      return;
    }

    const total = estimateSeconds(mode, chapterCount);
    setEtaTotal(total);
    setEtaSeconds(total);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [loading, mode, chapterCount]);

  const etaProgress =
    etaTotal > 0 ? Math.min(95, ((etaTotal - etaSeconds) / etaTotal) * 100) : 0;

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-8 px-2">
              <Image src="/loader.gif" width={100} height={100} alt="Loader" />

              <div className="text-center space-y-1 mt-4 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {title}
                  <span className="animate-pulse">...</span>
                </h2>

                <p className="text-xs text-slate-500 font-medium leading-snug">
                  {subtitle}
                </p>

                <p className="text-sm font-semibold text-[#155DFC] pt-3">
                  {etaSeconds > 0
                    ? `Approx. ${formatRemaining(etaSeconds)}`
                    : "Almost done…"}
                </p>

                <div className="mt-2.5 h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#155DFC] transition-[width] duration-1000 ease-linear"
                    style={{ width: `${etaProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loading;
