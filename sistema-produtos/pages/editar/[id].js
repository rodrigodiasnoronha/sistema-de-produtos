import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../services/api";

import { Button, Container, Input, Heading, Stack } from "@chakra-ui/react";

export default function Cadastro() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const router = useRouter();

  useEffect(() => {
    const produtoId = router.query.id;

    api
      .get(`produtos/${produtoId}`)
      .then((response) => {
        console.log(response);

        setNomeProduto(response.data.nome);
        setPrecoProduto(response.data.preco);
      })
      .catch((err) => {
        console.log(err);
        alert("Ocorreu um erro ao mostrar o produto");
        router.push("/listagem");
      });
  }, []);

  function voltarParaListagem() {
    router.push("/");
  }

  function onSubmit(event) {
    const produtoId = router.query.id;

    event.preventDefault();
    api
      .put(`/produtos/${produtoId}`, { nome: nomeProduto, preco: precoProduto })
      .then(() => router.push("/listagem"))
      .catch((e) => alert("Ocorreu um erro ao cadastrar o produto"));
  }

  return (
    <Container mt={5}>
      <Heading>Editar produto</Heading>

      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>

          <Input
            type="text"
            placeholder="Nome do produto"
            value={nomeProduto}
            onChange={(event) => setNomeProduto(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="preco">Preço</label>

          <Input
            type="number"
            placeholder="Preço do produto"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />
        </div>

        <Stack spacing={2} direction="row" align="center" mt={2}>
          <Button colorScheme="green" type="submit">
            Editar
          </Button>

          <Button colorScheme="blue" onClick={voltarParaListagem}>
            Voltar
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
