.DEFAULT_GOAL := help
.PHONY: venv
.EXPORT_ALL_VARIABLES:

## APP VARS ##
PRODUCT_NAME    = garage
SERVICE_NAME    = garage
DOMAIN          ?= services.neoauto.com
CLUSTER         ?= ${PRODUCT_NAME}-${ENV}
CONTAINER_PORT  ?= 80
PATH_PREFIX   	= "/v1"
NETWORK 	?= garage_network
PATH_SERVICE	= /v1/$(SERVICE_NAME)*


## GENERAL VARS ##
ENV            ?= dev
INFRA_BUCKET     ?= infraestructura.neoauto.local
PROJECT_NAME    = $(PRODUCT_NAME)-$(ENV)-$(SERVICE_NAME)
APP_DIR         = app
ACCOUNT_ENV	?= ${ENV}

## INCLUDE TARGETS ##
include makefiles/container.mk
include makefiles/test.mk
include makefiles/deploy.mk
include makefiles/help.mk