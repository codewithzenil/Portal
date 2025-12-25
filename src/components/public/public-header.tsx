import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/verify">Verify Certificate</Link>
          </Button>
          <Button asChild>
            <Link href="/admin">
              <User className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Admin Login</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
