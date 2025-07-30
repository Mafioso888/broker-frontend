'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

// ✅ Broker ratings data
const brokers = [
  {
    name: "SwiftMarkets",
    overallRating: 4.8,
    reviews: 128,
    categories: {
      tradingConditions: 4.9,
      support: 4.7,
      platform: 4.8,
      payout: 4.6,
    },
    highlight: "Best for Tight Spreads",
  },
  {
    name: "Fusion Brokers",
    overallRating: 4.6,
    reviews: 94,
    categories: {
      tradingConditions: 4.5,
      support: 4.8,
      platform: 4.4,
      payout: 4.5,
    },
    highlight: "Top Regulation Standards",
  },
  {
    name: "GlobalFX",
    overallRating: 4.3,
    reviews: 76,
    categories: {
      tradingConditions: 4.2,
      support: 4.1,
      platform: 4.3,
      payout: 4.0,
    },
    highlight: "24/7 Customer Support",
  },
  {
    name: "Nova Brokers",
    overallRating: 4.7,
    reviews: 102,
    categories: {
      tradingConditions: 4.8,
      support: 4.6,
      platform: 4.7,
      payout: 4.5,
    },
    highlight: "Zero Fees on Withdrawals",
  },
  // Add more brokers here...
];

// 💬 User reviews data
const userReviews = [
  { user: "Alex T.", comment: "SwiftMarkets has been a game changer! 💥 Tight spreads and fast execution.", rating: 5 },
  { user: "Maria L.", comment: "Fusion Brokers' support team is excellent. Felt secure trading with them.", rating: 4 },
  { user: "James P.", comment: "GlobalFX has great bonuses, but wish they offered more platforms.", rating: 4 },
  { user: "Sophie K.", comment: "Nova Brokers is fantastic! Easy withdrawals and great mobile app.", rating: 5 },
  { user: "David R.", comment: "Tried many brokers, Nova stands out for their no fees. Highly recommend!", rating: 5 },
  { user: "Emily S.", comment: "Fusion’s regulation made me confident. Love the trading conditions.", rating: 4 },
  // Add more reviews...
];

const rowsPerPage = 3;

export default function BrokersReviewsTab() {
  const [page, setPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(brokers.length / rowsPerPage);
  const totalUserPages = Math.ceil(userReviews.length / rowsPerPage);

  const filteredBrokers = brokers.filter((broker) =>
    broker.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedBrokers = filteredBrokers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const paginatedUserReviews = userReviews.slice(
    (userPage - 1) * rowsPerPage,
    userPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
      >
        ⭐ Broker Reviews & Ratings
      </motion.h1>
      <p className="text-center text-zinc-400 mb-8">
        Real trader reviews on trading conditions, support, platforms, and payouts.
      </p>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search brokers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border border-zinc-700 text-white rounded-full"
          />
        </div>
      </div>

      {/* 🔥 Broker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paginatedBrokers.map((broker, index) => (
          <motion.div
            key={broker.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 space-y-4 shadow hover:shadow-pink-500/30 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{broker.name}</h3>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={18} /> <span>{broker.overallRating}</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400">{broker.reviews} reviews</p>
            <span className="inline-block bg-pink-500 text-black text-xs font-medium px-3 py-1 rounded-full">
              {broker.highlight}
            </span>

            {/* Rating Categories */}
            <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300 mt-3">
              <div>
                <span className="block text-zinc-500">Trading Conditions</span>
                {broker.categories.tradingConditions}⭐
              </div>
              <div>
                <span className="block text-zinc-500">Support</span>
                {broker.categories.support}⭐
              </div>
              <div>
                <span className="block text-zinc-500">Platform</span>
                {broker.categories.platform}⭐
              </div>
              <div>
                <span className="block text-zinc-500">Payout Process</span>
                {broker.categories.payout}⭐
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full mt-4">
              View Full Reviews
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Pagination for Brokers */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium transition",
              page === i + 1
                ? "bg-zinc-800 text-white font-semibold shadow-md"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            )}
          >
            {i + 1}
          </button>
        ))}
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
        >
          Next
        </Button>
      </div>

      {/* 💬 User Reviews */}
      <h2 className="text-3xl font-bold text-center mt-12 text-zinc-200 mb-6">
        💬 Trader User Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {paginatedUserReviews.map((review, idx) => (
          <motion.div
            key={review.user + idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-3 hover:shadow-pink-500/30 transition duration-300"
          >
            <div className="flex items-center gap-3">
              <User size={28} className="text-pink-500" />
              <div>
                <h4 className="text-lg font-bold text-white">{review.user}</h4>
                <p className="text-sm text-yellow-400 flex items-center gap-1">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </p>
              </div>
            </div>
            <p className="text-zinc-300">{review.comment}</p>
          </motion.div>
        ))}
      </div>

      {/* Pagination for User Reviews */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          disabled={userPage === 1}
          onClick={() => setUserPage(userPage - 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
        >
          Previous
        </Button>
        {[...Array(totalUserPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setUserPage(i + 1)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium transition",
              userPage === i + 1
                ? "bg-zinc-800 text-white font-semibold shadow-md"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            )}
          >
            {i + 1}
          </button>
        ))}
        <Button
          disabled={userPage === totalUserPages}
          onClick={() => setUserPage(userPage + 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
        >
          Next
        </Button>
      </div>

      {/* 📬 Subscribe */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay in the Loop</h2>
        <p className="text-zinc-400 mb-6">
          Get exclusive broker reviews, bonus alerts, and trader insights.
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
