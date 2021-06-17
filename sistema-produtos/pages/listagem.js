import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { api } from "../services/api";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  Container,
  Stack,
} from "@chakra-ui/react";

export default function Listagem() {
  const [produtoList, setProdutoList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => {
        const produtoList = response.data;
        setProdutoList(produtoList);
      })
      .catch(console.log);
  }, []);

  function voltarParaListagem() {
    router.push("/");
  }

  function excluirProduto(produtoId) {
    api
      .delete(`/produtos/${produtoId}`)
      .then(() => {
        alert("Produto excluido");
        const novaProdutoList = produtoList.filter(
          (produto) => produto._id != produtoId
        );
        setProdutoList(novaProdutoList);
      })
      .catch((err) => {
        alert("Ocorreu um erro ao excluir o produto");
        console.log(err);
      });
  }

  function editarProduto(produtoId) {
    return router.push(`/editar/${produtoId}`);
  }

  return (
    <Container mt={5}>
      <div>
        <Heading my={5}>Listagem de produtos</Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome do produto</Th>
              <Th>Preço do produto</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {produtoList.map((produto) => (
              <Tr key={produto._id}>
                <Td>{produto.nome}</Td>
                <Td>{produto.preco}</Td>

                <Stack spacing={2} direction="row" align="center">
                  <Button
                    colorScheme="red"
                    my={2}
                    onClick={() => excluirProduto(produto._id)}
                  >
                    Excluir
                  </Button>

                  <Button
                    colorScheme="yellow"
                    my={2}
                    onClick={() => editarProduto(produto._id)}
                  >
                    Editar
                  </Button>
                </Stack>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="blue" onClick={voltarParaListagem} mt={2}>
          Voltar
        </Button>
      </div>
    </Container>
  );
}
