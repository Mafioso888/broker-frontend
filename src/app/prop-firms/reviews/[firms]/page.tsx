"use client";

import { useParams } from "next/navigation";
import { propFirms } from "@/Data/challengesData"; // Replace with your actual data
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FirmReviewsPage() {
  const { firm } = useParams();
  const firmName = firm.toString().replace(/-/g, " ");
  const currentFirm = propFirms.find(
    (f) => f.name.toLowerCase() === firmName
  );

  if (!currentFirm) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Firm Not Found 😢</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{currentFirm.name} Reviews</h1>
        <div className="flex items-center gap-2 mb-6 text-yellow-400">
          {Array(Math.round(currentFirm.rating))
            .fill(0)
            .map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          <span className="text-zinc-300">({currentFirm.rating})</span>
        </div>

        <div className="grid gap-4">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
              >
                <h3 className="text-lg font-semibold mb-1">User #{idx + 1}</h3>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array(Math.floor(Math.random() * 5) + 1)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
                <p className="text-zinc-300">
                  This is a placeholder review for {currentFirm.name}. You can
                  later pull actual reviews from a database or API.
                </p>
              </div>
            ))}
        </div>

        <Button className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          Leave a Review
        </Button>
      </div>
    </div>
  );
}
