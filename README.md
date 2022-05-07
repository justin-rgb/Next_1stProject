 ## Mi primera App en NextJS

 Desplegada en [Vercel](https://justin-nextapp.vercel.app/)

 # Pasos para crear imagen de Docker

    1. Crear el archivo .dockerignore
    2. Colocar en el archivo .dockerignore lo siguiente: 
        Dockerfile
        .dockerignore
        node_modules
        npm-debug.log
        README.md
        .next
    3. Crear el archivo Dockerfile y escribir lo siguientes comandos en el archivo

# Comandos simples para correr en imagen de Docker (1.02Gb)
    FROM node:16-alpine
    RUN mkdir -p /app
    WORKDIR /app
    COPY package.json /app
    RUN yarn install
    COPY . /app
    RUN yarn build
    EXPOSE 3000
    CMD [ "yarn", "start"]

# Comandos avanzados para correr la imagen de Docker recomendada (100Mb)

    FROM node:16-alpine AS deps

    RUN apk add --no-cache libc6-compat
    WORKDIR /app
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile

    FROM node:16-alpine AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN yarn build

    FROM node:16-alpine AS runner
    WORKDIR /app

    ENV NODE_ENV production

    RUN addgroup -g 1001 -S nodejs
    RUN adduser -S nextjs -u 1001

    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./package.json

    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

    USER nextjs

    EXPOSE 3000

    ENV PORT 3000

    CMD ["node", "server.js"]



    4. Ejecutar el comando en consola
#     docker build -t nextjs-initial . 
        Nota: En el caso de usar los comandos avanzados debemos colocar lo siguiente en el archivo next.config.js: 
#           experimental: {
#               outputStandalone: true
#           }
        Ademas de que en el package.json en el opcion de "start" cambiarla por la siguiente:
#           "start": "next start -p ${PORT:=3000}",


    5. Ejecutar el siguiente comando, el primer 3000 seria el puerto de mi computador y el segundo seria el puerto de la imagen:     
#     docker run --name=next-app -p 3000:3000 nextjs-initial

    6. Ya con esto habriamos ejecutado localmente nuestro contenedor

