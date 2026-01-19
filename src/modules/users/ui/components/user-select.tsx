"use client";

import type { FunctionReturnType } from "convex/server";

import { MultiSelect } from "@/components/ui/multi-select";
import { useIsMobile } from "@/hooks/use-mobile";
import type { api } from "../../../../../convex/_generated/api";

interface UserMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  users: FunctionReturnType<typeof api.users.list.default>;
}

export const UserMultiSelect = ({
  value,
  onChange,
  disabled,
  placeholder = "Benutzer auswählen...",
  users,
}: UserMultiSelectProps) => {
  const isMobile = useIsMobile();

  const userOptions =
    users?.map((user) => ({
      label: user.firstName,
      value: user.clerkId,
    })) ?? [];

  return (
    <MultiSelect
      disabled={disabled}
      hideSelectAll={true}
      onValueChange={onChange}
      options={userOptions}
      placeholder={placeholder}
      searchable={!isMobile}
      value={value}
    />
  );
};
