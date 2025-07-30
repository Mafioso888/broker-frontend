'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Slider from '@radix-ui/react-slider';
import { Popover } from '@headlessui/react';

const firms = [
  {
    id: 1,
    name: 'Alpha Capital',
    payout: 85,
    leverage: '1:100',
    rating: 4.8,
    accountSize: 100000,
    country: 'USA',
    maxAllocation: 200000,
    yearsInOperation: 5,
    type: 'Prop Firm',
    assets: 'Forex, Crypto',
    platform: ['MT5', 'MetaTrader Web'],
    programType: ['Instant', '1 Step'],
    promo: '10% welcome bonus'
  },
  {
    id: 2,
    name: 'Fusion Traders',
    payout: 90,
    leverage: '1:200',
    rating: 4.5,
    accountSize: 50000,
    country: 'UK',
    maxAllocation: 100000,
    yearsInOperation: 3,
    type: 'Broker',
    assets: 'Stocks, Forex',
    platform: ['MT4', 'cTrader'],
    programType: ['2 Step', '3 Step'],
    promo: 'Free VPS'
  },
  {
    id: 3,
    name: 'Quantum Prop',
    payout: 80,
    leverage: '1:50',
    rating: 4.2,
    accountSize: 25000,
    country: 'Germany',
    maxAllocation: 150000,
    yearsInOperation: 4,
    type: 'Prop Firm',
    assets: 'Crypto, Indices',
    platform: ['TradeLocker', 'Match Trader'],
    programType: ['Instant', '4 Step'],
    promo: 'No commission on trades'
  },
  {
    id: 4,
    name: 'Nova Brokers',
    payout: 88,
    leverage: '1:150',
    rating: 4.6,
    accountSize: 75000,
    country: 'Canada',
    maxAllocation: 180000,
    yearsInOperation: 6,
    type: 'Broker',
    assets: 'Metals, Energy',
    platform: ['TradingView', 'MT5'],
    programType: ['1 Step', '3 Step'],
    promo: 'Cashback program'
  },
  {
    id: 7,
    name: 'Alpha Funded',
    payout: 85,
    leverage: '1:100',
    rating: 4.9,
    accountSize: 100000,
    country: 'USA',
    maxAllocation: 500000,
    yearsInOperation: 4,
    type: 'Prop Firm',
    assets: 'Forex, Crypto',
    platform: ['MT5', 'MetaTrader Web'],
    programType: ['2 Step', 'Instant'],
    promo: '10% off all challenges'
  },
  {
    id: 8,
    name: 'Capital Surge',
    payout: 90,
    leverage: '1:200',
    rating: 4.7,
    accountSize: 50000,
    country: 'Canada',
    maxAllocation: 1000000,
    yearsInOperation: 6,
    type: 'Prop Firm',
    assets: 'Forex, Indices',
    platform: ['cTrader', 'TradingView'],
    programType: ['1 Step', '2 Step'],
    promo: 'Double your funding'
  }
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [minPayout, setMinPayout] = useState('');
  const [selectedType, setSelectedType] = useState('prop');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountSize, setAccountSize] = useState('');
  const [maxAllocation, setMaxAllocation] = useState('');
  const [yearsInOperation, setYearsInOperation] = useState('');
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [assets, setAssets] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedProgramTypes, setSelectedProgramTypes] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredFirms = firms.filter((firm) => {
    const firmAssetsArray = firm.assets.toLowerCase().split(',').map(a => a.trim());

    const assetsMatch =
      selectedAssets.length === 0 ||
      selectedAssets.some(asset => firmAssetsArray.includes(asset.toLowerCase()));

    const platformsMatch =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some(platform => firm.platform?.includes(platform));

    const programTypesMatch =
      selectedProgramTypes.length === 0 ||
      selectedProgramTypes.some(type => firm.programType?.includes(type));

    return (
      firm.name.toLowerCase().includes(search.toLowerCase()) &&
      (minPayout === '' || firm.payout >= parseInt(minPayout)) &&
      (!accountSize || firm.accountSize >= parseInt(accountSize)) &&
      (!maxAllocation || firm.maxAllocation >= parseInt(maxAllocation)) &&
      (!yearsInOperation || firm.yearsInOperation >= parseInt(yearsInOperation)) &&
      (selectedFirmTypes.length === 0 || selectedFirmTypes.includes(firm.type)) &&
      assetsMatch &&
      platformsMatch &&
      programTypesMatch
    );
  });

  const liveSearchResults = search.trim()
    ? firms.filter((firm) =>
        firm.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleNavigate = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/firms/${slug}`);
  };

  return (
    <div className="bg-black text-white scroll-smooth">


      {/* Hero + Search with Live Dropdown */}
<motion.section
  id="home"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg"
>
  <h2 className="text-4xl sm:text-5xl font-bold mb-4">
    Find the Best Brokers & Prop Firms
  </h2>
  <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-6">
    Insight Pip compares top firms by payout, leverage, regulation, and more — all in one sleek, modern platform.
  </p>

  <div className="relative max-w-3xl mx-auto">
    <input
      type="text"
      placeholder="Search for broker or prop firm"
      className="border border-gray-600 bg-zinc-900 text-white placeholder-gray-400 px-4 py-2 rounded-md w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {liveSearchResults.length > 0 && (
      <ul className="absolute w-full mt-2 bg-zinc-900 text-white rounded-md shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-700">
        {liveSearchResults.map((firm) => (
          <li
            key={firm.id}
            onClick={() => handleNavigate(firm.name)}
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
          >
            {firm.name}
          </li>
        ))}
      </ul>
    )}
  </div>
</motion.section>

  {/* Clean Filter Section */}
<section className="px-6 py-6 max-w-7xl mx-auto">
  <h3 className="text-xl font-semibold mb-4 text-center">Filter Results</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {/* Min Payout (already styled) */}
    <div>
      <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Min Payout (%)</label>
      <Popover className="relative">
        <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
          Min Payout: {minPayout || 'Any'}%
        </Popover.Button>
        <Popover.Panel className="absolute z-10 mt-2 w-60 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
          <div className="text-sm mb-2 text-zinc-700 dark:text-zinc-200">Select Minimum Payout</div>
          <Slider.Root
            className="relative flex items-center select-none touch-none h-5"
            min={50}
            max={100}
            step={1}
            value={[parseInt(minPayout || "70")]}
            onValueChange={(value) => setMinPayout(String(value[0]))}
          >
            <Slider.Track className="bg-zinc-300 dark:bg-zinc-700 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-pink-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white dark:bg-black border-2 border-pink-500 rounded-full shadow focus:outline-none"
              aria-label="Minimum Payout"
            />
          </Slider.Root>
          <div className="text-right mt-2 text-sm text-pink-600 font-medium">
            {minPayout || 70}% or higher
          </div>
        </Popover.Panel>
      </Popover>
    </div>

    {/* Account Size (already styled) */}
    <div>
      <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Account Size ($)</label>
      <Popover className="relative">
        <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
          {accountSize ? `$${parseInt(accountSize).toLocaleString()}` : 'Select Min Acc'}
        </Popover.Button>
        <Popover.Panel className="absolute z-10 mt-2 w-80 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-4 space-y-4 border dark:border-white/10">
          <div>
            <label className="text-sm font-medium block mb-2 text-zinc-600 dark:text-zinc-300">Quick Select:</label>
            <div className="flex gap-2 flex-wrap">
              {[25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  onClick={() => setAccountSize(amt.toString())}
                >
                  ${amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2 text-zinc-600 dark:text-zinc-300">Custom Range:</label>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-6"
              value={[parseInt(accountSize) || 25000]}
              min={0}
              max={200000}
              step={5000}
              onValueChange={([val]) => setAccountSize(val.toString())}
            >
              <Slider.Track className="bg-zinc-200 dark:bg-zinc-700 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-pink-500 rounded-full shadow-lg focus:outline-none" />
            </Slider.Root>
            <p className="mt-2 text-sm text-center text-zinc-700 dark:text-zinc-300">
              Selected: ${parseInt(accountSize || '25000').toLocaleString()}
            </p>
            <button
              onClick={() => setAccountSize('')}
              className="text-xs text-red-500 mt-2 hover:underline"
            >
              Clear Selection
            </button>
          </div>
        </Popover.Panel>
      </Popover>
    </div>

   {/* Max Allocation */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Max Allocation ($)</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {maxAllocation ? `$${parseInt(maxAllocation).toLocaleString()}` : 'Select Max Allc.'}
    </Popover.Button>
    
    <Popover.Panel className="absolute z-10 mt-2 w-80 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-4 space-y-4 border dark:border-white/10">
      <div>
        <label className="text-sm font-medium block mb-2 text-zinc-600 dark:text-zinc-300">Quick Select:</label>
        <div className="flex gap-2 flex-wrap">
          {[1000000, 3000000, 6000000].map((amt) => (
            <button
              key={amt}
              className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
              onClick={() => setMaxAllocation(amt.toString())}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-2 text-zinc-600 dark:text-zinc-300">Custom Range:</label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-6"
          value={[parseInt(maxAllocation) || 0]}
          min={0}
          max={6000000}
          step={100000}
          onValueChange={([val]) => setMaxAllocation(val.toString())}
        >
          <Slider.Track className="bg-zinc-200 dark:bg-zinc-700 relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-pink-500 rounded-full shadow-lg focus:outline-none" />
        </Slider.Root>
        <p className="mt-2 text-sm text-center text-zinc-700 dark:text-zinc-300">
          Selected: ${parseInt(maxAllocation || '0').toLocaleString()}
        </p>
        <button
          onClick={() => setMaxAllocation('')}
          className="text-xs text-red-500 mt-2 hover:underline"
        >
          Clear Selection
        </button>
      </div>
    </Popover.Panel>
  </Popover>
</div>

   {/* Years in Operation */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Years in Operation</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {yearsInOperation ? `${yearsInOperation}+ years` : 'Select Years'}
    </Popover.Button>

    <Popover.Panel className="absolute z-10 mt-2 w-72 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-4 space-y-4 border dark:border-white/10">
      <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
        Choose Years in Operation
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        min={0}
        max={10}
        step={1}
        value={[parseInt(yearsInOperation) || 0]}
        onValueChange={([val]) => setYearsInOperation(val.toString())}
      >
        <Slider.Track className="bg-zinc-200 dark:bg-zinc-700 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-pink-500 rounded-full shadow-lg focus:outline-none" />
      </Slider.Root>

      <p className="mt-2 text-sm text-center text-zinc-700 dark:text-zinc-300">
        Selected: {parseInt(yearsInOperation || '0')} {parseInt(yearsInOperation || '0') === 10 ? '+' : ''} years
      </p>

      <button
        onClick={() => setYearsInOperation('')}
        className="text-xs text-red-500 mt-1 hover:underline"
      >
        Clear Selection
      </button>
    </Popover.Panel>
  </Popover>
</div>


   {/* Type of Firm (Multi-Select) */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Type of Firm</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {selectedFirmTypes.length > 0 ? selectedFirmTypes.join(', ') : 'Select Types'}
    </Popover.Button>

    <Popover.Panel className="absolute z-10 mt-2 w-64 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-lg border dark:border-white/10">
      {['CFD', 'Crypto Only', 'Stocks Only'].map((type) => {
        const isSelected = selectedFirmTypes.includes(type);
        return (
          <button
            key={type}
            onClick={() => {
              setSelectedFirmTypes((prev) =>
                isSelected
                  ? prev.filter((t) => t !== type)
                  : [...prev, type]
              );
            }}
            className={`block w-full text-left px-3 py-2 text-sm rounded-md mb-1 ${
              isSelected
                ? 'bg-pink-500 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black dark:text-white'
            }`}
          >
            {type}
          </button>
        );
      })}
      {selectedFirmTypes.length > 0 && (
        <button
          onClick={() => setSelectedFirmTypes([])}
          className="text-xs text-red-500 mt-2 hover:underline"
        >
          Clear Selection
        </button>
      )}
    </Popover.Panel>
  </Popover>
</div>



    {/* Assets Filter */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Assets</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {selectedAssets.length > 0 ? selectedAssets.join(', ') : 'Select Assets'}
    </Popover.Button>

    <Popover.Panel className="absolute z-10 mt-2 w-60 bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg border dark:border-white/10">
      {['fx', 'energy', 'crypto', 'stocks', 'indices', 'metals', 'commodities'].map((asset) => (
        <div key={asset} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`asset-${asset}`}
            className="mr-2"
            checked={selectedAssets.includes(asset)}
            onChange={() => {
              if (selectedAssets.includes(asset)) {
                // Remove asset if it was already selected
                setSelectedAssets(selectedAssets.filter(a => a !== asset));
              } else {
                // Add asset if it wasn't selected
                setSelectedAssets([...selectedAssets, asset]);
              }
            }}
          />
          <label htmlFor={`asset-${asset}`} className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer capitalize">
            {asset}
          </label>
        </div>
      ))}
    </Popover.Panel>
  </Popover>
</div>

{/* Platform */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Platform</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {selectedPlatforms.length > 0 ? selectedPlatforms.join(', ') : 'Select Platforms'}
    </Popover.Button>

    <Popover.Panel className="absolute z-10 mt-2 w-64 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-4 border dark:border-white/10">
      {['MT4', 'MT5', 'cTrader', 'TradeLocker', 'Match Trader', 'DXTrade', 'TradingView', 'MetaTrader Web', 'ThinkTrader'].map((platform) => (
        <label key={platform} className="block text-sm mb-1 text-zinc-700 dark:text-zinc-200">
          <input
            type="checkbox"
            checked={selectedPlatforms.includes(platform)}
            onChange={() => {
              setSelectedPlatforms((prev) =>
                prev.includes(platform)
                  ? prev.filter((p) => p !== platform)
                  : [...prev, platform]
              );
            }}
            className="mr-2"
          />
          {platform}
        </label>
      ))}
      <button
        className="text-xs text-red-500 mt-2 hover:underline"
        onClick={() => setSelectedPlatforms([])}
      >
        Clear Platforms
      </button>
    </Popover.Panel>
  </Popover>
</div>

{/* Program Type */}
<div>
  <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">Program Type</label>
  <Popover className="relative">
    <Popover.Button className="w-full text-left border px-3 py-2 rounded-md text-sm bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-white/10">
      {selectedProgramTypes.length > 0 ? selectedProgramTypes.join(', ') : 'Select Programs'}
    </Popover.Button>

    <Popover.Panel className="absolute z-10 mt-2 w-64 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-4 border dark:border-white/10">
      {['Instant', '1 Step', '2 Step', '3 Step', '4 Step'].map((type) => (
        <label key={type} className="block text-sm mb-1 text-zinc-700 dark:text-zinc-200">
          <input
            type="checkbox"
            checked={selectedProgramTypes.includes(type)}
            onChange={() => {
              setSelectedProgramTypes((prev) =>
                prev.includes(type)
                  ? prev.filter((t) => t !== type)
                  : [...prev, type]
              );
            }}
            className="mr-2"
          />
          {type}
        </label>
      ))}
      <button
        className="text-xs text-red-500 mt-2 hover:underline"
        onClick={() => setSelectedProgramTypes([])}
      >
        Clear Selection
      </button>
    </Popover.Panel>
  </Popover>
</div>
  </div>
</section>

      {/* Filtered Cards Section */}
  <section id="compare" className="p-10 mt-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredFirms.map((firm, index) => (
      <motion.div
        key={firm.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="rounded-2xl p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 shadow-lg transition hover:scale-105"
      >
        <h3 className="text-xl font-semibold mb-1">{firm.name}</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Payout: {firm.payout}% | Leverage: {firm.leverage}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Account Size: ${firm.accountSize.toLocaleString()} | Max Allocation: ${firm.maxAllocation.toLocaleString()}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Years in Operation: {firm.yearsInOperation} | Type: {firm.type}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Assets: {firm.assets} | Country: {firm.country}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Platforms: {firm.platform ? firm.platform.join(", ") : "N/A"}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          Program Type: {firm.programType ? firm.programType.join(", ") : "N/A"}
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          Rating: ⭐{firm.rating}
        </p>
      </motion.div>
    ))}
  </div>
</section>

<section className="max-w-7xl mx-auto mt-10 px-4">
  {/* Toggle Buttons */}
  <div className="flex justify-center gap-2 mb-6">
    <button
      className={`px-6 py-2 rounded-full text-sm font-medium transition ${
        selectedType === 'prop'
          ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white'
          : 'bg-zinc-800 text-white'
      }`}
      onClick={() => setSelectedType('prop')}
    >
      Prop Firms
    </button>
    <button
      className={`px-6 py-2 rounded-full text-sm font-medium transition ${
        selectedType === 'broker'
          ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white'
          : 'bg-zinc-800 text-white'
      }`}
      onClick={() => setSelectedType('broker')}
    >
      Brokers
    </button>
  </div>

  {/* Sticky Table Header */}
  <div className="sticky top-[64px] z-40 bg-black border-y border-white/10 shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-zinc-800">
    <div className={`grid text-sm text-white font-semibold ${
      selectedType === 'broker' ? 'min-w-[1000px] grid-cols-10' : 'grid-cols-9'
    }`}>
      {selectedType === 'prop' ? (
        <>
          <div className="px-4 py-3">Firm</div>
          <div className="px-4 py-3">Rating</div>
          <div className="px-4 py-3">Country</div>
          <div className="px-4 py-3">Years</div>
          <div className="px-4 py-3">Assets</div>
          <div className="px-4 py-3">Platforms</div>
          <div className="px-4 py-3">Max Allocation</div>
          <div className="px-4 py-3">Promo</div>
          <div className="px-4 py-3">Actions</div>
        </>
      ) : (
        <>
          <div className="px-4 py-3">Broker</div>
          <div className="px-4 py-3">Rating</div>
          <div className="px-4 py-3">Country</div>
          <div className="px-4 py-3">Years</div>
          <div className="px-4 py-3">Spread (US30)</div>
          <div className="px-4 py-3">Spread (XAUUSD)</div>
          <div className="px-4 py-3">Spread (EURUSD)</div>
          <div className="px-4 py-3">Regulated</div>
          <div className="px-4 py-3">Min Deposit</div>
          <div className="px-4 py-3">Actions</div>
        </>
      )}
    </div>
  </div>

  {/* Table Content */}
  <div
    className={`${
      selectedType === 'broker' ? 'overflow-x-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-zinc-800' : ''
    }`}
  >
    <div className={`grid text-sm text-white border-b border-zinc-800 ${
      selectedType === 'broker' ? 'min-w-[1000px] grid-cols-10' : 'grid-cols-9'
    }`}>
      {(selectedType === 'prop'
        ? filteredFirms.filter(f => f.type === "Prop Firm")
        : filteredFirms.filter(f => f.type === "Broker")
      ).map((firm) => (
        <div key={firm.id} className="contents hover:bg-zinc-900 transition">
          <div className="px-4 py-3 font-medium">{firm.name}</div>
          <div className="px-4 py-3">⭐ {firm.rating}</div>
          <div className="px-4 py-3">{firm.country}</div>
          <div className="px-4 py-3">{firm.yearsInOperation} yrs</div>

          {selectedType === 'prop' ? (
            <>
              <div className="px-4 py-3">{firm.assets}</div>
              <div className="px-4 py-3">{firm.platform?.join(', ')}</div>
              <div className="px-4 py-3">${firm.maxAllocation.toLocaleString()}</div>
              <div className="px-4 py-3">{firm.promo || '🎁 10% Off'}</div>
            </>
          ) : (
            <>
              <div className="px-4 py-3">{firm.spreads?.us30 ?? 'N/A'}</div>
              <div className="px-4 py-3">{firm.spreads?.xauusd ?? 'N/A'}</div>
              <div className="px-4 py-3">{firm.spreads?.eurusd ?? 'N/A'}</div>
              <div className="px-4 py-3">{firm.regulated ? 'Yes' : 'No'}</div>
              <div className="px-4 py-3">${firm.minDeposit?.toLocaleString() ?? 'N/A'}</div>
            </>
          )}
          <div className="px-4 py-3">
            <button
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-xs"
              onClick={() => handleNavigate(firm.name)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Subscribe Section */}
      <section className="mt-10 px-6">
        <div className="rounded-2xl p-8 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 dark:from-purple-800 dark:via-pink-700 dark:to-red-700 text-white text-center max-w-2xl mx-auto shadow-xl">
          <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
          <p className="mb-4 text-sm opacity-90">Subscribe to get the latest news on brokers and prop firms directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md w-full sm:w-2/3 text-black outline-none ring-2 ring-white/50 focus:ring-white ring-inset"
            />
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-zinc-900 transition">Subscribe</button>
          </form>
        </div>
      </section>

      <footer id="contact" className="text-center text-sm text-zinc-500 p-6 border-t dark:border-white/10 mt-10">
        © 2025 Insight Pip. All rights reserved.
      </footer>
    </div>
  );
}
