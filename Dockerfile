FROM node:16-alpine as developement

ENV NODE_ENV developement
# ENV POSTGRES_HOST postgres
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD secret
# ENV POSTGRES_DATABASE postgres
# ENV POSTGRES_PORT 5432

WORKDIR /app
COPY . .

RUN npm install
# COPY . /app

RUN npm run build

# ---

FROM node:16-alpine

ARG ARG_VAR=production
ENV NODE_ENV=${ARG_VAR}}

WORKDIR /app

COPY --from=developement /app/package*.json /app/
COPY --from=developement /app/node_modules/ /app/node_modules/
COPY --from=developement /app/dist/ /app/dist/
COPY ./ormconfig.js /app

# EXPOSE 3000

CMD ["npm", "run", "start:prod"]
