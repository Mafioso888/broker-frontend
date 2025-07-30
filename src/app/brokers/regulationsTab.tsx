'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { CircleCheck, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";


const brokers = [
  {
    name: 'SwiftMarkets',
    complianceScore: 92,
    regulators: ['FCA', 'CySEC'],
    yearsRegulated: 5,
    status: 'Fully Compliant',
  },
  {
    name: 'Fusion Brokers',
    complianceScore: 78,
    regulators: ['ASIC', 'FSCA'],
    yearsRegulated: 3,
    status: 'Partially Compliant',
  },
  {
    name: 'GlobalFX',
    complianceScore: 0,
    regulators: [],
    yearsRegulated: 0,
    status: 'Unregulated',
  },
  {
    name: 'Nova Brokers',
    complianceScore: 88,
    regulators: ['IIROC'],
    yearsRegulated: 4,
    status: 'Fully Compliant',
  },
];

export default function RegulationsTab() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
          🏛️ Broker Compliance Dashboard
        </h1>
        <p className="text-zinc-400">
          Track regulatory status, licenses, and compliance scores for all brokers.
        </p>
      </div>

      {/* Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {brokers.map((broker, index) => (
          <motion.div
            key={broker.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 space-y-4 shadow hover:shadow-pink-500/20 transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{broker.name}</h3>
              {broker.status === 'Fully Compliant' && (
                <CircleCheck className="text-green-400" />
              )}
              {broker.status === 'Partially Compliant' && (
                <AlertTriangle className="text-yellow-400" />
              )}
              {broker.status === 'Unregulated' && (
                <XCircle className="text-red-500" />
              )}
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-2">Compliance Score</p>
              <Progress value={broker.complianceScore} className="h-3 rounded-full bg-zinc-800" />
              <p className="mt-1 text-lg font-bold">
                {broker.complianceScore}%
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Regulators</p>
              {broker.regulators.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {broker.regulators.map((reg, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-black text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-red-400 text-sm">No Regulation</span>
              )}
            </div>
            <p className="text-zinc-400 text-sm">Years Regulated: {broker.yearsRegulated}</p>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">📊 Compliance Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-300 border border-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-zinc-800 text-white sticky top-0">
              <tr>
                <th className="px-4 py-3">Broker</th>
                <th className="px-4 py-3">Regulators</th>
                <th className="px-4 py-3">Years</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {brokers.map((broker, idx) => (
                <tr
                  key={broker.name}
                  className="border-t border-zinc-700 hover:bg-zinc-900"
                >
                  <td className="px-4 py-3 font-medium">{broker.name}</td>
                  <td className="px-4 py-3">{broker.regulators.join(', ') || 'None'}</td>
                  <td className="px-4 py-3">{broker.yearsRegulated}</td>
                  <td className="px-4 py-3">{broker.complianceScore}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        broker.status === 'Fully Compliant' && 'bg-green-500 text-black',
                        broker.status === 'Partially Compliant' && 'bg-yellow-400 text-black',
                        broker.status === 'Unregulated' && 'bg-red-500 text-white'
                      )}
                    >
                      {broker.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl mx-auto mt-16 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Informed on Broker Regulations</h2>
        <p className="text-zinc-400 mb-6">
          Subscribe to get updates on regulation changes and broker compliance scores.
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
