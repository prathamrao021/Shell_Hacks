"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";  

const events = [
  {
    id: 1,
    title: "Community Clean-Up",
    description: "Join us as we clean up our local parks. All materials provided. We aim to not only clean but also to educate participants on the importance of maintaining public spaces.",
    location: "Central Park",
    distance: "5 miles"
  },
  {
    id: 2,
    title: "Food Drive",
    description: "Help collect and organize food donations for local food banks. Your contributions can make a real difference in the lives of those in need.",
    location: "Community Center",
    distance: "2 miles"
  },
  {
    id: 3,
    title: "Blood Donation Camp",
    description: "Donate blood and help save lives. Pre-registration required. Blood donors are crucial to maintaining a healthy and robust community.",
    location: "Hospital Town Hall",
    distance: "1 mile"
  },
];

export default function EventListPage() {
  // State to manage which event's description is expanded
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id: any) => {
    if (expandedId === id) {
      setExpandedId(null); // Collapse if the same id is clicked again
    } else {
      setExpandedId(id); // Expand the clicked one
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-6 p-4 shadow-lg">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p
                className={`text-sm ${expandedId !== event.id ? "line-clamp-1" : ""}`}
                onClick={() => toggleDescription(event.id)}
              >
                {event.description}
              </p>
              <p className="text-sm text-gray-600">Location: {event.location}</p>
              <p className="text-sm text-gray-600">Distance: {event.distance}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
