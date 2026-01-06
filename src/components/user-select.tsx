"use client";

import { useQuery } from "convex/react";

import { MultiSelect } from "@/components/ui/multi-select";
import { api } from "../../convex/_generated/api";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const UserMultiSelect = ({
  value,
  onChange,
  disabled,
  placeholder = "Benutzer auswählen...",
}: Props) => {
  const users = useQuery(api.users.list.default);

  const userOptions =
    users?.map((user) => ({
      label: user.name,
      value: user.id,
    })) ?? [];

  return (
    <MultiSelect
      defaultValue={value}
      disabled={disabled || !users}
      onValueChange={onChange}
      options={userOptions}
      placeholder={users ? placeholder : "Benutzer laden..."}
      searchable
    />
  );
};
