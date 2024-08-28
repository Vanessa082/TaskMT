import { useAppContext } from "../../../providers/context/app-context";
import { Menu, MenuButton } from "@headlessui/react";
import { getInitials } from "../../../utils";

function UserAvatar() {
  const { currentUser } = useAppContext();

  const handleLogout = () => {
    // required logic
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="bg-background-color px-5 py-2.5  rounded-full cursor-pointer font-bold font-sans text-accent-color w-full" >
          {currentUser.username}
        </MenuButton>
      </div>
    </Menu>
  );
}

export default UserAvatar;
