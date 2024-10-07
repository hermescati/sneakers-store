import { cn } from "@/utils";
import { ReactNode } from "react";

const MainContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-2xl px-8 3xl:px-0", className)}
    >
      {children}
    </div>
  );
};

export default MainContainer;
