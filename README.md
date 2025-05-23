[watchit](https://watchit123.netlify.app/)

# watchit

**watchit** é um aplicativo web feito em **React** que consome a API do [TMDB (The Movie Database)](https://www.themoviedb.org/) para exibir listas de filmes e séries populares e mais bem avaliados. O projeto permite também pesquisar filmes/séries pelo nome, visualizar detalhes e trailers, elenco e onde assistir.

## Screenshots

<p align="center">
  <img loading="lazy" src="/Screenshots/img01.png"/>
  <img loading="lazy" src="/Screenshots/img02.png"/>
</p>

<p align="center">
  <img loading="lazy" src="/Screenshots/img04.png"/>
</p>

<p align="center">
  <img loading="lazy" src="/Screenshots/img05.png"/>
</p>

<p align="center">
  <img loading="lazy" src="/Screenshots/img06.png"/>
</p>

<p align="center">
  <img loading="lazy" src="/Screenshots/img07.png"/>
</p>


## Funcionalidades

- Exibe **filmes e séries populares** (endpoint `popular`)
- Exibe os **mais votados** (endpoint `top_rated`)
- Pesquisa por título de filme/série
- Cards com pôster + overlay com título e nota
- Página de **detalhes completa** com:
  - Poster e trailer (modal com `<dialog>` e `iframe`, de acordo com a disponibilidade no TMDB)
  - Título, sinopse, gêneros
  - Temporadas e episódios (se for série)
  - Elenco com foto, nome real e nome no filme/série
  - Links diretos para os atores no TMDB
  - Informações sobre provedores de streaming
  - Link direto para o TMDB do filme/série
- Layout **mobile-first**
- Design com **foco em acessibilidade**
- Visualização por página (no fim de cada seção tem botão para carregar a próxima página)
- Navegação com React Router

---

## Tecnologias

- **React**
- **CSS puro**
- **React Router DOM**
- **React Query (TanStack Query)**
  - `useInfiniteQuery` para listas com paginação
  - `useQuery` para detalhes de filmes/séries
- **Fetch API** (sem Axios)
- **React Icons** (para ícones como estrela de avaliação)
- **TMDB API**
- **Netlify Functions (Serverless)** para proteger a chave da API

---

## Proposito do projeto

Este projeto foi criado como parte do meu processo de aprendizado em React, mas com o objetivo de ser **totalmente funcional e usável na prática**.

---

## Autor
Pedro Fernandes

