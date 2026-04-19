#!/usr/bin/env python3
"""
lidar_fusion_node.py

A ROS 2 node that subscribes to odometry and LiDAR point clouds, 
and computes/publishes a synthetic spatial representation.

Author: Pelle Nyberg, Corax CoLAB (https://coraxcolab.com)
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import json

class LidarFusionNode(Node):
    def __init__(self):
        super().__init__('lidar_fusion_node')
        self.odom_sub = self.create_subscription(
            String, '/fmu/out/vehicle_odometry', self.odom_callback, 10)
        self.lidar_sub = self.create_subscription(
            String, '/lidar/point_cloud', self.lidar_callback, 10)
        self.spatial_pub = self.create_publisher(
            String, '/core_slam/spatial_representation', 10)
        
        self.get_logger().info("Lidar Fusion Node Initialized.")

    def odom_callback(self, msg):
        self.get_logger().debug(f"Received Odometry: {msg.data}")

    def lidar_callback(self, msg):
        self.get_logger().debug(f"Received LiDAR Point Cloud: {msg.data}")
        self.publish_spatial_data()

    def publish_spatial_data(self):
        spatial_data = {
            "status": "fusion_active",
            "point_cloud_density": "high",
            "localization_confidence": 0.95
        }
        msg = String()
        msg.data = json.dumps(spatial_data)
        self.spatial_pub.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = LidarFusionNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
