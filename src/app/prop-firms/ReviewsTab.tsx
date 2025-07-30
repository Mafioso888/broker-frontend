'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, User, TrendingUp, Award, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const propFirms = [
  {
    name: "Alpha Capital",
    tradingConditions: 4.9,
    customerCare: 4.8,
    userFriendliness: 4.7,
    payoutProcess: 4.9,
    totalReviews: 312,
  },
  {
    name: "NextGen Funded",
    tradingConditions: 4.7,
    customerCare: 4.6,
    userFriendliness: 4.8,
    payoutProcess: 4.7,
    totalReviews: 245,
  },
  {
    name: "Falcon FX",
    tradingConditions: 4.5,
    customerCare: 4.4,
    userFriendliness: 4.6,
    payoutProcess: 4.5,
    totalReviews: 189,
  },
];

const userReviews = [
  { user: "Alex T.", comment: "Alpha Capital payout process is lightning fast! 🚀", rating: 5 },
  { user: "Maria L.", comment: "NextGen’s platform is so user friendly. Passed challenge smoothly.", rating: 5 },
  { user: "James P.", comment: "Falcon FX’s support team is helpful but payouts take 2 days.", rating: 4 },
  { user: "Sophie K.", comment: "Alpha Capital has fair rules and excellent customer care.", rating: 5 },
  { user: "David R.", comment: "NextGen’s dashboard is sleek and intuitive. Love it!", rating: 5 },
  { user: "Emily S.", comment: "Falcon FX needs to improve customer care but overall great.", rating: 4 },
];

const rowsPerPage = 4;

export default function ReviewsTab() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(userReviews.length / rowsPerPage);

  const paginatedReviews = userReviews.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const filteredPropFirms = propFirms.filter((firm) =>
    firm.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-text-shine">
        ⭐ Prop Firm Reviews & Rankings
      </h1>
      <p className="text-center text-zinc-400 mb-10">
        See how top prop firms are rated by traders across all key categories.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search prop firms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* 🌟 Prop Firm Ranking Cards */}
      <h2 className="text-3xl font-bold text-center text-zinc-200 mb-6">
        🌟 Prop Firm Rankings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPropFirms.map((firm, index) => (
          <motion.div
            key={firm.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] transition duration-300"
          >
            <div className="absolute top-3 right-3 bg-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-200">
              #{index + 1} Rank
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award size={20} className="text-yellow-400" />
                {firm.name}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="bg-zinc-800 px-2 py-1 rounded">
                  Trading: <span className="text-yellow-400">{firm.tradingConditions}⭐</span>
                </p>
                <p className="bg-zinc-800 px-2 py-1 rounded">
                  Support: <span className="text-yellow-400">{firm.customerCare}⭐</span>
                </p>
                <p className="bg-zinc-800 px-2 py-1 rounded">
                  User Friendly: <span className="text-yellow-400">{firm.userFriendliness}⭐</span>
                </p>
                <p className="bg-zinc-800 px-2 py-1 rounded">
                  Payouts: <span className="text-yellow-400">{firm.payoutProcess}⭐</span>
                </p>
              </div>
              <p className="text-sm text-zinc-300 mt-2">
                <TrendingUp size={16} className="inline mr-1 text-green-400" />
                {firm.totalReviews} verified reviews
              </p>
              <Button className="w-full bg-zinc-800 text-white rounded-full hover:bg-zinc-700 hover:scale-105 transition">
                View Reviews
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 💬 User Reviews */}
      <h2 className="text-3xl font-bold text-center mt-12 text-zinc-200 mb-6">
        💬 Trader Experiences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {paginatedReviews.map((review, idx) => (
          <motion.div
            key={review.user + idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 hover:shadow-pink-500/20 transition duration-300"
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

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
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
          className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
        >
          Next
        </Button>
      </div>

      {/* 📬 Subscribe */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Get the Latest Prop Firm Reviews</h2>
        <p className="text-zinc-400 mb-6">
          Exclusive rankings, trader tips, and bonus alerts straight to your inbox.
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
