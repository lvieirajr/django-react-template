import { JSX, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MinimalOrganization } from "@/api/types";

const organizations: MinimalOrganization[] = [
  {
    id: "1",
    name: "HorTech",
    logo: "/logo.png",
  },
  {
    id: "2",
    name: "VieirAI",
    logo: "/logo.png",
  },
  {
    id: "3",
    name: "HVLaw",
    logo: "/logo.png",
  },
];

export function OrganizationSwitcher(): JSX.Element {
  const [selectedOrganization, setSelectedOrganization] = useState<MinimalOrganization>(
    organizations[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  if (!organizations || organizations.length == 0) {
    return <></>;
  }

  if (organizations.length == 1) {
    return (
      <div className="flex items-center">
        <span>{organizations[0].name}</span>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select an organization"
          className={cn("w-[300px] justify-between")}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={selectedOrganization.logo}
              alt={selectedOrganization.name}
              className="grayscale"
            />
            <AvatarFallback>
              {selectedOrganization.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {selectedOrganization.name}

          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search organizations..." />

            <CommandEmpty>No organization found.</CommandEmpty>

            {organizations.map((organization) => (
              <CommandItem
                className="text-sm"
                key={organization.id}
                onSelect={() => {
                  setSelectedOrganization(organization);
                  setIsOpen(false);
                }}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={organization.logo}
                    alt="Organization logo"
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {organization.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {organization.name}

                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedOrganization.name === organization.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
