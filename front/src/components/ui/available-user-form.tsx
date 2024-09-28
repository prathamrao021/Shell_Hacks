"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeSlot {
  start: string;
  end: string;
}

interface Availability {
  [day: string]: TimeSlot[];
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function AvailableForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState<Availability>({
    Monday: [{ start: "", end: "" }],
    Tuesday: [{ start: "", end: "" }],
    Wednesday: [{ start: "", end: "" }],
    Thursday: [{ start: "", end: "" }],
    Friday: [{ start: "", end: "" }],
    Saturday: [{ start: "", end: "" }],
    Sunday: [{ start: "", end: "" }],
  });

  // Add a time slot for the day
  const handleAddTimeSlot = (day: string) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: [...prevAvailability[day], { start: "", end: "" }],
    }));
  };

  // Handle the change in time inputs
  const handleTimeChange = (day: string, index: number, field: "start" | "end", value: string) => {
    const updatedSlots = availability[day].map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: updatedSlots,
    }));
  };

  // Remove a time slot for the day
  const handleRemoveTimeSlot = (day: string, index: number) => {
    const updatedSlots = availability[day].filter((_, i) => i !== index);
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: updatedSlots,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("User Availability:", availability);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate a form submission delay
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="mb-4">
              <Label htmlFor={day} className="font-bold mb-2">
                {day}
              </Label>
              {availability[day].map((slot, index) => (
                <div key={index} className="flex gap-4 items-center mb-2">
                  <div className="w-1/2">
                    <Input
                      type="time"
                      value={slot.start}
                      onChange={(e) => handleTimeChange(day, index, "start", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="time"
                      value={slot.end}
                      onChange={(e) => handleTimeChange(day, index, "end", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {availability[day].length > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveTimeSlot(day, index)}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddTimeSlot(day)}
                disabled={isLoading}
              >
                Add Time Slot
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <span className="mr-2">Submitting...</span>}
          Submit Availability
        </Button>
      </form>
    </div>
  );
}
