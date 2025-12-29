interface Props {
  firstName: string | null;
  lastName: string | null;
  userId: string;
}

export const UserInfoDetails = ({ firstName, lastName, userId }: Props) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Name:</span>
        <span className="font-medium">
          {firstName} {lastName}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Benutzer-ID:</span>
        <span className="font-mono text-xs">{userId}</span>
      </div>
    </div>
  );
};
