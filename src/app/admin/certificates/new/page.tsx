import { CertificateForm } from "@/components/admin/certificate-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewCertificatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
            <CardTitle>Add New Certificate</CardTitle>
            <CardDescription>Fill in the details to issue a new certificate.</CardDescription>
        </CardHeader>
        <CardContent>
            <CertificateForm />
        </CardContent>
      </Card>
    </div>
  );
}
