import {useCart} from "@/cart";
import type {Ticket} from "@/components/Seating";
import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	place: number;
	available: boolean;
	ticket: Ticket;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
	const {isInCart : _isInCart, add, remove} = useCart();
	const {place, ticket, available} = props;
	const {seatId} = ticket.ticketData;

	const isInCart = _isInCart(seatId);

	return (
		<Popover>
			<PopoverTrigger disabled={!available}>
				<div className={cn('size-8 rounded-full border border-transparent transition-color', props.className, {
					'bg-zinc-100 text-black hover:bg-zinc-200': available,
					'bg-white text-zinc-200': !available,
					'bg-white border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400': isInCart,
				})} ref={ref}>
					<span className="text-xs font-medium">{place}</span>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<pre>{JSON.stringify(ticket, null, 2)}</pre>
				
				<footer className="flex flex-col">{
					isInCart ? (
						<Button variant="destructive" size="sm" onClick={()=> remove(seatId)}>
							Remove from cart
						</Button>
					) : (
						<Button variant="default" size="sm" onClick={()=>add(seatId, ticket)}>
							Add to cart
						</Button>
					)
				}</footer>
			</PopoverContent>
		</Popover>
	);
});