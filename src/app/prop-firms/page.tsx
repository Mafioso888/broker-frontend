"use client";
import ReviewsTab from "./ReviewsTab";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star, Copy } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import ChallengesTab from "./ChallengesTab";
import { challengesData } from "@/Data/challengesData";

const propFirms = [
  {
    name: "Alpha Capital",
    rating: 4.8,
    country: "USA",
    assets: ["Forex", "Crypto"],
    platforms: ["MT5", "MetaTrader Web"],
    years: 5,
    maxAllocation: 200000,
    promo: "10% Welcome Bonus",
    discount: 15,
    rules: [
      "Minimum 5 trading days per phase",
      "Daily drawdown limit: 5%",
      "Overall drawdown limit: 10%",
      "No weekend holding",
      "EA trading allowed",
    ],
  },
  {
    name: "Quantum Prop",
    rating: 4.2,
    country: "Germany",
    assets: ["Crypto", "Indices"],
    platforms: ["TradeLocker", "Match Trader"],
    years: 4,
    maxAllocation: 150000,
    promo: "No commission on trades",
    discount: 20,
    rules: [
      "Maximum leverage: 1:30",
      "Scaling plan available",
      "Weekend trading not allowed",
      "News trading prohibited",
    ],
  },
  {
    name: "Capital Surge",
    rating: 4.7,
    country: "Canada",
    assets: ["Forex", "Indices"],
    platforms: ["cTrader", "TradingView"],
    years: 6,
    maxAllocation: 1000000,
    promo: "Double your funding",
    discount: 25,
    rules: [
      "Minimum lot size: 0.1",
      "No overnight positions",
      "Phase 1 target: 10%",
      "Phase 2 target: 5%",
    ],
  },
];

const countries = [...new Set(propFirms.map((firm) => firm.country))];
const platforms = [...new Set(propFirms.flatMap((firm) => firm.platforms))];
const assets = [...new Set(propFirms.flatMap((firm) => firm.assets))];

