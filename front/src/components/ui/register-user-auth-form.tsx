"use client"

import React, {useState} from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import Map from "@/components/ui/maps";

interface LatLng {
  lat: number;
  lng: number;
}
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}




export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [location, setLocation] = useState<LatLng | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (location) {
      // Handle form submission here, such as sending the selected location to a backend API
      console.log("Selected Location:", location);
    } else {
      console.log("No location selected.");
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
          <Label className="sr-only" htmlFor="imageUpload">
              Photo
            </Label>
            <Input
              id="imageUpload"
              placeholder="John"
              type="file"
              disabled={isLoading}
            />
            <Label htmlFor="location">
              <Map setLocation={setLocation} />
            </Label>
            <Label className="sr-only" htmlFor="fname">
              First Name
            </Label>
            <Input
              id="fname"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoComplete="fname"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="lname">
              Last Name
            </Label>
            <Input
              id="lname"
              placeholder="Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="lname"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password(minimun 8 characters)"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          <br></br>
          <p className="bg-background px-2 text-muted-foreground">Account already exists?</p>
          <Link className="grid" href="/login"><Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login 
          </Button></Link>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}