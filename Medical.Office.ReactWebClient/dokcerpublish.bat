netstat -ano | findstr :3000
docker build -t medical.office.reactwebclient .
docker run -p 3000:3000 medical.office.reactwebclient
