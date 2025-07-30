"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { propFirms } from "@/lib/propFirms";
import { brokers } from "@/lib/brokers";

const allFirms = [...propFirms, ...brokers];

export default function ComparePage() {
  const [search, setSearch] = useState("");
  const [selectedFirms, setSelectedFirms] = useState<any[]>([]);

  const handleAddFirm = (firm: any) => {
    if (!selectedFirms.find((f) => f.name === firm.name) && selectedFirms.length < 3) {
      setSelectedFirms([...selectedFirms, firm]);
      setSearch("");
    }
  };

  const handleRemoveFirm = (name: string) => {
    setSelectedFirms(selectedFirms.filter((f) => f.name !== name));
  };

  const filteredResults = search.length > 1
    ? allFirms.filter((firm) =>
        firm.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <section className="min-h-screen bg-black text-white px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Compare Prop Firms & Brokers</h1>
      <p className="text-zinc-400 text-center mb-8 max-w-2xl mx-auto">
        Type and select up to 3 firms to compare side by side. View real-time data including ratings, platform support, regulations, and more.
      </p>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Input
          type="text"
          placeholder="Search for a prop firm or broker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black"
        />
        {filteredResults.length > 0 && (
          <ul className="absolute z-10 bg-white text-black rounded shadow-md w-full mt-2 max-h-60 overflow-y-auto">
            {filteredResults.map((firm) => (
              <li
                key={firm.name}
                className="px-4 py-2 cursor-pointer hover:bg-zinc-100"
                onClick={() => handleAddFirm(firm)}
              >
                {firm.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Firms */}
      {selectedFirms.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10 shadow-inner">
          <table className="min-w-full table-auto text-sm text-white">
            <thead className="bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 text-white">
              <tr>
                <th className="text-left p-4 w-48">Feature</th>
                {selectedFirms.map((firm) => (
                  <th key={firm.name} className="p-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{firm.name}</span>
                      <button
                        className="text-xs text-red-400 hover:text-red-300 ml-2"
                        onClick={() => handleRemoveFirm(firm.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="p-4">Type</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-type"} className="p-4">{f.type}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Rating</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-rating"} className="p-4">⭐ {f.rating}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Country</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-country"} className="p-4">{f.country}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Years in Operation</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-years"} className="p-4">{f.yearsInOperation} yrs</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Platforms</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-platforms"} className="p-4">
                    {f.platform?.join(", ") || "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Regulated</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-regulated"} className="p-4">
                    {f.regulated !== undefined ? (f.regulated ? "Yes" : "No") : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Assets</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-assets"} className="p-4">{f.assets || "—"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Promo</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-promo"} className="p-4">{f.promo || "None"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Min Deposit</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-minDeposit"} className="p-4">
                    {f.minDeposit ? `$${f.minDeposit.toLocaleString()}` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Max Allocation</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-maxAllc"} className="p-4">
                    {f.maxAllocation ? `$${f.maxAllocation.toLocaleString()}` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4">Actions</td>
                {selectedFirms.map((f) => (
                  <td key={f.name + "-action"} className="p-4">
                    <Button
                      onClick={() => alert(`Redirect to ${f.name} details`)}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      View
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
