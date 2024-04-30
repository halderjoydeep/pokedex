"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

interface SortIconProps {}

const Sort = ({}: SortIconProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const page = params.get("page");
  const s = params.get("s");
  const sort = params.get("sort");

  const [selectedOption, setSelectedOption] = useState(sort || "default");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value);
            router.replace(
              `?${page ? `page=${page}&` : ""}${s ? `s=${s}&` : ""}sort=${value}`,
            );
          }}
        >
          <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
