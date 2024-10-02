import Link from "next/link";
import MainContainer from "./MainContainer";
import NavCategories from "./nav/NavCategories";
import Button from "./base/Button";

const Navbar = () => {
  const loggedUser = null;

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0">
      <header className="relatieve bg-white">
        <MainContainer>
          <div>
            <div className="flex h-16 items-center">
              {/* TODO: Mobile nav */}

              <div className="flex">
                <Link href="/">
                  <h2 className="font-bold text-xl text-foreground">
                    Sneakers.
                  </h2>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {loggedUser ? null : <Button size="small" label="Sign in" />}
                  {loggedUser ? null : (
                    <span
                      className="h-6 w-px bg-primary-400"
                      aria-hidden="true"
                    />
                  )}
                  {loggedUser ? (
                    <></>
                  ) : (
                    <Button
                      size="small"
                      href="/sign-up"
                      label="Create account"
                    />
                  )}
                  {loggedUser ? (
                    <span
                      className="h-6 w-px bg-primary-400"
                      aria-hidden="true"
                    />
                  ) : null}
                  {loggedUser ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-primary-400"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">Cart Comp.</div>
                </div>
              </div>
            </div>

            <div className="hidden z-50 lg:block lg:self-stretch">
              <NavCategories />
            </div>
          </div>
        </MainContainer>
      </header>
    </div>
  );
};

export default Navbar;
