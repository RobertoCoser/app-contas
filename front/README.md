# Controle Financeiro Pessoal

Aplicativo mobile para controle de receitas, despesas e saldo, desenvolvido em React Native com Expo.

## Recursos

- Cadastro e login de usuários
- Adicionar, editar e excluir receitas e despesas
- Visualização de saldo total, receitas e despesas
- Navegação entre telas de resumo, receitas, despesas e gráfico
- Edição de transações ao tocar nelas
- Interface moderna e responsiva

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Context API](https://react.dev/reference/react/useContext) para estado global
- [Axios](https://axios-http.com/) para requisições HTTP

## Instalação e uso do App

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o app:

   ```bash
   npx expo start
   ```

   Você pode rodar em:
   - Celular físico (usando o QR code no Expo Go)
   - Emulador Android/iOS

3. Certifique-se de que a API/backend está rodando e atualize o endereço da API nos arquivos de autenticação/cadastro se necessário.

## Instruções para rodar a API

1. Clone o repositório do backend (caso não esteja neste mesmo projeto):

   ```bash
   git clone https://github.com/RobertoCoser/app-contas/tree/main/backend
   cd seu-backend-repo
   ```

2. Instale as dependências do backend:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente se necessário (por exemplo, `.env`).

4. Inicie o servidor da API:

   ```bash
   npm start
   ```

   Por padrão, a API roda em `http://localhost:3000`.  
   **Se for rodar o app mobile no dispositivo físico, substitua `localhost` pelo IP da sua máquina no código do app.**

## Como usar

1. Faça cadastro ou login.
2. Gerencie receitas e despesas tocando em "Adicionar" ou editando itens da lista.
3. Navegue entre as abas para ver resumo, receitas, despesas ou gráfico.
4. Saia pelo botão "Sair" na tela inicial.

## Personalização

- Cores e fontes estão em `theme.ts`
- Altere a URL da API nos contextos conforme necessário

## Licença

MIT

---

Desenvolvido por [Roberto Coser](https://github.com/RobertoCoser)
            e [Elias Formentini](https://github.com/EliasFormentini)