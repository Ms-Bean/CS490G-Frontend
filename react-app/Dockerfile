# Build environment
FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./

# Accepting the environment variable at build time
ARG BACKEND_URL
ENV BACKEND_URL $BACKEND_URL

RUN npm install
COPY . ./
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY custom-nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
