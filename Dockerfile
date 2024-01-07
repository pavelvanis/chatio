FROM node:18-alpine as build

# Set workdir
WORKDIR /app

# copy package.json  package-lock.json
COPY package*.json ./

# npm install
RUN npm install

# copy project
COPY . .

# create build
RUN npm run build

# create more optimezed build
FROM node:18-alpine

# set workdir
WORKDIR /app

# copy build from first base
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json .
COPY --from=build /app/.env.production .env.production
COPY --from=build /app/node_modules ./node_modules

# set production env
ENV NODE_ENV production

# set port
ENV PORT 3000

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]