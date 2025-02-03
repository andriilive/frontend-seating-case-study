import {useAuth, type User} from "@/auth";
import {useCart} from "@/cart";
import {LoginForm} from "@/components/LoginForm";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {UserCard} from "@/components/UserCard";
import {type PropsWithChildren, useState} from "react";

type Ticket = {
  "ticketTypeId": string,
  "seatId": string
}

// type CheckoutRequest = {
//   "eventId": string,
//   "tickets": {
//     "ticketTypeId": "uuid",
//     "seatId": "uuid"
//   }[],
//   "user": User
// }

type CheckoutResponse = {
  "message": string,
  "orderId": string,
  "tickets": Ticket[],
  "user": User,
  "totalAmount": 0
}

export const Checkout = ({children}: PropsWithChildren) => {
  const {isLoggedIn, user} = useAuth();
  const {cartTotal, ticketsCount, cart} = useCart();
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          eventId: localStorage.getItem('eventId'),
          tickets: Object.values(cart).map((ticket) => ({
            ticketTypeId: ticket.ticketType.id,
            seatId: ticket.ticketData.seatId
          })),
          user: user
        }
      ),
    })
      .then(response => response.json())
      .then((data: CheckoutResponse) => {
        console.log('Success:', data);
        setSuccess(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setSuccess(false);
      });
  }

  function CheckoutProcess(){
    return (
      <>
        {children}
        <DialogContent className="bg-white text-black" aria-describedby={'login-or-register'}>
          <DialogTitle className={'border-b border-zinc-200 pb-4'}>
            <h1 className="font-bold">Checkout</h1>
          </DialogTitle>
          <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
            <span className={'text-gray-600'}>Total for {ticketsCount} tickets</span>
            <span className="text-2xl font-semibold">{cartTotal} CZK</span>
          </div>
          {(isLoggedIn ? (
            <>
              <div className={'bg-gray-200 rounded-md p-4 flex justify-between items-center'}>
              <span className={'text-xs'}>
                Logged in as
              </span>
                <UserCard user={user!}/>
              </div>
              <Button onClick={() => handleCheckout()} variant="default">Pay now</Button>
            </>
          ) : (
            <>
              <LoginForm/>
              <Button onClick={() => handleCheckout()} variant="ghost">Checkout as guest</Button>
            </>
          ))}
        </DialogContent>
      </>
    )
  }

  function Success(){
    return (
      <DialogContent className="bg-white text-black" aria-describedby={'login-or-register'}>
        <DialogTitle className={'border-b border-zinc-200 pb-4'}>
          <h1 className="font-bold">Checkout</h1>
        </DialogTitle>
        <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
          <span className={'text-gray-600'}>Total for {ticketsCount} tickets</span>
          <span className="text-2xl font-semibold">{cartTotal} CZK</span>
        </div>
        <div className={'bg-green-200 rounded-md p-4 flex justify-between items-center'}>
          <span className={'text-xs'}>
            Order successful
          </span>
        </div>
      </DialogContent>
    )
  }

  return (
    <Dialog>
      {success ? <Success /> : <CheckoutProcess />}
    </Dialog>
  )
}