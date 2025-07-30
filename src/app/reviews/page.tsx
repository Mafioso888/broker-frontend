'use client';

import { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react'; // for star icon
import { Button } from '@/components/ui/button'; // your button
import { Input } from '@/components/ui/input'; // your input
import { Card, CardContent } from '@/components/ui/card'; // card UI

// Sample brokers & prop firms - replace or fetch from your data
const brokers = ['Broker A', 'Broker B', 'Broker C'];
const propFirms = ['Prop Firm X', 'Prop Firm Y', 'Prop Firm Z'];

// Star rating component
function StarRating({ rating, setRating }) {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-7 h-7 transition-colors ${
            i <= rating ? 'text-pink-500' : 'text-zinc-400'
          }`}
          onClick={() => setRating(i)}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filterType, setFilterType] = useState('broker'); // broker or propFirm
  const [filterName, setFilterName] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest or highest
  const [form, setForm] = useState({
    name: '',
    type: 'broker',
    firm: '',
    rating: 0,
    comment: '',
  });

  // For searchable firm input
  const [firmSearch, setFirmSearch] = useState('');
  const [firmDropdownOpen, setFirmDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle form input changes (except firmSearch)
  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle rating change
  function setRating(r) {
    setForm((f) => ({ ...f, rating: r }));
  }

  // Add new review
  function submitReview(e) {
    e.preventDefault();
    if (!form.firm) return alert('Please select a firm!');
    if (form.rating === 0) return alert('Please select a rating!');
    if (!form.comment.trim()) return alert('Please write a comment!');

    const newReview = {
      id: Date.now(),
      ...form,
      date: new Date(),
      name: form.name || 'Anonymous',
    };

    setReviews((r) => [newReview, ...r]);
    setForm({ name: '', type: form.type, firm: '', rating: 0, comment: '' });
    setFirmSearch('');
  }

  // Filter & sort reviews for display
  const filteredReviews = reviews
    .filter((r) => r.type === filterType && (!filterName || r.firm === filterName))
    .sort((a, b) =>
      sortBy === 'newest' ? b.date - a.date : b.rating - a.rating
    );

  // Firms available based on filterType
  const firmsList = filterType === 'broker' ? brokers : propFirms;

  // Filter firms for dropdown based on search text
  const filteredFirms = firmsList.filter((firm) =>
    firm.toLowerCase().includes(firmSearch.toLowerCase())
  );

  // Select firm from dropdown
  function selectFirm(firm) {
    setForm((f) => ({ ...f, firm }));
    setFirmSearch(firm);
    setFirmDropdownOpen(false);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFirmDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-pink-500 tracking-tight">User Reviews</h1>

      {/* Review Form */}
      <Card className="mb-10 bg-black/80 border border-zinc-800 shadow-lg">
        <CardContent>
          <form onSubmit={submitReview} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex-1">
                <label className="block mb-1 font-semibold">I am reviewing a:</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={(e) => {
                    setForm({ ...form, type: e.target.value, firm: '' });
                    setFilterType(e.target.value);
                    setFilterName('');
                    setFirmSearch('');
                    setFirmDropdownOpen(false);
                  }}
                  className="w-full rounded-md border border-zinc-700 bg-black/70 p-2 text-white"
                >
                  <option value="broker">Broker</option>
                  <option value="propFirm">Prop Firm</option>
                </select>
              </div>

              {/* Searchable Firm Input */}
              <div className="flex-1 relative" ref={dropdownRef}>
                <label className="block mb-1 font-semibold">Search Firm:</label>
                <input
                  type="text"
                  name="firmSearch"
                  value={firmSearch}
                  onChange={(e) => {
                    setFirmSearch(e.target.value);
                    setFirmDropdownOpen(true);
                    setForm((f) => ({ ...f, firm: '' })); // reset selected firm while typing
                  }}
                  placeholder="Start typing to search..."
                  className="w-full rounded-md border border-zinc-700 bg-black/70 p-2 text-white"
                  autoComplete="off"
                />
                {firmDropdownOpen && filteredFirms.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-zinc-700 bg-black/90 text-white shadow-lg">
                    {filteredFirms.map((firm) => (
                      <li
                        key={firm}
                        onClick={() => selectFirm(firm)}
                        className="cursor-pointer px-3 py-2 hover:bg-pink-500 hover:text-black"
                      >
                        {firm}
                      </li>
                    ))}
                  </ul>
                )}
                {firmDropdownOpen && filteredFirms.length === 0 && (
                  <p className="absolute z-10 mt-1 w-full rounded-md border border-zinc-700 bg-black/90 p-2 text-center text-zinc-400">
                    No firms found
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-semibold">Your Name (optional):</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Anonymous"
                  className="bg-black/70"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Your Rating:</label>
              <StarRating rating={form.rating} setRating={setRating} />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Your Review:</label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={onChange}
                rows={4}
                placeholder="Write your review here..."
                className="w-full rounded-md border border-zinc-700 bg-black/70 p-3 text-white resize-none"
              />
            </div>

            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters for reviews */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-6">
        <select
          className="mb-4 md:mb-0 rounded-md border border-zinc-700 bg-black/70 p-2 text-white"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterName('');
          }}
        >
          <option value="broker">Brokers</option>
          <option value="propFirm">Prop Firms</option>
        </select>

        <select
          className="mb-4 md:mb-0 rounded-md border border-zinc-700 bg-black/70 p-2 text-white"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          disabled={!filterType}
        >
          <option value="">All {filterType === 'broker' ? 'Brokers' : 'Prop Firms'}</option>
          {firmsList.map((firm) => (
            <option key={firm} value={firm}>
              {firm}
            </option>
          ))}
        </select>

        <select
          className="rounded-md border border-zinc-700 bg-black/70 p-2 text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Sort by Newest</option>
          <option value="highest">Sort by Highest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 && (
          <p className="text-zinc-400 italic">No reviews found for selected filters.</p>
        )}

        {filteredReviews.map(({ id, name, firm, rating, comment, date }) => (
          <Card key={id} className="bg-black/80 border border-zinc-800 shadow-md">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-pink-500">{firm}</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? 'text-pink-500' : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-zinc-300 mb-2">{comment}</p>

              <div className="flex justify-between text-xs text-zinc-500 italic">
                <span>by {name}</span>
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
