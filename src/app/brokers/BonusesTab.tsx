'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const bonuses = [
  { name: "SwiftMarkets", bonus: "🎁 100% Deposit Bonus", type: "Welcome Bonus", limited: true },
  { name: "Fusion Brokers", bonus: "🎁 50% Welcome Bonus", type: "Reload Bonus", limited: false },
  { name: "GlobalFX", bonus: "🎁 No Deposit Bonus $30", type: "No Deposit Bonus", limited: true },
  { name: "Nova Brokers", bonus: "🎁 30% Reload Bonus", type: "Reload Bonus", limited: false },
  { name: "EliteFX", bonus: "🎁 $500 Cashback", type: "Cashback Bonus", limited: true },
  { name: "PrimeTrade", bonus: "🎁 40% Deposit Match", type: "Deposit Bonus", limited: false },
  { name: "ZenithMarkets", bonus: "🎁 Free VPS + $100 Bonus", type: "Combo Bonus", limited: true },
  { name: "MegaTrade", bonus: "🎁 20% Loyalty Bonus", type: "Loyalty Bonus", limited: false },
  { name: "UltraFX", bonus: "🎁 $200 Referral Bonus", type: "Referral Bonus", limited: true },
  { name: "NextGenFX", bonus: "🎁 15% Cashback", type: "Cashback Bonus", limited: true },
  { name: "AlphaBrokers", bonus: "🎁 Free Signals + 50% Bonus", type: "Combo Bonus", limited: false },
  { name: "QuantumTrade", bonus: "🎁 Double Deposit Bonus", type: "Deposit Bonus", limited: true },
];

const cardsPerPage = 3;
const tableRowsPerPage = 10;

export default function BonusesTab() {
  const [cardPage, setCardPage] = useState(1);
  const [tablePage, setTablePage] = useState(1);

  const totalCardPages = Math.ceil(bonuses.length / cardsPerPage);
  const totalTablePages = Math.ceil(bonuses.length / tableRowsPerPage);

  const paginatedBonuses = bonuses.slice(
    (cardPage - 1) * cardsPerPage,
    cardPage * cardsPerPage
  );

  const paginatedTableRows = bonuses.slice(
    (tablePage - 1) * tableRowsPerPage,
    tablePage * tableRowsPerPage
  );

  const featuredBonuses = [bonuses[0], bonuses[1]];

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
        🎁 Exclusive Broker Bonuses
      </h1>
      <p className="text-center text-zinc-400 mb-8">
        Discover the hottest bonuses and limited-time offers from trusted brokers.
      </p>

      {/* 🌟 Best Offers This Month */}
      <h2 className="text-3xl font-bold text-center text-zinc-200 mb-6">
        🌟 Best Offers This Month
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {featuredBonuses.map((bonus, index) => (
          <motion.div
            key={bonus.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative bg-black/70 backdrop-blur-xl border border-zinc-700 shadow-lg rounded-2xl p-6 overflow-hidden hover:shadow-pink-500/20 transition duration-300"
          >
            {/* Floating Glow Dot */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-md animate-pulse"></div>

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                🚀 {bonus.name}
              </h3>
              <p className="text-lg font-semibold text-yellow-300 mb-1">{bonus.bonus}</p>
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-black text-xs font-medium px-3 py-1 rounded-full mb-3">
                {bonus.type}
              </span>
              {bonus.limited && (
                <p className="text-sm text-red-400 mb-3">🔥 Limited Time Only</p>
              )}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
                Claim Featured Bonus
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 Top Offers */}
      <h2 className="text-3xl font-bold text-center text-zinc-200 mt-10 mb-6">
        🔥 Top Offers
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {paginatedBonuses.map((bonus, index) => (
          <motion.div
            key={bonus.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:shadow-pink-500/10 transition duration-500"
          >
            <h4 className="text-xl font-semibold mb-2 text-white">{bonus.name}</h4>
            <div className="text-lg font-bold text-yellow-400 mb-3">{bonus.bonus}</div>
            <span className="inline-block bg-zinc-800 text-zinc-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {bonus.type}
            </span>
            {bonus.limited && (
              <p className="text-xs text-red-500 mb-3">🔥 Limited Time Offer!</p>
            )}
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 transition">
              Claim Bonus
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Pagination for Top Offers */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          disabled={cardPage === 1}
          onClick={() => setCardPage(cardPage - 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
        >
          Previous
        </Button>
        {[...Array(totalCardPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCardPage(i + 1)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium transition",
              cardPage === i + 1
                ? "bg-zinc-800 text-white font-semibold shadow-md"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            )}
          >
            {i + 1}
          </button>
        ))}
        <Button
          disabled={cardPage === totalCardPages}
          onClick={() => setCardPage(cardPage + 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
        >
          Next
        </Button>
      </div>

      {/* 📊 Bonus Comparison Table */}
      <h2 className="text-3xl font-bold text-center mt-14 mb-4 text-zinc-200">
        📊 Bonus Comparison Table
      </h2>
      <p className="text-center text-zinc-400 mb-6">
        Quickly compare bonus types, limitations, and availability.
      </p>
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-[64px] z-40 bg-black border-y border-white/10 shadow-sm">
          <div className="grid grid-cols-5 text-sm text-white font-semibold">
            <div className="px-4 py-3">Broker</div>
            <div className="px-4 py-3">Bonus</div>
            <div className="px-4 py-3">Type</div>
            <div className="px-4 py-3">Limited Offer</div>
            <div className="px-4 py-3">Action</div>
          </div>
        </div>
        {paginatedTableRows.map((bonus, idx) => (
          <motion.div
            key={bonus.name + idx}
            className="grid grid-cols-5 text-sm text-white border-b border-zinc-800 hover:bg-zinc-900 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="px-4 py-3 font-medium">{bonus.name}</div>
            <div className="px-4 py-3">{bonus.bonus}</div>
            <div className="px-4 py-3">{bonus.type}</div>
            <div className="px-4 py-3">{bonus.limited ? "🔥 Yes" : "✅ No"}</div>
            <div className="px-4 py-3">
              <Button size="sm" className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600">
                Claim
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          disabled={tablePage === 1}
          onClick={() => setTablePage(tablePage - 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
        >
          Previous
        </Button>
        {[...Array(totalTablePages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setTablePage(i + 1)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium transition",
              tablePage === i + 1
                ? "bg-zinc-800 text-white font-semibold shadow-md"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            )}
          >
            {i + 1}
          </button>
        ))}
        <Button
          disabled={tablePage === totalTablePages}
          onClick={() => setTablePage(tablePage + 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
        >
          Next
        </Button>
      </div>

      {/* 📬 Subscribe Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated With Broker Bonuses</h2>
        <p className="text-zinc-400 mb-6">
          Subscribe to receive the latest broker deals and bonus offers directly in your inbox.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-black/80 text-white w-full sm:w-auto sm:flex-1 border border-zinc-700"
          />
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:opacity-90">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
