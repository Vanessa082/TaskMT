import { useAppContext } from "../../../providers/context/app-context";
import {
  Menu,
  MenuButton,
} from "@headlessui/react";
import { getInitials } from "../../../utils";

function UserAvatar() {
  const { currentUser } = useAppContext();

  const handleLogout = () => {
    // required logic
  };

  const initials = currentUser ? getInitials(currentUser.username) : "";

  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="w-full h-10 2xl:w-12 2xl:h-12 items-center  justify-center rounded-full bg-blue-600">
            <span className="text-white font-semibold">
            {initials}
            </span>
          </MenuButton>
        </div>
      </Menu>
  );
}

export default UserAvatar;
