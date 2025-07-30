'use client';

export default function StickyTableTest() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Sticky Table with Scroll</h1>

      <div className="max-w-6xl mx-auto border rounded shadow overflow-auto max-h-[500px] relative">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr>
              {['Firm', 'Rating', 'Country', 'Years', 'Promo'].map((heading) => (
                <th
                  key={heading}
                  className="sticky top-0 z-30 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white font-semibold p-3"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 100 }).map((_, i) => (
              <tr key={i} className="border-t hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <td className="p-3">Firm {i + 1}</td>
                <td className="p-3">⭐ {4 + (i % 2)}/5</td>
                <td className="p-3">{i % 2 === 0 ? 'USA' : 'UK'}</td>
                <td className="p-3">{(i % 10) + 1} yrs</td>
                <td className="p-3">{i % 3 === 0 ? '🎁 10% Off' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
