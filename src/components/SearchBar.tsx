import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form action="/products" className="relative w-full">
      <label htmlFor="store-search" className="sr-only">
        بحث
      </label>
      <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id="store-search"
        name="q"
        type="search"
        placeholder="ابحث عن كفر، شاحن، سماعة، أو كود المنتج"
        className="h-12 w-full border border-slate-200 bg-white pr-12 pl-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </form>
  );
}
