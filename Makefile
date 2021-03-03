# variables ----
	# STAGE := dev
	STAGE := PRD
	SERVICE_NAME := club-manager
	PROJECT := club-manager
  DOCKER_FILE_PATH := docker/docker-compose.yml

# docker -------
buildup:
	docker-compose -f $(DOCKER_FILE_PATH) up -d --build
:
	docker-compose -f $(DOCKER_FILE_PATH) up -d
down:
	docker-compose -f $(DOCKER_FILE_PATH) down
down-v:
	docker-compose -f $(DOCKER_FILE_PATH) down -v
down-all:
	docker-compose-f $(DOCKER_FILE_PATH)  down --rmi all --volumes --remove-orphans
ps:
	docker-compose -f $(DOCKER_FILE_PATH) ps
restart:
	docker-compose -f $(DOCKER_FILE_PATH) restart
logs:
	docker-compose -f $(DOCKER_FILE_PATH) logs $(arg)
logs-tail:
	docker-compose -f $(DOCKER_FILE_PATH) logs -f --tail=500 $(arg)

# general -------
init:
	export STAGE=$(STAGE)
