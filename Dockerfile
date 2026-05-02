FROM cypress/included:15.13.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY cypress.config.js ./
COPY cypress/ ./cypress/

ENTRYPOINT ["npx", "cypress", "run"]
