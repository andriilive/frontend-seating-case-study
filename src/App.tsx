import {useAuth} from "@/auth";
import { Author } from "@/components";
import { Event } from "@/components/Event";
import { LoginForm } from "@/components/LoginForm";
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import './App.css';
import {UserMenu} from "@/components/UserMenu";

function App() {
	const {isLoggedIn} = useAuth();
	
	return (
		<div className="flex flex-col grow">
			{/* header (wrapper) */}
			<nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
					{/* application/author image/logo placeholder */}
          <Author />
					<div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
					{/* user menu */}
					<div className="max-w-[250px] w-full flex justify-end">
						{
							isLoggedIn ? (
								<UserMenu />
							) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      Login or register
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-black" aria-describedby={'login-or-register'}>
										<DialogTitle hidden aria-hidden={'true'}>
											Login or register
										</DialogTitle>
                    <LoginForm />
                  </DialogContent>
                </Dialog>
							)
						}
					</div>
				</div>
			</nav>

			<Event />
			
			{/* bottom cart affix (wrapper) */}
			<nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
					{/* total in cart state */}
					<div className="flex flex-col">
						<span>Total for [?] tickets</span>
						<span className="text-2xl font-semibold">[?] CZK</span>
					</div>
					
					{/* checkout button */}
					<Button disabled variant="default">
						Checkout now
					</Button>
				</div>
			</nav>
		</div>
	);
}

export default App;
