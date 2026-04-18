#!/bin/bash
set -e

# setup ros2 environment
source "/opt/ros/$ROS_DISTRO/setup.bash"
if [ -f "/gap_ws/install/setup.bash" ]; then
    source "/gap_ws/install/setup.bash"
fi

exec "$@"
