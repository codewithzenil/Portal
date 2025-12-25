import { CertificateForm } from "@/components/admin/certificate-form";
import { getCertificateById } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  return (
     <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
            <CardTitle>Edit Certificate</CardTitle>
            <CardDescription>Update the details for certificate ID: <span className="font-mono">{certificate.id}</span></CardDescription>
        </CardHeader>
        <CardContent>
            <CertificateForm certificate={certificate} />
        </CardContent>
      </Card>
    </div>
  );
}
