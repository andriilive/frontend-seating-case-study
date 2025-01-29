import type {Ticket} from "@/components/Seating";
import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	place:number;
	seatRow:number;
	ticketData?: Ticket;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
	const isInCart = false;
	const {place, seatRow} = props
	return (
		<Popover>
			<PopoverTrigger disabled={!props.ticketData}>
				<div className={cn('size-8 rounded-full transition-color', props.className, {
					'bg-zinc-100 hover:bg-zinc-200': props.ticketData,
					'bg-white': !props.ticketData
				})}
				     ref={ref}>
					<span className="text-xs text-zinc-400 font-medium">{props.place}</span>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<pre>{JSON.stringify({
					place,
					seatRow,
					ticketData: props.ticketData
				}, null, 2)}</pre>
				
				<footer className="flex flex-col">{
					isInCart ? (
						<Button disabled variant="destructive" size="sm">
							Remove from cart
						</Button>
					) : (
						<Button disabled variant="default" size="sm">
							Add to cart
						</Button>
					)
				}</footer>
			</PopoverContent>
		</Popover>
	);
});
