"use client";

import { User } from "@/types/payload";
import DropdownMenu, { DropdownItem } from "../base/DropdownMenu";
import { useAuth } from "@/hooks/use-auth";

interface UserAccountProps {
  user: User;
}

const UserAccount = ({ user }: UserAccountProps) => {
  const { logout } = useAuth();

  const dropdownItems: DropdownItem[] = [
    { value: "email", label: user.email, type: "header" },
    { value: "dashboard", label: "Retailer Dashboard", icon: "mage:dashboard" },
    {
      value: "logout",
      label: "Log out",
      icon: "fluent:power-20-regular",
      action: logout,
    },
  ];

  return (
    <DropdownMenu
      id="account-dropdown"
      title="My account"
      items={dropdownItems}
    />
  );
};

export default UserAccount;
