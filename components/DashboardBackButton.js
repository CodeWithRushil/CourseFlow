import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const DashboardBackButton = () => {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#155DFC]/40 hover:text-[#155DFC] hover:shadow-md hover:-translate-x-0.5 active:translate-x-0 transition-all duration-200"
      aria-label="Back to dashboard"
      title="Dashboard"
    >
      <LayoutDashboard size={17} strokeWidth={2} />
    </Link>
  );
};

export default DashboardBackButton;
