[watchit](https://watchit123.netlify.app/)

# 🎬 Watchit — Web App de Filmes e Séries

Aplicativo web responsivo desenvolvido com React que consome a [API do TMDB](https://www.themoviedb.org/) para exibir listas de filmes e séries populares, mais bem avaliados e permitir buscas por título. A aplicação também oferece uma página de detalhes completa com trailer, elenco, temporadas, plataformas de streaming disponíveis e mais.

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


## 📌 Funcionalidades

- 🔎 Pesquisa de filmes e séries por nome
- 📈 Listagens de "Populares" e "Mais bem avaliados"
- 🎥 Visualização de trailers (com `<dialog>` e `iframe`)
- 🧑‍🤝‍🧑 Exibição do elenco com fotos e nomes (real/personagem)
- 📺 Detalhamento de temporadas e episódios para séries
- 🌐 Informações sobre plataformas de streaming
- 📱 Layout responsivo (mobile-first) com foco em acessibilidade
- ➕ Paginação por botão "Carregar mais" no final de cada secção
- 🔗 Links diretos para o TMDB (filmes/séries e perfis de atores)
- 🌐 Navegação com React Router

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **React Router DOM**
- **React Query (TanStack Query)**
  - `useInfiniteQuery` para listas com paginação
  - `useQuery` para detalhes
- **Fetch API** (sem Axios)
- **CSS puro**
- **React Icons**
- **API do TMDB**
- **Netlify Functions (Serverless)** para proteger a chave da API

---

## Proposito do projeto

Este projeto foi criado como parte do meu processo de aprendizado em React, mas com o objetivo de ser **totalmente funcional e usável na prática**.

---

## Autor
Pedro Fernandes

