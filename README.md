![](graphics/konektilo-logo-readme.png)
# konektilo opc-ua browser
The konektilo opc-ua browser is an ionic app which you can use with konektilo to explore the structure of you connected opc-ua servers.
The app is developed with ionic 5.
Below you can see an overview of the different components of konektilo.
If you would like to test and include konektilo as RESTful api for opc-ua you can find the free version here: ```https://konektilo.de/testuser```

![alt text](graphics/konektilo-opcua-browser.png "konektilo opcua browser overview")

# getting started
* Download konektilo docker image
    * If you would like to test and include konektilo as RESTful api for opc-ua you can find the free version here: ```https://konektilo.de/testuser```
* Use this docker-compose file for starting konektilo and konektilo-opcua-browser
```
version: '3.7'

services:
  konektilo:
    image:  konektilodockerhub/konektilo:latest
    container_name: konektilo
    ports:
      - "8080:80"
    volumes:
      - C:/PATH/TO/MY/CONFIGURATION/FOLDER/appsettings.json:/app/appsettings.json
    restart: always

  konektilo-opcua-browser:
    image: konektilodockerhub/konektilo-opcua-browser:latest
    container_name: konektilo-opcua-browser
    ports:
      - "8090:80"
    restart: always
    depends_on:
      - konektilo
```
