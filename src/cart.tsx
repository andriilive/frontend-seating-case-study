'use client';

import type {Ticket} from "@/components/Seating";
import {createContext, type PropsWithChildren, useContext, useReducer} from "react";

// TODO: improve the

type Cart = Record<string, Ticket>;

const CartContext = createContext<{
  add(ticketId: string, ticketData: Ticket): void;
  isInCart(ticketId: string): boolean;
  remove(ticketId: string): void;
  ticketsCount: number;
  cartTotal: number;
  cart: Cart;
} | undefined>(undefined);

type Action =
  | { type: "ADD_TICKET"; ticketId: string; ticketData: Ticket }
  | { type: "REMOVE_TICKET"; ticketId: string };

const cartReducer = (cart: Cart, action: Action): Cart => {
  switch (action.type) {
    case "ADD_TICKET": {
      const {ticketId, ticketData} = action;
      const cartData = {...cart, [ticketId]: ticketData}
      localStorage.setItem('cart', JSON.stringify(cartData))
      return {...cart, [ticketId]: ticketData};
    }
    case "REMOVE_TICKET": {
      const {ticketId} = action;
      const {[ticketId]: _, ...rest} = cart;
      // TODO: fix the linter to warn on _vars instead of error
      console.log(_)
      localStorage.setItem('cart', JSON.stringify(rest))
      return rest;
    }
    default:
      return cart;
  }
};

const CartProvider = ({children}: PropsWithChildren) => {
  const initialCart = JSON.parse(localStorage.getItem("cart") || "{}");
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const add = (ticketId: string, ticketData: Ticket) => {
    dispatch({type: "ADD_TICKET", ticketId, ticketData});
  };

  const remove = (ticketId: string) => {
    dispatch({type: "REMOVE_TICKET", ticketId});
  };

  const isInCart = (ticketId: string) => {
    return !!cart[ticketId];
  };

  return (
    <CartContext.Provider value={{cart, add, remove, isInCart,
      ticketsCount: Object.keys(cart).length,
      cartTotal: Object.values(cart).reduce((acc, {ticketType}) => acc + ticketType.price, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export {CartProvider, useCart};