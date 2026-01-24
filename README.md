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

## ♿ Acessibilidade

Este projeto foi desenvolvido com foco em usabilidade e acessibilidade básica para aplicações SPA.

- Uso de HTML semântico e landmarks
- Navegação completa por teclado
- Contraste de cores validado
- Uso criterioso de atributos ARIA quando necessário
- Componentes como `<dialog>` utilizados de forma acessível

⚠️ Nota: No momento em que criei este projeto, não tinha conhecimento das "nuances" do comportamento de leitores de tela em relação a sites spa versus sites de múltiplas páginas. Cito o fato de que em apps spa o leitor não sabe que a página foi trocada. Por conta disso, o projeto é amigável a leitores de tela até o momento da troca de rotas.

---

## 🧠 Decisões Técnicas

- Optei por paginação via botão “Carregar mais” em vez de scroll infinito para manter previsibilidade de navegação e melhor controle de foco.
- Utilizei Netlify Functions para evitar exposição da chave da API do TMDB no frontend.

## Proposito do projeto

Este projeto foi criado como parte do meu processo de aprendizado em React, com foco em consumo de APIs, gerenciamento de estado assíncrono e construção de aplicações SPA funcionais e acessíveis.

---

## Autor
Pedro Fernandes

