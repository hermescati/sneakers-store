import { cookies } from "next/headers";
import Link from "next/link";
import { getPayloadUser } from "../../lib/payload-utils";
import Button from "../base/Button";
import MainContainer from "../MainContainer";
import NavCart from "./NavCart";
import NavCategories from "./NavCategories";
import UserAccount from "./UserAccount";
import { cn } from "@/utils";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getPayloadUser(nextCookies);

  return (
    <div className="sticky z-20 top-0 inset-x-0">
      <header className="relative bg-background shadow">
        <MainContainer>
          <div className="flex gap-20 py-6 items-center">
            {/* TODO: Mobile nav */}
            <div className="flex">
              <Link href="/">
                <h2 className="font-bold text-xl text-foreground">Sneakers.</h2>
              </Link>
            </div>
            <div className="flex flex-grow items-center">
              <div className="relative hidden lg:flex lg:flex-1 lg:items-center lg:justify-end transition-all duration-300 ease-in-out">
                {user ? (
                  <UserAccount user={user} />
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" href="/login" label="Login" />
                    <Button href="/signup" label="Sign up" />
                  </div>
                )}
                <div className={cn("flex", user ? "pl-4 pr-8" : "px-8")}>
                  <span
                    className="h-8 w-px bg-primary-300"
                    aria-hidden="true"
                  />
                </div>
                <NavCart />
              </div>
            </div>
          </div>
          <div className="hidden z-50 lg:block lg:self-stretch">
            <NavCategories />
          </div>
        </MainContainer>
      </header>
    </div>
  );
};

export default Navbar;
