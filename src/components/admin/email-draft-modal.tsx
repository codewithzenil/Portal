'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import type { Certificate } from "@/lib/definitions";
import { draftCertificateNotificationEmail, type DraftCertificateNotificationEmailOutput } from "@/ai/flows/admin-assisted-email-drafting";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Copy, Send } from "lucide-react";

type EmailDraftModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate;
};

export function EmailDraftModal({ isOpen, onOpenChange, certificate }: EmailDraftModalProps) {
  const [draft, setDraft] = useState<DraftCertificateNotificationEmailOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && certificate) {
      setIsLoading(true);
      setDraft(null);
      draftCertificateNotificationEmail({
        studentName: certificate.studentName,
        certificateName: certificate.certificateName,
        certificateId: certificate.id,
      })
        .then(setDraft)
        .catch(error => {
          console.error("Failed to draft email:", error);
          toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate email draft.",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, certificate, toast]);

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${field} has been copied.`,
    });
  };
  
  const handleSend = () => {
    toast({
        title: 'Email Sent (Simulated)',
        description: 'In a real application, this would send the email.',
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI-Generated Email Draft</DialogTitle>
          <DialogDescription>
            A notification email for {certificate.studentName} has been drafted. Review and send.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <div className="relative">
                    <Input id="subject" value={draft?.subject || ''} readOnly />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => handleCopyToClipboard(draft?.subject || '', 'Subject')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <div className="relative">
                    <Textarea id="body" value={draft?.body || ''} readOnly className="h-48" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-2 h-7 w-7" onClick={() => handleCopyToClipboard(draft?.body || '', 'Body')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
           <Button type="button" onClick={handleSend} disabled={isLoading}>
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
