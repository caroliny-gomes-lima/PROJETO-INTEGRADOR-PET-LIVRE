# Usar a imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos para o diretório de trabalho
COPY . .

# Expor a porta que sua aplicação vai rodar
EXPOSE 3000

# Iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]
