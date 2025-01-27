'use client'

import {Error, Loading} from "@/components";
import {Button} from "@/components/ui/button";
import {useAuth, type User} from "@/auth";
import {Input} from "@/components/ui/input";
import {forwardRef, type HTMLAttributes, useState} from "react";

// TODO: get rid of this
const TEST_PASSWORD = "Nfctron2025";
const TEST_EMAIL = "frontend@nfctron.com";

// POST:/login
// {email: string, password: string} => {message: string, user: User}
type LoginResponse = { message: string, user: User }

export const LoginForm = forwardRef<HTMLFormElement, HTMLAttributes<HTMLElement>>((props, ref) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {storeUser} = useAuth();

  return (<form ref={ref} {...props} onSubmit={async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const email = event.currentTarget.email.value;
      if (!email) {
        setError("Email is required");
      }

      const password = event.currentTarget.password.value;
      if (!password) {
        setError("Password is required");
      }

      const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/login", {
        method: "POST", body: JSON.stringify({
          email, password,
        }), headers: {"Content-Type": "application/json"},
      });

      if (!response.ok) {
        setError("Invalid email or password");
      }

      const {user}: LoginResponse = await response.json();

      storeUser(user);
      setIsLoading(false);
    }} className="flex flex-col gap-4 relative overflow-hidden text-black">
      <div>
        <label htmlFor="email">Email</label>
        <Input name="email" defaultValue={TEST_EMAIL} type="email"/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input name="password" defaultValue={TEST_PASSWORD} type="password"/>
      </div>
      <Button type="submit">Login</Button>
      {isLoading && <Loading/>}
      {error && <Error error={error}/>}
    </form>);
});