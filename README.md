# Lógica e Linguagem de Programação — Semanas 22 e 23

Site didático estático para condensar os conteúdos das Semanas 22 e 23 em **duas aulas de 50 minutos**, incluindo explicação, demonstrações e dois registros.

## Trilha

```text
Dados → Listas → Repetição → Cadastro → Funções → Média → Classificação → Ordenação → Ranking
```

## Aula 1 — Semana 22
Tema: **Agenda e cadastros em memória**.

Conteúdos priorizados:

- dados temporários em memória;
- listas;
- índices;
- `append()`;
- `for`;
- cadastrar, consultar e listar;
- lista vazia;
- `len()`.

### Registro 1 adaptado
O sistema-base já possui cadastro, consulta e menu. O estudante completa:

1. listagem;
2. tratamento da lista vazia;
3. total de produtos.

Os desafios adicionais do roteiro original ficam opcionais.

## Aula 2 — Semana 23
Tema: **Médias, faixas, classificação e ranking**.

Conteúdos priorizados:

- média;
- `if / elif / else`;
- funções e `return`;
- reaproveitamento de lógica;
- lista de resultados;
- `sort()`;
- `lambda` apenas como leitura do critério de ordenação;
- `enumerate()`;
- ranking.

### Registro 2 adaptado
As funções `calcular_media_vendas()` e `classificar_desempenho()` já vêm prontas. O estudante completa:

1. processamento dos produtos;
2. ordenação;
3. exibição do ranking.

Salvar `ranking.txt` e integrar ao menu ficam como desafio opcional por causa do tempo disponível.

## Recursos interativos do site

- simulador de lista;
- visualização de índices;
- simulador de classificação por média;
- simulador de ranking;
- blocos de código com botão de copiar;
- quiz com 10 questões e feedback imediato;
- modo claro/escuro persistente;
- menu responsivo e acessível.

## Modo escuro
O tema foi implementado com variáveis CSS, sem duplicar grandes blocos de estilo. A preferência é aplicada no `<head>` antes da renderização para evitar o efeito de piscar e é persistida por `localStorage` quando disponível. Há fallback para `prefers-color-scheme`.

## GitHub Pages
O projeto utiliza apenas HTML, CSS e JavaScript puro e todos os links são relativos.

Para publicar:

1. envie toda a pasta para um repositório;
2. abra **Settings > Pages**;
3. escolha **Deploy from a branch**;
4. selecione `main` e `/ (root)`;
5. salve.

## Estrutura

```text
logica_programacao_semanas22_23/
├── index.html
├── styles.css
├── script.js
├── README.md
├── RELATORIO_VALIDACAO.md
├── materiais/
│   ├── semana22/
│   │   ├── aula1.pptx
│   │   ├── aula2.pptx
│   │   ├── aula3.pptx
│   │   ├── aula4.pptx
│   │   └── roteiro-original-semana22.docx
│   └── semana23/
│       ├── aula1.pptx
│       ├── aula2.pptx
│       ├── aula3.pptx
│       ├── aula4.pptx
│       └── roteiro-original-semana23.docx
├── registro1/
│   ├── atividade.py
│   └── INSTRUCOES.md
└── registro2/
    ├── atividade.py
    └── INSTRUCOES.md
```
