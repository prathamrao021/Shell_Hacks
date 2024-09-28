import { Button } from "@/components/ui/button"; // Ensure Button is properly imported or define it if not existing

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">INSERT COOL TITLE</h1>
        <p className="mt-2 text-lg">Log In or Register to continue.</p>
      </header>
      <main>
        <Button className="px-8 py-2 bg-primary text-primary-foreground rounded-md shadow-lg hover:bg-primary-500 focus:outline-none focus:ring focus:ring-ring">
          Register
        </Button>
      </main>
      <footer className="absolute bottom-0 w-full text-center p-4 border-t border-border">
        <p>© 2024 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
