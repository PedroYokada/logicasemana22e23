# Registro 1 — Finalizando a primeira versão do sistema

## Tempo sugerido
25 minutos.

## Objetivo
Completar a listagem de produtos de um cadastro mantido em memória, usando lista, repetição e condicionais.

## O que já está pronto
O arquivo `atividade.py` já possui:

- lista `produtos`;
- cadastro de produto;
- consulta de produto;
- menu principal;
- chamada da função `listar_produtos()`.

Você não precisa reconstruir o sistema.

## Tarefa 1 — Lista vazia
Dentro de `listar_produtos(produtos)`, verifique se não há produtos cadastrados.

Saída esperada:

```text
Nenhum produto cadastrado.
```

## Tarefa 2 — Listar os produtos
Percorra a lista usando `for` e mostre o nome e o preço de cada produto.

Exemplo:

```text
Caneta - R$ 2.50
Caderno - R$ 18.90
```

## Tarefa 3 — Total de produtos
Depois da listagem, use `len(produtos)` para exibir:

```text
Total de produtos: 2
```

## Teste obrigatório
1. Execute o programa.
2. Teste a opção 3 com a lista vazia.
3. Cadastre pelo menos 3 produtos.
4. Liste novamente.
5. Confira o total.

## Desafio opcional
Se terminar antes, escolha apenas um:

- impedir produtos duplicados;
- ordenar os produtos pelo nome;
- remover um produto;
- inserir um produto no início da lista.

## Evidência
Entregue:

- o arquivo `.py` atualizado;
- um print do programa funcionando.
