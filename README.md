# Financial Dashboard

Este projeto é um **dashboard financeiro interativo** desenvolvido como parte de um desafio técnico proposto em um processo seletivo. Ele também serve como base de estudos contínuos em tecnologias modernas de front-end como Next.js, TypeScript e styled-components.

- login: admin@admin.com 
- senha: admin123

## 🔗 Acesse o projeto online

👉 [https://dashboard-one-smoky.vercel.app/login](https://dashboard-one-smoky.vercel.app/login)

---

## ⚙️ Tecnologias utilizadas

- [Next.js](https://nextjs.org/) `v15.3.2`
- [React](https://react.dev/) `v19`
- [TypeScript](https://www.typescriptlang.org/) `^5`
- [styled-components](https://styled-components.com/) `^6`
- [MUI (Material UI)](https://mui.com/)
- [Recharts](https://recharts.org/) para visualização de dados
- [Jest](https://jestjs.io/) e [ts-jest](https://github.com/kulshekhar/ts-jest) para testes
- [Day.js](https://day.js.org/) e [date-fns](https://date-fns.org/) para manipulação de datas
- [Axios](https://axios-http.com/) para requisições
- [react-countup](https://github.com/glennreyes/react-countup) para animação de números
- [react-hot-toast](https://react-hot-toast.com/) para notificações

---

## 📦 Scripts disponíveis

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera a build de produção
npm run start     # Inicia a aplicação em produção
npm run lint      # Executa o linter
npm run test      # Executa os testes com Jest
```

# Funcionalidades

- Página de login com autenticação fictícia

- Proteção de rota da Dashboard

- Persistência de sessão e filtros via LocalStorage

- Filtros globais por data, conta, indústria e estado

- Cards com resumo financeiro (receitas, despesas, saldo, pendências)

- Gráfico de barras empilhadas e gráfico de linhas com saldo mensal

- Lista de transações filtrável e paginada

- Sidebar com navegação e logout

- Interface responsiva para mobile e desktop

---

# Instalação e execução local

## Pré-requisitos

- Node.js v18+
- NPM ou Yarn

## Passos

- Clone o repositório:

```bash
git clone https://github.com/flavio-costap/Dashboard.git
cd Dashboard
```

- Instale as dependências:

```bash
npm install
# ou
yarn
```

- Utilize o arquivo [transactions.json](https://dashboard-one-smoky.vercel.app/transactions.json).

- Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

- Acesse http://localhost:3000