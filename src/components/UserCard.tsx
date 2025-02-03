import type {User} from "@/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const UserCard = ({user}:{ user: User }) => {
  const {email, lastName, firstName} = user;
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={`https://source.boringavatars.com/marble/120/${email}?colors=25106C,7F46DB`}/>
        <AvatarFallback className="text-black">{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-left">
        <span className="text-sm font-medium text-black">{fullName}</span>
        <span className="text-xs text-zinc-500">{email}</span>
      </div>
    </div>
  )
}