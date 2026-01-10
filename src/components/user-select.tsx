"use client";

import type { FunctionReturnType } from "convex/server";

import { MultiSelect } from "@/components/ui/multi-select";
import type { api } from "../../convex/_generated/api";

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
  const userOptions =
    users?.map((user) => ({
      label: user.name,
      value: user.id,
    })) ?? [];

  return (
    <MultiSelect
      defaultValue={value}
      disabled={disabled}
      onValueChange={onChange}
      options={userOptions}
      placeholder={placeholder}
      searchable
    />
  );
};
