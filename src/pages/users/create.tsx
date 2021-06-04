import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React from "react";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

type CreateFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string()
    .required("Senha obrigatória")
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
  password_confirmation: Yup.string().oneOf(
    [null, Yup.ref("password")],
    "As senhas devem ser iguais"
  ),
});

export default function UserList() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserValidationSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação de senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="orange"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
