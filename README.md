# cloud_picou_maupu
Docker-compose and Dockerode example for deploying multiples micro-services.

# How to start 


Two dockers images needs to be created, one who works with Dockerode, the other works with docker-compose.

	docker build -t tpnode:1 -f Dockerfile .
	docker build -t tpnode:2 -f Dockerfile_compose .

## docker-compose

To start the services you can directly do :

	docker-compose up --build

Everything should start without problems. A private network is created under 15.0.2.0/24, you can access the docker via these IP because of the docker bridge.
But you should access it instead via localhost:800, because we mapped the port 80 to the CalculatorService .
To try if the micro service works :

	curl -d "(5+3)/2" -X POST localhost:800

Check the docker container running with :

	docker container list

## Dockerode

The file start_cont.js starts two container, one with sum and the other with CalculatorService. 
To start it :

	node start_cont.js

We didn't take the time to finish properly this method since we prefered use the docker-compose method.
One should prefer the docker-compose method, which is more reliable. 
