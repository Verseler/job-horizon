import React from "react";
import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/Button";

type SaveButtonProps = {
  active: boolean | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SaveButton({ active, onClick }: SaveButtonProps) {
  return (
    <Button onClick={onClick} size="icon" variant="outline" className="ml-auto">
      <Bookmark
        fill={active ? "#16a34a" : "transparent"}
        color={active ? "#15803d" : "#a3a3a3"}
      />
    </Button>
  );
}
