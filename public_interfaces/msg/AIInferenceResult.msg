# AIInferenceResult.msg
# Defines the output of the Hailo-8 Edge AI biological classification pipeline.
# This message is published by the NPU node and consumed by the ROS 2 Brain Node.

std_msgs/Header header

# Class ID corresponding to the biological entity (e.g., specific tree species, invasive plant)
uint32 class_id

# Human-readable label for the classification
string class_label

# Confidence score of the classification [0.0, 1.0]
float32 confidence

# Bounding box coordinates in the image frame
# [x_min, y_min, x_max, y_max]
float32[4] bounding_box

# Optional: Associated 3D spatial coordinates if LiDAR/Depth data is fused
geometry_msgs/Point32 spatial_coordinates
