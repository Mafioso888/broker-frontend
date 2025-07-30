"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { challengesData } from "@/Data/challengesData"; // Prop firms data
import { brokersData } from "@/Data/brokersData"; // ✅ Fixed import
import { Star, Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showPropFirms, setShowPropFirms] = useState(true); // ✅ Default to Prop Firms

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="relative flex bg-zinc-800 border border-zinc-700 rounded-full p-1 w-72">
            <motion.div
              className="absolute top-1 left-1 h-8 w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 z-0"
              animate={{ x: showPropFirms ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <button
              onClick={() => setShowPropFirms(true)}
              className={`relative z-10 w-1/2 text-center font-medium px-4 py-2 rounded-full transition ${
                showPropFirms ? "text-black font-bold" : "text-zinc-400"
              }`}
            >
              Prop Firms
            </button>
            <button
              onClick={() => setShowPropFirms(false)}
              className={`relative z-10 w-1/2 text-center font-medium px-4 py-2 rounded-full transition ${
                !showPropFirms ? "text-black font-bold" : "text-zinc-400"
              }`}
            >
              Brokers
            </button>
          </div>
        </div>

        {/* Prop Firms Section */}
        {showPropFirms ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-8">
              🔥 Exclusive Offers for Prop Firms
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challengesData.map((firm) => {
                const hasDiscount = firm.discount && firm.discount > 0;

                return (
                  <div
                    key={firm.id}
                    className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg hover:shadow-pink-500/30 transition duration-300"
                  >
                    {hasDiscount && (
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-black font-bold text-center rounded-full py-2 mb-4 shadow-md">
                        🎉 Save {firm.discount}% Today!
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-bold text-white">
                        {firm.firm}
                      </h2>
                      <div className="flex items-center text-yellow-400">
                        {Array(Math.round(firm.rating))
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        <span className="ml-2 text-sm text-zinc-300">
                          ({firm.rating})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-zinc-700 px-3 py-1 rounded-full text-sm">
                        CODE:{" "}
                        <strong className="text-pink-400">
                          SAVE{firm.discount}
                        </strong>
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-black"
                        onClick={() => handleCopy(`SAVE${firm.discount}`)}
                      >
                        <Copy size={16} className="mr-1" />
                        {copiedCode === `SAVE${firm.discount}`
                          ? "Copied!"
                          : "Copy"}
                      </Button>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg rounded-full mt-2"
                      onClick={() =>
                        alert(`Buying ${firm.firm} with discount SAVE${firm.discount}`)
                      }
                    >
                      Buy Now
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          // Brokers Section
          <>
            <h1 className="text-3xl font-bold text-white mb-8">
              💸 Exclusive Broker Offers
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brokersData.map((broker) => (
                <div
                  key={broker.id}
                  className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg hover:shadow-purple-500/30 transition duration-300"
                >
                  {/* Bonus Badge */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold text-center rounded-full py-2 mb-4 shadow-md">
                    🎁 {broker.bonusOffer}
                  </div>

                  {/* Broker Name */}
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {broker.name}
                  </h2>

                  {/* Features */}
                  <ul className="list-disc pl-5 text-zinc-300 mb-4 space-y-1">
                    {broker.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>

                  {/* Note */}
                  <p className="text-xs text-zinc-400 italic mb-3">
                    ⚠ Offer only works through this link
                  </p>

                  {/* Sign Up Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg rounded-full"
                    onClick={() => window.open(broker.signupLink, "_blank")}
                  >
                    Sign Up
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
