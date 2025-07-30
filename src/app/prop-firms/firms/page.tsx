"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const propFirms = [
  {
    name: "Alpha Capital",
    rating: 4.8,
    country: "USA",
    assets: ["Forex", "Crypto"],
    platforms: ["MT5", "MetaTrader Web"],
    years: 5,
    maxAllocation: 200000,
    promo: "10% Welcome Bonus"
  },
  {
    name: "Quantum Prop",
    rating: 4.2,
    country: "Germany",
    assets: ["Crypto", "Indices"],
    platforms: ["TradeLocker", "Match Trader"],
    years: 4,
    maxAllocation: 150000,
    promo: "No commission on trades"
  },
  {
    name: "Capital Surge",
    rating: 4.7,
    country: "Canada",
    assets: ["Forex", "Indices"],
    platforms: ["cTrader", "TradingView"],
    years: 6,
    maxAllocation: 1000000,
    promo: "Double your funding"
  }
];

const countries = [...new Set(propFirms.map(firm => firm.country))];
const platforms = [...new Set(propFirms.flatMap(firm => firm.platforms))];
const assets = [...new Set(propFirms.flatMap(firm => firm.assets))];

export default function PropFirmsPage() {
  const [activeTab, setActiveTab] = useState("firms");
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const filteredFirms = propFirms.filter((firm) => {
    return (
      firm.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCountries.length === 0 || selectedCountries.includes(firm.country)) &&
      (selectedAssets.length === 0 || selectedAssets.some(asset => firm.assets.includes(asset))) &&
      (selectedPlatforms.length === 0 || selectedPlatforms.some(p => firm.platforms.includes(p)))
    );
  });

  const toggleSelection = (value: string, setValue: any, current: string[]) => {
    if (current.includes(value)) {
      setValue(current.filter((v) => v !== value));
    } else {
      setValue([...current, value]);
    }
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
        <button onClick={() => setActiveTab("firms")} className={tabStyle("firms")}>Firms</button>
        <button onClick={() => setActiveTab("challenges")} className={tabStyle("challenges")}>Challenges</button>
        <button onClick={() => setActiveTab("offers")} className={tabStyle("offers")}>Offers</button>
        <button onClick={() => setActiveTab("reviews")} className={tabStyle("reviews")}>Reviews</button>
      </div>

      {activeTab === "firms" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6 max-w-6xl mx-auto">
            <Input 
              placeholder="Search firms..." 
              className="w-full md:w-1/3 text-black" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Country <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 bg-zinc-900 border-white/10 text-white">
                {countries.map((c) => (
                  <div key={c} className="flex items-center gap-2 py-1">
                    <Checkbox checked={selectedCountries.includes(c)} onCheckedChange={() => toggleSelection(c, setSelectedCountries, selectedCountries)} />
                    <span>{c}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Assets <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 bg-zinc-900 border-white/10 text-white">
                {assets.map((a) => (
                  <div key={a} className="flex items-center gap-2 py-1">
                    <Checkbox checked={selectedAssets.includes(a)} onCheckedChange={() => toggleSelection(a, setSelectedAssets, selectedAssets)} />
                    <span>{a}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 bg-zinc-800 hover:bg-zinc-700">
                  Platform <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-zinc-900 border-white/10 text-white">
                {platforms.map((p) => (
                  <div key={p} className="flex items-center gap-2 py-1">
                    <Checkbox checked={selectedPlatforms.includes(p)} onCheckedChange={() => toggleSelection(p, setSelectedPlatforms, selectedPlatforms)} />
                    <span>{p}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
        </>
      )}

      {activeTab === "challenges" && (
        <div className="text-center text-zinc-400 mt-10">Challenge information coming soon...</div>
      )}

      {activeTab === "offers" && (
        <div className="text-center text-zinc-400 mt-10">Offer details will be displayed here.</div>
      )}

      {activeTab === "reviews" && (
        <div className="text-center text-zinc-400 mt-10">User reviews and ratings will appear here.</div>
      )}
    </div>
  );
}
