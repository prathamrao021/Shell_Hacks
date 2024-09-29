"use client"
import { Button } from "@/components/ui/button"; 
import Link from 'next/link';
import React from "react";

export default function ChoosePage() {
  
  const handleVolunteer = async()=> {
    localStorage.setItem('role', 'volunteer');
    window.location.href = "/available";
  }

  const handleRecruiter = async()=> {
    localStorage.setItem('role', 'recruiter');
    window.location.href = "/ListEvent";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">How can we assist you?</h1>
        <p className="mt-2 text-lg">Select an option below that best describes your intention.</p>
      </header>
      <main className="space-y-4"> 
          <Button variant="default" size="lg" onClick={handleVolunteer}>
            Volunteer
          </Button>
        <Button variant="secondary" size="lg" onClick={handleRecruiter}>
          Need Help
        </Button>
      </main>
      <footer className="absolute bottom-0 w-full text-center p-4 border-t border-border">
        <p>© 2024 Helping Hands. All rights reserved.</p>
      </footer>
    </div>
  );
}
