import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Payment } from "./columns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
 
export function ComboboxDemo({data,filterbasis,filterfunction}) {
    let checkList: string[] = [];
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>([])
const capitalize = (str: string): string => 
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            
          {(value.length>0)  ? data.find((framework) => value.includes(framework[filterbasis]))?.[filterbasis] : capitalize(filterbasis) }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${filterbasis}...`} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => {
                
                if (!checkList.includes(framework[filterbasis] ))
                    {checkList.push(framework[filterbasis]);
                        return (<CommandItem
                  key={framework[filterbasis]}
                  value={framework[filterbasis]}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue)
                    setValue((prev) => prev.includes(currentValue) ? prev.filter((opt)=> opt !== currentValue) : [...prev, currentValue]);
                    setOpen(false)
                  
                    filterfunction(currentValue,filterbasis,value.includes(currentValue) ? value.filter((opt) => opt !== currentValue) : [...value,currentValue])
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(framework[filterbasis])  ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework[filterbasis]}
                </CommandItem>)}
                



})}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}