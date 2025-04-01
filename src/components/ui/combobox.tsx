import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: Array<any>; // Ensure `value` is unique for each option
  placeholder?: string;
  onChange: (value: Array<any>) => void;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  placeholder = "Select an option...",
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<Array<any>>([]);

  const handleSelect = (value: string) => {
    const newValue = selectedValue?.includes(value) ? selectedValue.filter((prev)=> prev!== value) : [...selectedValue,value]; // Toggle selection
    setSelectedValue(newValue)
    onChange(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 justify-between"
        >
          {selectedValue.length>0
            ? options.filter((option) => selectedValue?.includes(option))
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
               
              {options.map((option) => (
                
                <CommandItem
                  key={option} // Ensure the `value` is unique
                  value={option}
                  onSelect={(option) => handleSelect(option)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue?.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
