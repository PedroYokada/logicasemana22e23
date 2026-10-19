# Registro 2 — Ranking de desempenho

## Tempo sugerido
25 minutos.

## Objetivo
Processar vários produtos, reutilizar funções de cálculo e classificação, ordenar os resultados pela média e exibir um ranking.

## O que já está pronto
O arquivo `atividade.py` já possui:

- lista de vendas;
- lista de produtos;
- `calcular_media_vendas()`;
- `classificar_desempenho()`;
- lista `resultados = []`.

## Tarefa 1 — Processar os produtos
Para cada nome em `produtos`:

1. calcule a média;
2. classifique o desempenho;
3. adicione o resultado à lista.

Formato esperado de cada item:

```python
[produto, media, desempenho]
```

## Tarefa 2 — Ordenar
Use:

```python
resultados.sort(key=lambda item: item[1], reverse=True)
```

A posição `1` é a média. `reverse=True` coloca as maiores médias primeiro.

## Tarefa 3 — Exibir o ranking
Use:

```python
enumerate(resultados, start=1)
```

Exemplo de saída:

```text
=== RANKING DE DESEMPENHO ===
1. Mochila - 40.0 - Alto
2. Caneta - 20.0 - Médio
3. Caderno - 14.0 - Médio
4. Borracha - 4.5 - Baixo
```

## Desafio opcional
Se houver tempo:

- salvar o ranking em `ranking.txt`;
- integrar a opção de ranking ao menu principal.

## Evidência
Entregue:

- o arquivo `.py` atualizado;
- um print do ranking funcionando;
- `ranking.txt`, somente se realizar o desafio.
