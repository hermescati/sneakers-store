import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Logged out successfully.");

      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error("Couldn't logout, please try again.");
    }
  };

  return { logout };
};
