import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

interface PropTypes {
  byOwner: boolean;
  setByOwner: Dispatch<SetStateAction<boolean>>;
}

export default function FeedbackOwnerFilter({
  byOwner,
  setByOwner,
}: PropTypes) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Filter className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='left'>
        <DropdownMenuItem
          onSelect={() => setByOwner(false)}
          className={cn(!byOwner ? 'bg-secondary' : '')}
        >
          By Users
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setByOwner(true)}
          className={cn(byOwner ? 'bg-secondary' : '')}
        >
          By Owner
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
