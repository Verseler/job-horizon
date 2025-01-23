import React from "react";
import { useSearchParams } from "react-router";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type JobSearchBoxProps = {
  className?: React.HtmlHTMLAttributes<HTMLElement>["children"];
};

export default function JobSearchBox({ className }: JobSearchBoxProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue: string = searchParams.get("search") || "";

  const handleOnchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParams({ search: e.target.value });

  const clearSearch = () => setSearchParams({ search: "" });

  const clearButton = searchValue.length > 0 && (
    <Button
      onClick={clearSearch}
      variant="link"
      size="icon"
      className="absolute top-0 right-0 text-neutral-500"
    >
      <X />
    </Button>
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        "flex items-center p-3 border rounded-md gap-x-3",
        className
      )}
    >
      <div className="relative flex-1">
        <Input
          placeholder="Search by Title..."
          value={searchValue}
          onChange={handleOnchangeSearch}
          className="shadow-none placeholder:text-neutral-400 pe-8 placeholder:text-xs"
        />
        {clearButton}
      </div>

      <Button className="font-normal bg-green-600 hover:bg-green-700 dark:hover:bg-green-400 dark:bg-green-500">
        <Search />
        Find
      </Button>
    </form>
  );
}
