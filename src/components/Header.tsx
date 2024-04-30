"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sort from "./Sort";
import { Input } from "./ui/input";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        router.push("/pokedex");
      } else {
        router.push(`/pokedex?s=${searchText}`);
      }

      if (open) {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="flex justify-between gap-6 border-b px-6 py-4">
      <Link className=" flex items-center gap-2" href={"/pokedex"}>
        <Image
          src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
          alt="pokemon logo"
          width={36}
          height={36}
        />
        <div className="hidden text-3xl font-semibold sm:block">PokeDex.</div>
      </Link>

      <div className="relative ml-auto flex-1 sm:grow-0">
        <Search className="absolute left-2.5 top-[12px] h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[336px]"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={keyUpHandler}
        />
        <kbd className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <Sort />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a name to search..."
          value={searchText}
          onValueChange={setSearchText}
          onKeyUp={(e) => {
            keyUpHandler(e);
          }}
        />
        <CommandList></CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
