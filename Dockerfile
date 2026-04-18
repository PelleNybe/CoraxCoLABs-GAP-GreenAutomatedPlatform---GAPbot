# Corax CoLAB - GAP Ecosystem Edge AI Container
# Base image: ROS 2 Humble on Ubuntu 22.04
FROM ros:humble-ros-base-jammy

# Set non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install critical dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    python3-pip \
    python3-colcon-common-extensions \
    v4l-utils \
    && rm -rf /var/lib/apt/lists/*

# Install MicroXRCE-DDS Agent
RUN git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git /opt/Micro-XRCE-DDS-Agent && \
    cd /opt/Micro-XRCE-DDS-Agent && \
    mkdir build && cd build && \
    cmake .. && \
    make -j$(nproc) && \
    make install && \
    ldconfig

# Note: Hailo-8 PCIe/M.2 drivers must be loaded on the host machine.
# The container requires device mapping (--device /dev/hailo0) at runtime.
# Proprietary model weights and specific HailoRT configurations are excluded from this public build.

# Create workspace
RUN mkdir -p /gap_ws/src
WORKDIR /gap_ws

# Copy public interfaces
COPY ./public_interfaces /gap_ws/src/public_interfaces

# Build the workspace
RUN /bin/bash -c "source /opt/ros/humble/setup.bash && colcon build"

# Setup entrypoint
COPY ./ros_entrypoint.sh /
RUN chmod +x /ros_entrypoint.sh

ENTRYPOINT ["/ros_entrypoint.sh"]
CMD ["bash"]
