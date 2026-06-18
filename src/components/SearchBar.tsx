import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form action="/products" className="relative w-full">
      <label htmlFor="store-search" className="sr-only">
        بحث
      </label>
      <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        id="store-search"
        name="q"
        type="search"
        placeholder="ابحث عن كفر، شاحن، سماعة، أو كود المنتج"
        className="form-control h-12 w-full pr-12 pl-4 placeholder:text-slate-400"
      />
    </form>
  );
}
