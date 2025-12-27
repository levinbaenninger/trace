import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  initials: string;
}

export const UserAvatarFallback = ({ initials }: Props) => {
  return (
    <Avatar className="size-7">
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
