import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export default function Header() {
  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSidebarDrawer();
  return (
    <Flex
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      color="orange.500"
    >
      {!isWideScreen && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label='Open navigation'
          mr='2'
        ></IconButton>
      )}
      <Logo />
      {isWideScreen && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile showProfileData={isWideScreen} />
      </Flex>
    </Flex>
  );
}
