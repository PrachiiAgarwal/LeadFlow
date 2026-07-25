function SearchBar({ search, setSearch }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <label
        htmlFor="search"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Search Leads
      </label>

      <input
        id="search"
        type="text"
        placeholder="Search by name, email or message..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;