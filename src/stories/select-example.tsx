import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortingOptions = [
  { value: "popular", label: "Popular" },
  { value: "name", label: "Name" },
  { value: "activity", label: "Activity" },
] as const;

export const SelectExample = () => {
  return (
    <Select>
      <SelectTrigger className="w-min">
        <SelectValue placeholder="Popularity" />
      </SelectTrigger>
      <SelectContent>
        {sortingOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
