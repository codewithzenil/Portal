import { getCertificates } from "@/lib/actions";
import { CertificateTable } from "@/components/admin/certificate-table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import Link from "next/link";
import type { Certificate } from "@/lib/definitions";

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold">Manage Certificates</h1>
            <p className="text-muted-foreground">A list of all issued certificates.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" disabled>
             <Download className="mr-2 h-4 w-4" />
             Export JSON
           </Button>
           <Button asChild>
            <Link href="/admin/certificates/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Link>
          </Button>
        </div>
      </div>
      <CertificateTable certificates={certificates as Certificate[]} />
    </div>
  );
}
