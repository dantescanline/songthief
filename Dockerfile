# Deployment dockerfile

FROM node:16-alpine AS BUILD_IMAGE
COPY . /songthief

WORKDIR /songthief/frontend
RUN npm ci
RUN npm run build
RUN rm -rf node_modules

WORKDIR /songthief/api
RUN npm ci
RUN npm prune --production

FROM node:16-alpine

COPY --from=BUILD_IMAGE /songthief/frontend/dist /songthief/frontend/dist
COPY --from=BUILD_IMAGE /songthief/api /songthief/api

EXPOSE 3000

WORKDIR /songthief/api
CMD ["npm", "run", "production"]
