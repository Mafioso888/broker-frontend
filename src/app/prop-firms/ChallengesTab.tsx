"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { challengesData } from "@/Data/challengesData";

const assetsOptions = ["forex", "crypto", "indices", "stocks", "commodities"];
const sizeOptions = ["$5k", "$25k", "$50k", "$100k", "$200k"];
const stepsOptions = ["1 Step", "2 Step", "3 Step"];
const payoutOptions = ["Weekly", "Bi-weekly", "Monthly"];
const sortOptions = [
  { label: "Price: Low → High", value: "priceAsc" },
  { label: "Price: High → Low", value: "priceDesc" },
  { label: "Rating: High → Low", value: "ratingDesc" },
  { label: "Newest", value: "newest" },
];

export default function ChallengesTab() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showDiscounts, setShowDiscounts] = useState(true);
  const [sortBy, setSortBy] = useState("priceAsc"); // ✅ Default sort

  const toggle = (
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const calculateDiscountedPrice = (price: string, discount: number) => {
    const priceValue = parseFloat(price.replace(/[^0-9.]/g, ""));
    return (priceValue - priceValue * (discount / 100)).toFixed(2);
  };

  const filteredData = useMemo(() => {
    let data = challengesData.filter((item) => {
      const assetMatch = selectedAssets.length
        ? selectedAssets.includes(item.asset.toLowerCase())
        : true;
      const sizeMatch = selectedSizes.length
        ? selectedSizes.includes(item.accountSize)
        : true;
      const stepsMatch = selectedSteps.length
        ? selectedSteps.includes(item.steps)
        : true;
      const payoutMatch = selectedPayouts.length
        ? selectedPayouts.includes(item.payoutFrequency)
        : true;
      const searchMatch = item.firm
        .toLowerCase()
        .includes(search.toLowerCase());
      return (
        assetMatch && sizeMatch && stepsMatch && payoutMatch && searchMatch
      );
    });

    // Sorting logic
    data = data.sort((a, b) => {
      const priceA = parseFloat(
        (showDiscounts && a.discount
          ? calculateDiscountedPrice(a.price, a.discount)
          : a.price
        ).replace(/[^0-9.]/g, "")
      );
      const priceB = parseFloat(
        (showDiscounts && b.discount
          ? calculateDiscountedPrice(b.price, b.discount)
          : b.price
        ).replace(/[^0-9.]/g, "")
      );

      switch (sortBy) {
        case "priceAsc":
          return priceA - priceB;
        case "priceDesc":
          return priceB - priceA;
        case "ratingDesc":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id; // higher id = newer
        default:
          return 0;
      }
    });

    return data;
  }, [
    selectedAssets,
    selectedSizes,
    selectedSteps,
    selectedPayouts,
    search,
    showDiscounts,
    sortBy,
  ]);

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-6">
      {/* FILTERS */}
      <section className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center space-x-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showDiscounts}
              onChange={() => setShowDiscounts(!showDiscounts)}
              className="accent-pink-500 mr-2"
            />
            Show Discounts
          </label>
        </div>
        <MultiSelect
          title="Assets"
          options={assetsOptions}
          selected={selectedAssets}
          toggle={(v) => toggle(v, selectedAssets, setSelectedAssets)}
        />
        <MultiSelect
          title="Account Size"
          options={sizeOptions}
          selected={selectedSizes}
          toggle={(v) => toggle(v, selectedSizes, setSelectedSizes)}
        />
        <MultiSelect
          title="Steps"
          options={stepsOptions}
          selected={selectedSteps}
          toggle={(v) => toggle(v, selectedSteps, setSelectedSteps)}
        />
        <MultiSelect
          title="Payout"
          options={payoutOptions}
          selected={selectedPayouts}
          toggle={(v) => toggle(v, selectedPayouts, setSelectedPayouts)}
        />
        <Input
          placeholder="Search firm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 text-white border border-zinc-700 rounded-full px-4 py-2 w-60"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      {/* TABLE */}
      <div className="overflow-x-auto custom-scrollbar max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <motion.div
              layout
              className="space-y-4 min-w-[900px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredData.map((item) => {
                const hasDiscount = item.discount && item.discount > 0;
                const discountedPrice = hasDiscount
                  ? calculateDiscountedPrice(item.price, item.discount)
                  : null;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-md flex justify-between items-center gap-6 hover:shadow-pink-500/20 transition duration-300"
                  >
                    {/* Firm info */}
                    <div className="min-w-[200px]">
                      <h2 className="text-lg font-bold text-pink-400">
                        {item.firm}
                      </h2>
                      <p className="text-sm text-zinc-400">
                        Rating: {item.rating} ⭐
                      </p>
                    </div>

                    {/* Challenge details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm text-white w-full">
                      <div>
                        <span className="block text-zinc-400">Size</span>
                        {item.accountSize}
                      </div>
                      <div>
                        <span className="block text-zinc-400">Target</span>
                        {Array.isArray(item.profitTargets) && item.profitTargets.length > 0 ? (
                          <span className="text-pink-400">
                            {item.profitTargets.join(", ")}
                          </span>
                        ) : (
                          <span className="text-zinc-500">N/A</span>
                        )}
                      </div>
                      <div>
                        <span className="block text-zinc-400">Steps</span>
                        {item.steps}
                      </div>
                      <div>
                        <span className="block text-zinc-400">Payout</span>
                        {item.payoutFrequency}
                      </div>
                      <div>
                        <span className="block text-zinc-400">Drawdowns</span>
                        <div className="space-y-1">
                          <div>
                            Max Daily:{" "}
                            <span className="text-pink-400">
                              {item.maxDailyLoss}
                            </span>
                          </div>
                          <div>
                            Max Loss:{" "}
                            <span className="text-pink-400">
                              {item.maxLoss}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="block text-zinc-400">Price</span>
                        {showDiscounts && hasDiscount ? (
                          <>
                            <span className="line-through text-zinc-500">
                              {item.price}
                            </span>
                            <span className="block text-pink-500 font-semibold">
                              ${discountedPrice}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-pink-500">
                            {item.price}
                          </span>
                        )}
                        <Button
                          className="mt-2 bg-pink-500 hover:bg-pink-600 text-white w-full rounded-full"
                          onClick={() => alert(`Buying ${item.firm}`)}
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-500 mt-12"
            >
              No challenges match your filters.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MultiSelect({
  title,
  options,
  selected,
  toggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  toggle: (value: string) => void;
}) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-white hover:bg-zinc-800">
        {title} <ChevronDown className="ml-1 h-4 w-4 text-zinc-400" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg p-2 max-h-56 overflow-y-auto text-sm">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 py-1 cursor-pointer text-white"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="accent-pink-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </Popover.Panel>
    </Popover>
  );
}
