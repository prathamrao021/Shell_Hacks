import { Button } from "@/components/ui/button"; // Ensure Button is properly imported

export default function ChoosePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">How can we assist you?</h1>
        <p className="mt-2 text-lg">Select an option below that best describes your intention.</p>
      </header>
      <main className="space-y-4">
        <Button variant="default" size="lg">
          Volunteer
        </Button>
        <Button variant="secondary" size="lg">
          Need Help
        </Button>
      </main>
      <footer className="absolute bottom-0 w-full text-center p-4 border-t border-border">
        <p>© 2024 Helping Hands. All rights reserved.</p>
      </footer>
    </div>
  );
}
