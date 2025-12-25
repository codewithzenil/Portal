'use client';

import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LogIn, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function LoginForm() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return (
    <form action={dispatch} className="space-y-4">
      {from && <input type="hidden" name="from" value={from} />}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      <LogIn className="mr-2 h-4 w-4" />
      {pending ? 'Logging in...' : 'Log In'}
    </Button>
  );
}