export default function PropFirmsPage() {
  const [activeTab, setActiveTab] = useState("firms");
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
const [expandedFirms, setExpandedFirms] = useState<string[]>([]);

const toggleExpand = (firmName: string) => {
  setExpandedFirms((prev) =>
    prev.includes(firmName)
      ? prev.filter((name) => name !== firmName)
      : [...prev, firmName]
  );
};

  const filteredFirms = propFirms.filter((firm) => {
    return (
      firm.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCountries.length === 0 || selectedCountries.includes(firm.country)) &&
      (selectedAssets.length === 0 || selectedAssets.some((a) => firm.assets.includes(a))) &&
      (selectedPlatforms.length === 0 || selectedPlatforms.some((p) => firm.platforms.includes(p)))
    );
  });

  const toggleSelection = (value: string, setValue: any, current: string[]) => {
    if (current.includes(value)) {
      setValue(current.filter((v) => v !== value));
    } else {
      setValue([...current, value]);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabStyle = (tab: string) =>
    `px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      activeTab === tab
        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow"
        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
    }`;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Prop Firms</h1>

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <button onClick={() => setActiveTab("firms")} className={tabStyle("firms")}>
          Firms
        </button>
        <button onClick={() => setActiveTab("challenges")} className={tabStyle("challenges")}>
          Challenges
        </button>
        <button onClick={() => setActiveTab("offers")} className={tabStyle("offers")}>
          Offers
        </button>
        <button onClick={() => setActiveTab("rules")} className={tabStyle("rules")}>
          Rules
        </button>
        <button onClick={() => setActiveTab("reviews")} className={tabStyle("reviews")}>
          Reviews
        </button>
      </div>

      {/* FIRMS TAB */}
      {activeTab === "firms" && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6 max-w-6xl mx-auto">
            <Input
              placeholder="Search firms..."
              className="w-full md:w-1/3 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Country Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Country <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 bg-zinc-900 border-white/10 text-white">
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

            {/* Assets Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Assets <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 bg-zinc-900 border-white/10 text-white">
                {assets.map((a) => (
                  <div key={a} className="flex items-center gap-2 py-1">
                    <Checkbox
                      checked={selectedAssets.includes(a)}
                      onCheckedChange={() => toggleSelection(a, setSelectedAssets, selectedAssets)}
                    />
                    <span>{a}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            {/* Platform Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Platform <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-zinc-900 border-white/10 text-white">
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
          </div>

          {/* Firm Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-10">
            {filteredFirms.map((firm, index) => (
              <motion.div
                key={firm.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900 border border-zinc-700 text-white shadow-xl rounded-2xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{firm.name}</h3>
                      <span className="text-pink-500 font-bold">⭐ {firm.rating}</span>
                    </div>
                    <div className="text-sm">{firm.country} • {firm.years} years</div>
                    <div className="text-sm">Assets: <span className="text-zinc-300">{firm.assets.join(", ")}</span></div>
                    <div className="text-sm">Platforms: <span className="text-zinc-300">{firm.platforms.join(", ")}</span></div>
                    <div className="text-sm">Max Allocation: <span className="text-green-400 font-medium">${firm.maxAllocation.toLocaleString()}</span></div>
                    <div className="text-sm italic text-pink-400">{firm.promo}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Prop Firm Comparison Table</h2>
          <div className="sticky top-[64px] z-40 bg-black border-y border-white/10 shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-zinc-800">
            <div className="grid text-sm text-white font-semibold grid-cols-9 min-w-[800px]">
              <div className="px-4 py-3">Firm</div>
              <div className="px-4 py-3">Rating</div>
              <div className="px-4 py-3">Country</div>
              <div className="px-4 py-3">Years</div>
              <div className="px-4 py-3">Assets</div>
              <div className="px-4 py-3">Platforms</div>
              <div className="px-4 py-3">Max Allocation</div>
              <div className="px-4 py-3">Promo</div>
              <div className="px-4 py-3">Actions</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="grid text-sm text-white border-b border-zinc-800 grid-cols-9 min-w-[800px]">
              {filteredFirms.map((firm) => (
                <div key={firm.name} className="contents hover:bg-zinc-900 transition">
                  <div className="px-4 py-3 font-medium">{firm.name}</div>
                  <div className="px-4 py-3">⭐ {firm.rating}</div>
                  <div className="px-4 py-3">{firm.country}</div>
                  <div className="px-4 py-3">{firm.years} yrs</div>
                  <div className="px-4 py-3">{firm.assets.join(", ")}</div>
                  <div className="px-4 py-3">{firm.platforms.join(", ")}</div>
                  <div className="px-4 py-3">${firm.maxAllocation.toLocaleString()}</div>
                  <div className="px-4 py-3">{firm.promo}</div>
                  <div className="px-4 py-3">
                    <button className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-xs">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Never Miss a Prop Firm Update</h2>
            <p className="text-zinc-400 mb-6">Subscribe to get the latest news, offers, and challenges straight to your inbox.</p>
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

      {/* CHALLENGES TAB */}
      {activeTab === "challenges" && <ChallengesTab />}

      {/* OFFERS TAB */}
      {activeTab === "offers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {challengesData.map((firm) => (
            <div
              key={firm.id}
              className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg hover:shadow-pink-500/30 transition duration-300"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-black font-bold text-center rounded-full py-2 mb-4 shadow-md">
                🎉 Save {firm.discount}% Today!
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{firm.firm}</h2>
              <div className="flex items-center text-yellow-400 mb-3">
                {Array(Math.round(firm.rating)).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span className="ml-2 text-sm text-zinc-300">({firm.rating})</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full mt-2"
                onClick={() => alert(`Buying ${firm.firm}`)}
              >
                Buy Now
              </Button>
            </div>
          ))}
        </div>
      )}

      
{/* RULES TAB */}
{activeTab === "rules" && (
  <div className="max-w-5xl mx-auto grid gap-6">
    {propFirms.map((firm) => {
      const isExpanded = expandedFirms.includes(firm.name);
      return (
        <div
          key={firm.name}
          className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-white">{firm.name} Rules</h2>
            <div className="flex items-center text-yellow-400">
              {Array(Math.round(firm.rating))
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              <span className="ml-2 text-sm text-zinc-300">({firm.rating})</span>
            </div>
          </div>

          <ul className="list-disc pl-5 text-zinc-300 space-y-1">
            {(isExpanded ? firm.rules : firm.rules.slice(0, 2)).map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>

          {firm.rules.length > 2 && (
            <Button
              variant="ghost"
              className="mt-3 text-pink-400 hover:text-pink-300"
              onClick={() => toggleExpand(firm.name)}
            >
              {isExpanded ? "Collapse ▲" : "Expand ▼"}
            </Button>
          )}
        </div>
      );
    })}
  </div>
)}

{/* REVIEWS TAB */}
{activeTab === "reviews" && <ReviewsTab />}


    </div>
  );
}
