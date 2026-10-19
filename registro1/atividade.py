"""Registro 1 — Semana 22
Finalizando a primeira versão do sistema da Papelaria Ponto Certo.

O cadastro e a consulta já estão prontos.
Complete apenas a função de listagem e teste o programa.
"""

produtos = []


def cadastrar_produto(produtos):
    nome = input("Nome do produto: ").strip()

    if nome == "":
        print("Nome inválido.")
        return

    preco = float(input("Preço do produto: R$ "))
    produtos.append([nome, preco])
    print("Produto cadastrado com sucesso!")


def consultar_produto(produtos):
    nome_busca = input("Produto que deseja consultar: ").strip().lower()

    for produto in produtos:
        if produto[0].lower() == nome_busca:
            print(f"Encontrado: {produto[0]} - R$ {produto[1]:.2f}")
            return

    print("Produto não encontrado.")


def listar_produtos(produtos):
    # TODO 1: verifique se a lista está vazia.
    # Se estiver, mostre: Nenhum produto cadastrado.

    # TODO 2: percorra a lista usando for e exiba cada produto.
    # Exemplo esperado:
    # Caneta - R$ 2.50

    # TODO 3: ao final, exiba o total usando len(produtos).
    # Exemplo: Total de produtos: 3
    pass


def exibir_menu():
    print("\n=== PAPELARIA PONTO CERTO ===")
    print("1 - Cadastrar produto")
    print("2 - Consultar produto")
    print("3 - Listar produtos")
    print("0 - Sair")


while True:
    exibir_menu()
    opcao = input("Escolha uma opção: ").strip()

    if opcao == "1":
        cadastrar_produto(produtos)
    elif opcao == "2":
        consultar_produto(produtos)
    elif opcao == "3":
        listar_produtos(produtos)
    elif opcao == "0":
        print("Programa encerrado.")
        break
    else:
        print("Opção inválida.")
