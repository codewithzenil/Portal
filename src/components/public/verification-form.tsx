'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export function VerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setInputValue(idFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) {
      router.push(`/verify?id=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Certificate Search</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            name="id"
            placeholder="Enter Certificate ID or Student Roll Number"
            required
            className="text-base"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            <Search className="mr-2 h-4 w-4" />
            Verify
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
