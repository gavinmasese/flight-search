export default function SearchForm({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <input className="border p-2 rounded" placeholder="Origin (e.g. NBO)" />
      <input className="border p-2 rounded" placeholder="Destination (e.g. LHR)" />
      <input type="date" className="border p-2 rounded" />
      <button
        onClick={onSearch}
        className="bg-black text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
