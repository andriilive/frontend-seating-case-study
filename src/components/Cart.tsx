import {useCart} from "@/cart";
import {Checkout} from "@/components/Checkout";
import {Button} from "@/components/ui/button";
import {DialogTrigger} from "@/components/ui/dialog";

export const Cart = () => {
  const {cartTotal, ticketsCount} = useCart()

  return (
  <nav className="sticky bottom-0 left-0 right-0 text-black bg-white border-t border-zinc-200 flex justify-center">
    {/* inner content */}
    <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
      {/* total in cart state */}
      <div className="flex flex-col">
        <span>Total for {ticketsCount} tickets</span>
        <span className="text-2xl font-semibold">{cartTotal} CZK</span>
      </div>

      {/* checkout button */}
      <Checkout>
        <DialogTrigger asChild>
          <Button variant="default">
            Checkout now
          </Button>
        </DialogTrigger>
      </Checkout>
    </div>
  </nav>
  )
}