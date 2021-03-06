import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { LinkType } from "../types/LinkType";
import { ReactNode } from "react";
import { isAuthenticated } from "../state/authSlice";
import { useAppSelector } from "../state/store";

const Links: Array<LinkType> = [
  { name: "Sign Up", link: "/sign_up" },
  { name: "Sign In", link: "/sign_in" },
];

const NavLink = ({ children, link }: { children: ReactNode; link: string }) => (
  <Link to={link}>
    <Button
      px={2}
      py={1}
      variant="link"
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Button>
  </Link>
);

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const authenticated = useAppSelector(isAuthenticated);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {!authenticated &&
                Links.map((link) => (
                  <NavLink key={link.name} link={link.link}>
                    {link.name}
                  </NavLink>
                ))}
            </HStack>
          </HStack>
          {authenticated && (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {!authenticated &&
                Links.map((link) => (
                  <NavLink key={link.name} link={link.link}>
                    {link.name}
                  </NavLink>
                ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
