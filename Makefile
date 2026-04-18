# ---------------------------------------------------------
# Corax CoLAB GAP Ecosystem - Enterprise Makefile
# ---------------------------------------------------------
# This Makefile provides developer ergonomics for building,
# testing, and simulating the public interfaces of the GAP.

ROS_DISTRO ?= humble
WORKSPACE_DIR ?= .

.PHONY: all build clean test lint sim docker-build docker-up

all: build

## build: Build the public ROS 2 workspace
build:
	@echo "==> Building public_interfaces via colcon..."
	bash -c "source /opt/ros/$(ROS_DISTRO)/setup.bash && colcon build --symlink-install --packages-select public_interfaces"

## clean: Clean the colcon workspace build artifacts
clean:
	@echo "==> Cleaning build artifacts..."
	rm -rf build/ install/ log/

## test: Run tests for the public interfaces
test:
	@echo "==> Running colcon tests..."
	bash -c "source /opt/ros/$(ROS_DISTRO)/setup.bash && source install/setup.bash && colcon test --packages-select public_interfaces && colcon test-result --all"

## lint: Run ament linters
lint:
	@echo "==> Running ament linters..."
	bash -c "source /opt/ros/$(ROS_DISTRO)/setup.bash && colcon test --packages-select public_interfaces --executor sequential --event-handlers console_direct+ --pytest-args -m linter"

## sim: Launch the Gazebo simulation stubs (requires Ignition/Gazebo installed)
sim:
	@echo "==> Launching simulation stub environment..."
	ign gazebo simulation_stubs/gap_forest_world.sdf

## docker-build: Build the Edge AI inference container
docker-build:
	@echo "==> Building Docker container..."
	docker compose build

## docker-up: Launch the Edge AI inference container
docker-up:
	@echo "==> Starting Docker container..."
	docker compose up -d

## help: Show this help message
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
