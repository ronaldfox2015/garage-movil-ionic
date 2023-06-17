## CONTAINER VARS ##
USERNAME_LOCAL   ?= "$(shell whoami)"
UID_LOCAL        ?= "$(shell id -u)"
GID_LOCAL        ?= "$(shell id -g)"
CONTAINER_NAME   = $(PROJECT_NAME)_backend
IMAGE_DEPLOY_DEV = $(PROJECT_NAME):$(ENV)
APP_DIR          = app
MODE						 ?= image
YARN_ENVIRONMENT = "--production"
DIRECTORY		 ?= home
ACTION			 ?= page page/$(DIRECTORY)
COMMAND			 ?= generate
IONIC    		 ?= ionic $(COMMAND) $(ACTION)

build:##@Global Build project : make build MODE=image, make build MODE=build-dist
	docker build --build-arg UID_LOCAL=$(UID_LOCAL) \
		--build-arg GID_LOCAL=$(GID_LOCAL) \
		--build-arg USERNAME_LOCAL=$(USERNAME_LOCAL) \
		-f docker/Dockerfile --no-cache -t $(IMAGE_DEPLOY_DEV)  docker/

ssh: ##@Local Access the docker container
	@docker container run -it \
        -u root:root \
        --network="neo_network" \
        -v "${PWD}/${APP_DIR}":/${APP_DIR} \
        $(IMAGE_DEPLOY_DEV) /bin/sh

install: ##@Global install dependencies : make install
	@docker container run --workdir "/${APP_DIR}" --rm -i \
	  	-u root:root \
		-v "${PWD}/${APP_DIR}":/${APP_DIR}:rw \
		${IMAGE_DEPLOY_DEV} \
		npm install --force


build-ionic: ##@Global install dependencies : make build-ionic D IONIC="generate page page/my-account"
	docker container run --workdir "/${APP_DIR}" -it \
	  	-u root:root \
		-v "${PWD}/${APP_DIR}":/"${APP_DIR}/${APP_DIR}" \
		${IMAGE_DEPLOY_DEV} /bin/sh


up: ##@Local Start the project
	export IMAGE_DEV="$(IMAGE_DEPLOY_DEV)" && CONTAINER_NAME="$(CONTAINER_NAME)" && PATH_SERVICE="$(PATH_SERVICE)" && NETWORK=${NETWORK} \
		docker-compose -p $(SERVICE_NAME) up frontend

up-doc: ##@Local Start the project
	export SERVICE_NAME="$(SERVICE_NAME)doc" && IMAGE_DEV="$(IMAGE_DEPLOY_DEV)" && PROJECT_NAME="$(PROJECT_NAME)" && PATH_SERVICE="local.statistic-documentation.com" && NETWORK=${NETWORK} \
		docker-compose -p $(SERVICE_NAME)doc up -d frontend

down: ##@Local Destroy the project
	docker rm -f $(CONTAINER_NAME)

down-doc: ##@Local Destroy the project
	docker rm -f  statisticdoc_frontend_1

log: ##@Local Show project logs
	@docker logs -f $(CONTAINER_NAME)

hooks-app: ##@Local hooks the project
	cp $(PWD)/hooks/pre-commit .git/hooks/ && chmod +x .git/hooks/pre-commit
	cp $(PWD)/hooks/prepare-commit-msg .git/hooks/ && chmod +x .git/hooks/prepare-commit-msg


lint: ##@Global install dependencies
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
  	-u ${UID_LOCAL}:${GID_LOCAL} \
		${IMAGE_DEPLOY_DEV} \
		yarn lint

format: ##@Global install dependencies
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
  	-u ${UID_LOCAL}:${GID_LOCAL} \
		${IMAGE_DEPLOY_DEV} \
		yarn lint:format



doc: ##@Global Build project
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		-p 8080:8080 \
		${IMAGE_DEPLOY_DEV} \
		yarn doc

remove: ##@Local remove container
	@docker-compose rm -v

sync-config-deploy: ## Sync configs files from S3 before to push image to registry in aws: make sync-config-deploy
	aws s3 sync s3://${INFRA_BUCKET}/config/deploy/$(PRODUCT_NAME)/${ENV}/${SERVICE_NAME}/ deploy/ --profile ${ENV}

sync-config: ##@Deploy Sync configs files from S3
	aws s3 sync s3://$(INFRA_BUCKET)/config/container/$(PRODUCT_NAME)/$(ENV)/$(SERVICE_NAME)/ app/ --profile ${ACCOUNT_ENV}

push-config: ##@Deploy Sync configs files from S3
	aws s3 cp app/.env s3://$(INFRA_BUCKET)/config/container/$(PRODUCT_NAME)/$(ENV)/$(SERVICE_NAME)/.env --profile ${ACCOUNT_ENV}

container-upload-app-config: ##@Deploy Sync configs files from S3
	@aws s3 cp app/.env s3://$(INFRA_BUCKET)/config/container/$(PRODUCT_NAME)/$(ENV)/$(SERVICE_NAME)/ --profile ${ENV}

create-migration: ##@Global Create migration make create-migration MIGRATION=DropTableTmpStatistic
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		--network=${NETWORK} \
		${IMAGE_DEPLOY_DEV} \
		yarn migrate:generate ${MIGRATION}

migrate:
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		--network=${NETWORK} \
		${IMAGE_DEPLOY_DEV} \
		yarn migrate

rollback:
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_DEPLOY_DEV} \
		--network=${NETWORK} \
			yarn rollback

development: up up-doc ##@Local Prepare the project for development
	@echo "The development environment is ready and running"