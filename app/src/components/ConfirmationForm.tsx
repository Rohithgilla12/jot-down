import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { SetStateAction, useState } from "react";
import { confirmCode, setOtpCode } from "../state/authSlice";

import { useAppDispatch } from "../state/store";

interface ConfirmationFormProps {}

type ForgotPasswordFormInputs = {
  email: string;
};

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Confirmation Code
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Please enter the code that you have received on your email.
        </Text>
        <FormControl id="code">
          <Input
            placeholder="123456"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              dispatch(setOtpCode(e.target.value as string))
            }
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={() => {
              dispatch(confirmCode());
            }}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
