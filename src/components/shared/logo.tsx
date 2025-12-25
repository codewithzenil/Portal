import { University } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-primary", className)}>
      <University className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="text-xl font-bold tracking-tight">CodeWithZenil</span>
    </Link>
  );
}
