"""Registro 2 — Semana 23
Ranking de desempenho da Papelaria Ponto Certo.

As funções de cálculo e classificação já estão prontas.
Complete o processamento dos produtos, a ordenação e a exibição do ranking.
"""

vendas = [
    ["Caderno", 10],
    ["Caderno", 12],
    ["Caderno", 20],
    ["Caneta", 15],
    ["Caneta", 25],
    ["Mochila", 35],
    ["Mochila", 45],
    ["Borracha", 4],
    ["Borracha", 5],
]

produtos = ["Caderno", "Caneta", "Mochila", "Borracha"]


def calcular_media_vendas(vendas, nome):
    quantidades = []

    for item in vendas:
        if item[0] == nome:
            quantidades.append(item[1])

    if len(quantidades) == 0:
        return None

    return sum(quantidades) / len(quantidades)


def classificar_desempenho(media):
    if media is None:
        return "Sem histórico"
    if media >= 30:
        return "Alto"
    elif media >= 10:
        return "Médio"
    else:
        return "Baixo"


resultados = []

# TODO 1:
# Percorra a lista produtos.
# Para cada produto:
#   - calcule a média usando calcular_media_vendas()
#   - classifique usando classificar_desempenho()
#   - adicione em resultados no formato:
#     [produto, media, desempenho]


# TODO 2:
# Ordene resultados pela média, do maior para o menor.
# Trecho de apoio:
# resultados.sort(key=lambda item: item[1], reverse=True)


print("\n=== RANKING DE DESEMPENHO ===")

# TODO 3:
# Use enumerate(resultados, start=1) para exibir:
# 1. Produto - média - desempenho


# DESAFIO OPCIONAL:
# Salve o ranking em ranking.txt e integre esta funcionalidade ao menu do sistema.
