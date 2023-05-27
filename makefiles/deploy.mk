## DEPLOY VARS ##
BUILD_NUMBER    ?= 000001
BUILD_TIMESTAMP ?= 1560121554
DEPLOY_REGION   ?= eu-west-1
DESIRED_COUNT   ?= 1
MIN_SCALING     ?= 1
MAX_SCALING     ?= 2
MEMORY_SIZE     ?= 256
AUTOSCALING     ?= false
TAG_DEPLOY      ?= $(BUILD_TIMESTAMP).$(BUILD_NUMBER)
ACCOUNT_ID      ?= 558705146899
IMAGE_DEPLOY    = $(PROJECT_NAME):$(TAG_DEPLOY)
DEPLOY_REGISTRY = ${ACCOUNT_ID}.dkr.ecr.${DEPLOY_REGION}.amazonaws.com
STACK_PATH      = ${INFRA_BUCKET}/build/cloudformation/${PRODUCT_NAME}/${ENV}/${PROJECT_NAME}
HTTP_PRIORITY	?= 2
deploy-cp-params: ##@Deploy Sync parameters files from S3
	@aws s3 cp deploy/jenkins.private.yml s3://$(INFRA_BUCKET)/config/deploy/$(PRODUCT_NAME)/$(ENV)/$(SERVICE_NAME)/ --profile ${ENV}
	
deploy-sync-cloudformation: ##@Deploy Sync additional cloudformation resources in S3
	aws s3 sync ./cloudformation/stacks s3://$(STACK_PATH) --profile ${ENV}

deploy-sync-task-definition: ##@Deploy Sync task definition
	aws s3 sync s3://$(INFRA_BUCKET)/config/container/orbis/base/ app/config/task/ --profile ${ENV}
	@sed -i -e 's/ecs.BRANCH_BUILD/${PRODUCT_NAME}.${ENV}/g; s/MS_NAME/${SERVICE_NAME}/g; s/SRV_NAME/ecs/g; s/ECS_PROJECT/${PROJECT_NAME}/g; s/DEPLOY_REGION/${DEPLOY_REGION}/g; s/BUILD_TIMESTAMP/${BUILD_TIMESTAMP}/g; s/BUILD_NUMBER/${BUILD_NUMBER}/g; s/TASK_RAM/${MEMORY_SIZE}/g' app/config/task/task-definition.json
	@cat app/config/task/task-definition.json

build-image: ##@Global Create a Docker image with the dependencies packaged
	@#make login-aws
	@docker build -f docker/deploy/Dockerfile --no-cache --build-arg IMAGE=${IMAGE_DEPLOY_DEV} -t $(IMAGE_DEPLOY) .

deploy-image: deploy-validate-registry ##@Deploy Push image to aws ECR
	docker tag ${IMAGE_DEPLOY} ${DEPLOY_REGISTRY}/${IMAGE_DEPLOY}
	aws ecr get-login-password --region ${DEPLOY_REGION} --profile ${ENV} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${DEPLOY_REGION}.amazonaws.com
	docker push ${DEPLOY_REGISTRY}/${IMAGE_DEPLOY}

deploy-validate-registry: ##@Deploy Create registry in aws ECR service
	$(eval EXIST_REPOSITORY := $(shell aws ecr \
		describe-repositories \
		--repository-name ${PROJECT_NAME} \
		--profile ${ENV} \
		--region $(DEPLOY_REGION) \
		| grep "repositoryName" \
		| sed 's/repositoryName//g'\
		| sed 's/://g'| sed 's/,//g'| sed 's/ //g'| sed 's/"//g'))
	@if [ "${EXIST_REPOSITORY}" != "${PROJECT_NAME}" ]; then \
		$(info "Create repository ${PROJECT_NAME} in the region ${DEPLOY_REGION}...") \
		aws cloudformation deploy \
			--template-file ./cloudformation/registry.yml \
			--stack-name ${PROJECT_NAME}-registry \
			--parameter-overrides \
				ProjectName=$(PROJECT_NAME) \
			--region $(DEPLOY_REGION) \
			--profile ${ENV} \
			--capabilities CAPABILITY_IAM; \
	fi

deploy-update-service: deploy-sync-cloudformation ##@Deploy service with cloudformation
	aws cloudformation deploy \
	--template-file ./cloudformation/master.yml \
	--stack-name ${PROJECT_NAME}-service \
	--parameter-overrides \
		S3Path=${STACK_PATH} \
		HttpListenerPriority=${HTTP_PRIORITY} \
		DesiredCount=${DESIRED_COUNT} \
		MaxScaling=${MAX_SCALING} \
		MinScaling=${MIN_SCALING} \
		Image=${DEPLOY_REGISTRY}/${IMAGE_DEPLOY} \
		ServiceName=${SERVICE_NAME} \
		Env=${ENV} \
		Owner=${PRODUCT_NAME} \
		PathPrefix=${PATH_PREFIX} \
		ContainerPort=${CONTAINER_PORT} \
		MemorySize=${MEMORY_SIZE} \
	--region ${DEPLOY_REGION} \
	--profile ${ENV} \
	--capabilities CAPABILITY_NAMED_IAM
	
deploy-update-ecs: deploy-sync-task-definition ##@Deploy
	aws ecs register-task-definition --cli-input-json file://app/config/task/task-definition.json --region ${DEPLOY_REGION} --profile ${ENV}
	aws ecs update-service --cluster ${CLUSTER} --service ${PROJECT_NAME} --task-definition ${PROJECT_NAME} --desired-count ${DESIRED_COUNT} --region ${DEPLOY_REGION} --profile ${ENV}
	@rm -rf app/config/task/

deploy-rollback: deploy-update-ecs ##@Deploy
	@echo "Rollback sucess!!"

delete-service: ##@Deploy delete service
	@echo "Delete stack cloudformation: $(PROJECT_NAME)-service in region: $(DEPLOY_REGION)"
	@aws cloudformation delete-stack \
		--stack-name $(PROJECT_NAME)-service \
		--region $(DEPLOY_REGION)

	@aws cloudformation wait stack-delete-complete \
		--stack-name ${PROJECT_NAME}-service \
		--region $(DEPLOY_REGION) 

login-aws: ## Run the end to end Tests
	aws ecr get-login-password --region ${DEPLOY_REGION} --profile ${ENV} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${DEPLOY_REGION}.amazonaws.com

deploy-list-images: ##@Deploy
	@aws ecr describe-images --region ${DEPLOY_REGION} --repository-name ${PROJECT_NAME} --query 'reverse(sort_by(imageDetails,& imagePushedAt))[:5].imageTags[0]' --output text --profile ${ENV}