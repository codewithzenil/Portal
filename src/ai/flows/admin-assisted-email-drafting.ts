'use server';
/**
 * @fileOverview AI-assisted email drafting for certificate notifications.
 *
 * - draftCertificateNotificationEmail - A function that generates an email draft for certificate notifications.
 * - DraftCertificateNotificationEmailInput - The input type for the draftCertificateNotificationEmail function.
 * - DraftCertificateNotificationEmailOutput - The return type for the draftCertificateNotificationEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftCertificateNotificationEmailInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  certificateName: z.string().describe('The name of the certificate.'),
  certificateId: z.string().describe('The ID of the certificate.'),
});
export type DraftCertificateNotificationEmailInput = z.infer<typeof DraftCertificateNotificationEmailInputSchema>;

const DraftCertificateNotificationEmailOutputSchema = z.object({
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});
export type DraftCertificateNotificationEmailOutput = z.infer<typeof DraftCertificateNotificationEmailOutputSchema>;

export async function draftCertificateNotificationEmail(
  input: DraftCertificateNotificationEmailInput
): Promise<DraftCertificateNotificationEmailOutput> {
  return draftCertificateNotificationEmailFlow(input);
}

const draftCertificateNotificationEmailPrompt = ai.definePrompt({
  name: 'draftCertificateNotificationEmailPrompt',
  input: {schema: DraftCertificateNotificationEmailInputSchema},
  output: {schema: DraftCertificateNotificationEmailOutputSchema},
  prompt: `You are an AI assistant helping an administrator draft an email notification to a student when their certificate has been added to the system.

  Given the following information, draft an email subject and body. The email should be professional, informative, and include all necessary details.

  Student Name: {{{studentName}}}
  Certificate Name: {{{certificateName}}}
  Certificate ID: {{{certificateId}}}
  Verification Link: [Link to verification page with certificate ID]
  `,
});

const draftCertificateNotificationEmailFlow = ai.defineFlow(
  {
    name: 'draftCertificateNotificationEmailFlow',
    inputSchema: DraftCertificateNotificationEmailInputSchema,
    outputSchema: DraftCertificateNotificationEmailOutputSchema,
  },
  async input => {
    const {output} = await draftCertificateNotificationEmailPrompt(input);
    return output!;
  }
);
