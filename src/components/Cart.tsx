import {useCart} from "@/cart";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [ticketsCount, setTicketsCount] = useState(0)
  const {cart} = useCart()

  useEffect(() => {
    let price = 0;
    let count = 0;
    Object.values(cart).forEach((ticket) => {
      count += 1;
      price += ticket.ticketType.price;
    });
    setTicketsCount(count);
    setTotalPrice(price);
  }, [cart]);

  return (
  <nav className="sticky bottom-0 left-0 right-0 text-black bg-white border-t border-zinc-200 flex justify-center">
    {/* inner content */}
    <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
      {/* total in cart state */}
      <div className="flex flex-col">
        <span>Total for {ticketsCount} tickets</span>
        <span className="text-2xl font-semibold">{totalPrice} CZK</span>
      </div>

      {/* checkout button */}
      <Button variant="default">
        Checkout now
      </Button>
    </div>
  </nav>
  )
}