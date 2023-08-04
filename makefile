REGISTRY := registry.byerline.me
IMAGE_NAME := polyprint

# Load environment variables from .env file
include .env

# Set the default target
.DEFAULT_GOAL := all


# Build and push the Docker image
build:
	docker buildx build --push --platform linux/arm64,linux/amd64 --tag $(REGISTRY)/$(IMAGE_NAME):$(REACT_APP_VERSION) .

# Default target to build & push the multi-arch Docker image
all: build