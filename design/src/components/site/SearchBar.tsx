import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 md:px-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/10 md:p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Location
            </label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gurgaon">Gurgaon</SelectItem>
                <SelectItem value="sohna">Sohna</SelectItem>
                <SelectItem value="jhajjar">Jhajjar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Plot Size
            </label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Any size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100-200">100 â€“ 200 sq yd</SelectItem>
                <SelectItem value="200-500">200 â€“ 500 sq yd</SelectItem>
                <SelectItem value="500+">500+ sq yd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Budget
            </label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Any budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-20">Under â‚¹20L</SelectItem>
                <SelectItem value="20-50">â‚¹20L â€“ â‚¹50L</SelectItem>
                <SelectItem value="50+">â‚¹50L+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="h-12 w-full rounded-md bg-accent text-accent-foreground hover:bg-accent/90">
              <Search className="size-4" />
              Search Plots
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}