import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LOCATIONS,
  SIZE_BUCKETS,
  PLOT_TAGS,
  STATUSES,
} from "./plotsData";

export type Filters = {
  locations: string[];
  sizes: string[];
  budget: [number, number];
  tags: string[];
  statuses: string[];
};

export const DEFAULT_FILTERS: Filters = {
  locations: [],
  sizes: [],
  budget: [0, 12000000],
  tags: [],
  statuses: [],
};

function fmtBudget(v: number) {
  if (v >= 10000000) return `â‚¹${(v / 10000000).toFixed(2)} Cr`;
  return `â‚¹${(v / 100000).toFixed(0)} L`;
}

function toggle(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

function CheckGroup({
  values,
  options,
  onToggle,
  prefix,
}: {
  values: string[];
  options: readonly { id: string; label: string }[] | readonly string[];
  onToggle: (val: string) => void;
  prefix: string;
}) {
  const items = options.map((o) =>
    typeof o === "string" ? { id: o, label: o } : o,
  );
  return (
    <div className="space-y-2.5">
      {items.map((opt) => {
        const id = `${prefix}-${opt.id}`;
        const checked = values.includes(opt.id);
        return (
          <div key={opt.id} className="flex items-center gap-2.5">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={() => onToggle(opt.id)}
            />
            <Label
              htmlFor={id}
              className="cursor-pointer text-sm font-normal text-foreground/80"
            >
              {opt.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function PlotsFilters({
  filters,
  setFilters,
  onApply,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onApply?: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Filter Plots
        </h2>
        <button
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
          className="text-xs font-medium text-secondary hover:underline"
        >
          Reset
        </button>
      </div>

      <Separator />

      <Section title="Location">
        <CheckGroup
          prefix="loc"
          values={filters.locations}
          options={LOCATIONS}
          onToggle={(v) =>
            setFilters({ ...filters, locations: toggle(filters.locations, v) })
          }
        />
      </Section>

      <Separator />

      <Section title="Plot Size">
        <CheckGroup
          prefix="size"
          values={filters.sizes}
          options={SIZE_BUCKETS.map((s) => ({ id: s.id, label: s.label }))}
          onToggle={(v) =>
            setFilters({ ...filters, sizes: toggle(filters.sizes, v) })
          }
        />
      </Section>

      <Separator />

      <Section title="Budget">
        <div className="px-1">
          <Slider
            min={0}
            max={12000000}
            step={100000}
            value={filters.budget}
            onValueChange={(v) =>
              setFilters({ ...filters, budget: [v[0], v[1]] as [number, number] })
            }
          />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{fmtBudget(filters.budget[0])}</span>
            <span>
              {filters.budget[1] >= 12000000
                ? "â‚¹1 Cr+"
                : fmtBudget(filters.budget[1])}
            </span>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Plot Type">
        <CheckGroup
          prefix="tag"
          values={filters.tags}
          options={PLOT_TAGS}
          onToggle={(v) =>
            setFilters({ ...filters, tags: toggle(filters.tags, v) })
          }
        />
      </Section>

      <Separator />

      <Section title="Status">
        <CheckGroup
          prefix="st"
          values={filters.statuses}
          options={STATUSES}
          onToggle={(v) =>
            setFilters({ ...filters, statuses: toggle(filters.statuses, v) })
          }
        />
      </Section>

      <Button
        onClick={onApply}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Apply Filters
      </Button>
    </div>
  );
}