FROM node:16 as essential-photo-frontend

ENV INSTALL_PATH /opt/essential-frontend
RUN mkdir -p $INSTALL_PATH


# Install node
# who knows

WORKDIR /opt/essential-frontend
COPY . /
RUN npm install

EXPOSE 3000

CMD ["npm start"]