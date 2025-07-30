'use client';

import RegulationsTab from "./regulationsTab";
import ReviewsTab from "./ReviewsTab"; 
import BonusesTab from "./BonusesTab";
import Link from 'next/link';
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShieldCheck, Gift, Globe, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const brokers = [
  {
    name: "SwiftMarkets",
    rating: 4.8,
    country: "USA",
    years: 5,
    regulation: "FCA, CySEC",
    minDeposit: 100,
    bonus: "100% Deposit Bonus",
    features: ["Tight spreads", "Negative Balance Protection", "Copy Trading"],
    platform: "MT5, WebTrader",
    spreads: { us30: "1.2", xauusd: "0.4", eurusd: "0.1" },
    regulated: true,
  },
  {
    name: "Fusion Brokers",
    rating: 4.5,
    country: "UK",
    years: 3,
    regulation: "ASIC, FSCA",
    minDeposit: 250,
    bonus: "50% Welcome Bonus",
    features: ["Free VPS", "Zero Commissions", "Multi-language Support"],
    platform: "cTrader, MT4",
    spreads: { us30: "2.1", xauusd: "1.0", eurusd: "0.5" },
    regulated: true,
  },
  {
    name: "GlobalFX",
    rating: 4.3,
    country: "Germany",
    years: 6,
    regulation: "BaFin, MiFID II",
    minDeposit: 50,
    bonus: "No Deposit Bonus $30",
    features: ["Leverage up to 1:500", "24/7 Customer Support"],
    platform: "MT5, TradingView",
    spreads: { us30: "3.0", xauusd: "1.8", eurusd: "1.2" },
    regulated: false,
  },
  {
    name: "Nova Brokers",
    rating: 4.6,
    country: "Canada",
    years: 4,
    regulation: "IIROC",
    minDeposit: 200,
    bonus: "30% Reload Bonus",
    features: ["Zero Fees", "Social Trading"],
    platform: "MT4, MetaTrader Web",
    spreads: { us30: "0.8", xauusd: "0.2", eurusd: "0.1" },
    regulated: true,
  },
];

const countries = [...new Set(brokers.map(b => b.country))];
const platforms = [...new Set(brokers.map(b => b.platform))];
const sortOptions = [
  { label: "Rating (High to Low)", value: "rating-desc" },
  { label: "Rating (Low to High)", value: "rating-asc" },
  { label: "Min Deposit (Low to High)", value: "deposit-asc" },
  { label: "Min Deposit (High to Low)", value: "deposit-desc" },
  { label: "Years Active (High to Low)", value: "years-desc" },
  { label: "Years Active (Low to High)", value: "years-asc" },
  { label: "Country (A-Z)", value: "country-asc" },
];

export default function BrokersPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showRegulated, setShowRegulated] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(brokers.length / cardsPerPage);
  const paginatedBrokers = brokers.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const sortBrokers = (data: typeof brokers) => {
    switch (sortBy) {
      case "rating-desc": return [...data].sort((a, b) => b.rating - a.rating);
      case "rating-asc": return [...data].sort((a, b) => a.rating - b.rating);
      case "deposit-asc": return [...data].sort((a, b) => a.minDeposit - b.minDeposit);
      case "deposit-desc": return [...data].sort((a, b) => b.minDeposit - a.minDeposit);
      case "years-desc": return [...data].sort((a, b) => b.years - a.years);
      case "years-asc": return [...data].sort((a, b) => a.years - b.years);
      case "country-asc": return [...data].sort((a, b) => a.country.localeCompare(b.country));
      default: return data;
    }
  };

  const filteredTableBrokers = sortBrokers(
    brokers.filter((broker) => {
      const matchesSearch = broker.name.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(broker.country);
      const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(broker.platform);
      const matchesRegulated = showRegulated === null || broker.regulated === showRegulated;

      return matchesSearch && matchesCountry && matchesPlatform && matchesRegulated;
    })
  );

  const toggleSelection = (value: string, setter: any, current: string[]) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const spreadBadge = (value: string) => {
    const num = parseFloat(value);
    if (num <= 1.0) return <span className="bg-green-500 px-2 py-0.5 rounded-full text-xs">Tight</span>;
    return <span className="bg-red-500 px-2 py-0.5 rounded-full text-xs">Wide</span>;
  };

  const tabStyle = (tab: string) =>
    `px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      activeTab === tab
        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow"
        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
    }`;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Discover Top Brokers</h1>
      {/* Tabs */}
  <div className="flex justify-center gap-4 mb-10 flex-wrap">
  <button onClick={() => setActiveTab("overview")} className={tabStyle("overview")}>Overview</button>
  <button onClick={() => setActiveTab("bonuses")} className={tabStyle("bonuses")}>Bonuses</button>
  <button onClick={() => setActiveTab("reviews")} className={tabStyle("reviews")}>Reviews</button>
  <button onClick={() => setActiveTab("regulations")} className={tabStyle("regulations")}>Regulations</button>
</div>


      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
{/* CARDS WITH PAGINATION */}

