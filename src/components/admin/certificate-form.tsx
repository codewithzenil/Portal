'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCertificate, updateCertificate, type FormState } from '@/lib/actions';
import type { Certificate } from '@/lib/definitions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Save, Plus } from 'lucide-react';
import { EmailDraftModal } from './email-draft-modal';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    const Icon = isEditing ? Save : Plus;
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Icon className="mr-2 h-4 w-4" />
            {pending ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Certificate')}
        </Button>
    );
}

export function CertificateForm({ certificate }: { certificate?: Certificate }) {
    const { toast } = useToast();
    const router = useRouter();
    const isEditing = !!certificate;

    const initialState: FormState = { message: null, errors: {} };
    const action = isEditing ? updateCertificate.bind(null, certificate.id) : createCertificate;
    const [state, dispatch] = useActionState(action, initialState);

    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [draftData, setDraftData] = useState<Certificate | null>(null);

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success!',
                description: state.message,
            });

            if (state.certificate) {
                if(isEditing){
                    router.push('/admin/certificates');
                } else {
                    setDraftData(state.certificate);
                    setAiModalOpen(true);
                }
            } else {
                 router.push('/admin/certificates');
            }
        } else if (state.message) {
            toast({
                variant: 'destructive',
                title: 'An error occurred',
                description: state.message,
            });
        }
    }, [state, toast, router, isEditing]);

    const handleModalClose = () => {
        setAiModalOpen(false);
        setDraftData(null);
        router.push('/admin/certificates');
    }

    return (
        <>
        <form action={dispatch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input id="studentName" name="studentName" defaultValue={certificate?.studentName} />
                    {state.errors?.studentName && <p className="text-sm text-destructive">{state.errors.studentName[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="studentRollNumber">Student Roll Number</Label>
                    <Input id="studentRollNumber" name="studentRollNumber" defaultValue={certificate?.studentRollNumber} />
                     {state.errors?.studentRollNumber && <p className="text-sm text-destructive">{state.errors.studentRollNumber[0]}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="certificateName">Certificate Name</Label>
                <Input id="certificateName" name="certificateName" defaultValue={certificate?.certificateName} />
                 {state.errors?.certificateName && <p className="text-sm text-destructive">{state.errors.certificateName[0]}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="issuedDate">Issued Date</Label>
                <Input id="issuedDate" name="issuedDate" type="date" defaultValue={certificate?.issuedDate} />
                {state.errors?.issuedDate && <p className="text-sm text-destructive">{state.errors.issuedDate[0]}</p>}
            </div>

            {state.message && !state.success && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <CardFooter className="px-0 pt-6 flex justify-end gap-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/certificates">Cancel</Link>
                </Button>
                <SubmitButton isEditing={isEditing} />
            </CardFooter>
        </form>
        {draftData && <EmailDraftModal isOpen={aiModalOpen} onOpenChange={handleModalClose} certificate={draftData} />}
        </>
    );
}
