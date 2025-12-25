import type { Certificate } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, User, Calendar, Award as AwardIcon, Download } from "lucide-react";
import { QRCode } from "@/components/shared/qr-code";
import { Button } from "../ui/button";

export function CertificateDetails({ certificate }: { certificate: Certificate }) {
  // This should be an environment variable in a real app
  const appUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');
  const verificationUrl = `${appUrl}/verify?id=${certificate.id}`;

  return (
    <Card className="overflow-hidden shadow-2xl shadow-primary/10 animate-in fade-in zoom-in-95">
      <CardHeader className="bg-primary/5 p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="h-10 w-10 text-green-500 flex-shrink-0" />
          <div>
            <CardTitle className="text-xl sm:text-2xl text-primary">Certificate Verified</CardTitle>
            <CardDescription>This certificate is authentic and valid.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <AwardIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="font-semibold">{certificate.certificateName}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span>{certificate.studentName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span>Issued on: {new Date(certificate.issuedDate).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Certificate ID</Badge>
              <span className="font-mono text-sm">{certificate.id}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-4 md:pt-0">
            <QRCode url={verificationUrl} />
            <Button variant="outline" size="sm" asChild>
              <a href={QRCode.getQRCodeUrl(verificationUrl)} download={`qr-code-${certificate.id}.png`}>
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
