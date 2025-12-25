import { PublicHeader } from "@/components/public/public-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 p-4 text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
              CodeWithZenil Institute
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 mb-8">
              Empowering the next generation of tech leaders with verifiable, digital credentials.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/verify">Verify a Certificate</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 font-headline text-primary">Why CodeWithZenil?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg transition-transform hover:scale-105">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <CardTitle>Secure Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our certificates are easily verifiable, ensuring authenticity and building trust.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg transition-transform hover:scale-105">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <CardTitle>Industry-Recognized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Gain credentials that are respected by top companies in the tech industry.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg transition-transform hover:scale-105">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <CardTitle>Career Advancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Unlock new opportunities and accelerate your career path with our certified courses.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} CodeWithZenil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