<div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto mb-8">
  {paginatedBrokers.map((broker, index) => (
    <motion.div
      key={broker.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl hover:shadow-pink-500/20 transition">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{broker.name}</h3>
            <span className="text-pink-500 font-bold flex items-center">
              <Star size={18} className="mr-1" /> {broker.rating}
            </span>
          </div>
          <div className="text-sm text-zinc-400">{broker.country}</div>
          <div className="flex gap-2 flex-wrap">
            {broker.features.map((feature, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-black px-2 py-1 rounded-full text-xs font-medium shadow"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="text-sm mt-2">
            <ShieldCheck className="inline mr-1 text-green-400" />{" "}
            <span className="text-zinc-300">{broker.regulation}</span>
          </div>
          <div className="text-sm mt-2">
            <Globe className="inline mr-1 text-blue-400" />{" "}
            <span className="text-zinc-300">{broker.platform}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-sm hover:shadow-pink-500/30 transition duration-300"
            >
              Sign Up
            </Button>
            <div className="flex items-center gap-1 text-yellow-400">
              <Gift size={18} /> {broker.bonus}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

{/* PAGINATION */}
<div className="flex justify-center gap-2 mt-6">
  <Button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
  >
    Previous
  </Button>
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
        currentPage === i + 1
          ? "bg-zinc-800 text-white font-semibold shadow-md"
          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
      }`}
    >
      {i + 1}
    </button>
  ))}
  <Button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40 transition"
  >
    Next
  </Button>
</div>

{/* Comparison Table Heading */}
<h2 className="text-2xl font-bold text-center mt-10 mb-4 text-zinc-200">
  📊 Broker Comparison Table
</h2>
<p className="text-center text-zinc-400 mb-6">
  Compare broker ratings, spreads, regulations and more in detail below.
</p>


          {/* FILTERS + SORTING */}
          <div className="flex flex-wrap gap-4 mb-6 max-w-7xl mx-auto">
            <Input
              placeholder="Search brokers..."
              className="text-black w-full md:w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-zinc-800 text-white">
                  Country <ChevronDown className="ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-zinc-900 text-white">
                {countries.map((c) => (
                  <div key={c} className="flex items-center gap-2 py-1">
                    <Checkbox
                      checked={selectedCountries.includes(c)}
                      onCheckedChange={() => toggleSelection(c, setSelectedCountries, selectedCountries)}
                    />
                    <span>{c}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-zinc-800 text-white">
                  Platform <ChevronDown className="ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-zinc-900 text-white">
                {platforms.map((p) => (
                  <div key={p} className="flex items-center gap-2 py-1">
                    <Checkbox
                      checked={selectedPlatforms.includes(p)}
                      onCheckedChange={() => toggleSelection(p, setSelectedPlatforms, selectedPlatforms)}
                    />
                    <span>{p}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              className="bg-zinc-800 text-white"
              onClick={() => setShowRegulated(showRegulated === true ? null : true)}
            >
              {showRegulated ? "Show All" : "Only Regulated"}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-800 text-white px-3 py-2 rounded-lg border border-zinc-600"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* TABLE */}
          <div className="max-w-7xl mx-auto">
            <div className="sticky top-[64px] z-40 bg-black border-y border-white/10 shadow-sm">
              <div className="grid text-sm text-white font-semibold grid-cols-9">
                <div className="px-4 py-3">Broker</div>
                <div className="px-4 py-3">Rating</div>
                <div className="px-4 py-3">Country</div>
                <div className="px-4 py-3">Years</div>
                <div className="px-4 py-3">Spread (US30)</div>
                <div className="px-4 py-3">Spread (XAUUSD)</div>
                <div className="px-4 py-3">Spread (EURUSD)</div>
                <div className="px-4 py-3">Regulated</div>
                <div className="px-4 py-3">Actions</div>
              </div>
            </div>
            {filteredTableBrokers.map((broker, idx) => (
              <motion.div
                key={broker.name}
                className="grid text-sm text-white border-b border-zinc-800 grid-cols-9 hover:bg-zinc-900 transition"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="px-4 py-3 font-medium">{broker.name}</div>
                <div className="px-4 py-3">⭐ {broker.rating}</div>
                <div className="px-4 py-3">{broker.country}</div>
                <div className="px-4 py-3">{broker.years} yrs</div>
                <div className="px-4 py-3">
                  {broker.spreads.us30} {spreadBadge(broker.spreads.us30)}
                </div>
                <div className="px-4 py-3">
                  {broker.spreads.xauusd} {spreadBadge(broker.spreads.xauusd)}
                </div>
                <div className="px-4 py-3">
                  {broker.spreads.eurusd} {spreadBadge(broker.spreads.eurusd)}
                </div>
                <div className="px-4 py-3">{broker.regulated ? "Yes" : "No"}</div>
                <div className="px-4 py-3">
                  <Button size="sm" className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600">
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated With Broker Offers</h2>
            <p className="text-zinc-400 mb-6">
              Subscribe to get the latest broker bonuses, regulations, and reviews delivered to your inbox.
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
        </>
      )}

      {/* Other Tabs */}
{activeTab === "bonuses" && <BonusesTab />}

   {activeTab === "reviews" && <ReviewsTab />}

{activeTab === "regulations" && <RegulationsTab />}

    </div>
  );
}
