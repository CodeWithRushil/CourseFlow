import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

const Loading = ({ loading, mode = "layout" }) => {
  const { title, subtitle } = messages[mode];
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-10">
              <Image src="/loader.gif" width={100} height={100} alt="Loader" />

              <div className="text-center space-y-1 mt-4">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {title}
                  <span className="animate-pulse">...</span>
                </h2>

                <p className="text-xs text-slate-500 font-medium leading-snug">
                  {subtitle}
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loading;
