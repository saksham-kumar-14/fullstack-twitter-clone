# Full stack Twitter Clone

### Technologies used
- Next js
- MongoDb + mongoose
- Express js and Node js
- Tailwind css
- Jsonwebtoken
- Axios
- Docker

## How to run?

### building frontend
`docker build -t client` <br>
`docker run -p 3000:3000 client`

### building backend
`docker build -t server`

### creating the build
`docker-compose build`

### starting the service
`docker-compose up`
### stopping the service
`docker-compose stop`

`docker-compose down --volumes` brings everything down