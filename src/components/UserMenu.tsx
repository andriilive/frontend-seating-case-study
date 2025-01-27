import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useAuth} from "@/auth";

export const UserMenu = () => {

  const {logout, user} = useAuth();

  const {email, lastName, firstName} = user!;
  const fullName = `${firstName} ${lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => logout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}