FROM node:dubnium

ENV PROFILE docker
ENV VERSION v0.1.0

WORKDIR /validator

COPY nodes/validator/package.json package.json

RUN yarn

COPY nodes/validator ./
COPY ethvault-validator/settings.js /validator/config/docker/

ENTRYPOINT [ "node" ]
CMD [ "validator_docker.js" ]
