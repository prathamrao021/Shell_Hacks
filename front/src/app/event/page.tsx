"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";  
import {Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";



export default function Event(  ) {
  return (
    <div>
      <Navbar />
      <Card className="mx-32 mt-10">
        <CardHeader>
          <CardTitle>Event</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Dummy description for the page Something </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => alert("Event accepted!")} className="m-3">Back</Button>
          <Button onClick={() => alert("Event accepted!")} className="m-3">Accept Event</Button>
        </CardFooter>
      </Card>
    </div>
  );
}