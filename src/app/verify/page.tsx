'use server';

import { PublicHeader } from "@/components/public/public-header";
import { CertificateDetails } from "@/components/public/certificate-details";
import { VerificationForm } from "@/components/public/verification-form";
import { findCertificate } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type VerifyPageProps = {
  searchParams?: {
    id?: string;
    error?: string;
  };
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const certificateId = searchParams?.id;
  let certificate = null;
  let error = searchParams?.error;

  if (certificateId) {
    try {
      const result = await findCertificate(certificateId);
      if (result) {
        certificate = result;
      } else {
        error = `Certificate with ID "${certificateId}" not found. Please check the ID and try again.`;
      }
    } catch (e: any) {
      error = e.message || "An unexpected error occurred during verification.";
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2 font-headline text-primary">Verify Certificate</h1>
            <p className="text-muted-foreground text-center mb-8">
              Enter a Certificate ID or Student Roll Number to verify its authenticity.
            </p>
            
            <VerificationForm />

            <div className="mt-10">
              {certificate && <CertificateDetails certificate={certificate} />}
              {error && !certificate && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} CodeWithZenil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
