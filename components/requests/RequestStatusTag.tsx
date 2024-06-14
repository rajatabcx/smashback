import { RequestStatus } from '@/lib/enums';
import {
  Ban,
  BriefcaseBusiness,
  CircleCheckBig,
  Construction,
  Sparkle,
} from 'lucide-react';

interface PropTypes {
  status: RequestStatus;
}

export function RequestStatusTag({ status }: PropTypes) {
  switch (status) {
    case RequestStatus.cancelled:
      return (
        <div className='rounded-full bg-destructive px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <Ban className='h-4 w-4' />
          {status}
        </div>
      );
    case RequestStatus.new:
      return (
        <div className='rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <Sparkle className='h-4 w-4' />
          {status}
        </div>
      );
    case RequestStatus.roadmap:
      return (
        <div className='rounded-full bg-purple-500 px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <Construction className='h-4 w-4' /> {status}
        </div>
      );
    case RequestStatus.shipped:
      return (
        <div className='rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <CircleCheckBig className='h-4 w-4' /> {status}
        </div>
      );
    case RequestStatus.wip:
      return (
        <div className='rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <BriefcaseBusiness className='h-4 w-4' /> {status}
        </div>
      );
    default:
      return (
        <div className='rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-primary-foreground flex gap-1'>
          <Sparkle className='h-4 w-4' />
          {status}
        </div>
      );
  }
}
