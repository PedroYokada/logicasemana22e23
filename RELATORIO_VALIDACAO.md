# Relatório de validação — Site de Lógica de Programação

## Escopo revisado

O projeto foi construído especificamente para as Semanas 22 e 23 e revisado para evitar os problemas encontrados anteriormente no site de Front-End, sobretudo modo escuro inconsistente, cores fixas, overflow horizontal e controles que se desalinhavam em telas pequenas.

## Prevenção dos problemas de modo escuro

- O tema é aplicado no `<head>` antes da renderização da página, reduzindo o efeito de piscar entre claro e escuro.
- A preferência usa a chave `logic-theme` no `localStorage` com `try/catch`.
- Se o armazenamento estiver indisponível, o tema continua funcionando durante a sessão.
- Sem preferência salva, o site utiliza `prefers-color-scheme`.
- O botão sincroniza ícone, texto, `aria-label` e `aria-pressed`.
- Cores de cards, painéis, inputs, simuladores, quiz e códigos usam variáveis CSS.
- O modo escuro não é implementado por inversão de cores.
- As exceções da seção vermelha possuem overrides explícitos no tema escuro para evitar texto claro sobre fundo claro.

## Responsividade

Foram previstos breakpoints para:

- desktop amplo;
- telas abaixo de 1060 px;
- tablets e menu móvel abaixo de 980 px;
- telas abaixo de 760 px;
- celulares abaixo de 560 px;
- celulares estreitos abaixo de 360 px.

Proteções utilizadas:

- `min-width: 0` em filhos de grids importantes;
- `overflow-x: hidden` no `body`;
- `overflow-x: auto` em blocos de código;
- grids convertidos em uma coluna no mobile;
- botões de simuladores ocupam a largura disponível em telas pequenas;
- menu móvel possui altura máxima e rolagem vertical;
- textos longos não dependem de larguras fixas.

## Acessibilidade

- link “Pular para o conteúdo”;
- foco visível;
- `aria-expanded` no menu;
- `aria-pressed` no tema;
- fechamento do menu com `Escape`;
- fechamento do menu ao selecionar item ou clicar fora;
- `aria-live` nos simuladores e feedbacks;
- suporte a `prefers-reduced-motion`.

## Validações automáticas executadas

- JavaScript: `node --check` — OK.
- Arquivos Python dos dois registros: compilação sintática — OK.
- HTML: parse — OK.
- IDs duplicados — nenhum.
- Referências locais quebradas — nenhuma.
- Chaves CSS — balanceadas.
- Caminhos dos materiais — relativos e existentes.

## Observação sobre testes visuais

A revisão principal foi feita por auditoria estrutural, CSS responsivo e validações de sintaxe/caminhos. O projeto não depende de bibliotecas, fontes externas ou CDNs, reduzindo diferenças entre execução local e GitHub Pages.
