# Build environment
FROM node:14 as build
WORKDIR /app
COPY CS490G-Frontend/react-app/package.json CS490G-Frontend/react-app/package-lock.json ./
RUN npm install
COPY CS490G-Frontend/react-app ./
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
