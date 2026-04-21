#!/usr/bin/env python3
"""
hailo_inference_pipeline.py

A ROS 2 node that processes synthetic video streams, simulating Hailo-8 NPU 
inference processing, and publishes AIInferenceResult.

Author: Pelle Nyberg, Corax CoLAB (https://coraxcolab.com)
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import json
import random

class HailoInferencePipeline(Node):
    def __init__(self):
        super().__init__('hailo_inference_pipeline')
        self.video_sub = self.create_subscription(
            String, '/camera/video_stream', self.video_callback, 10)
        self.inference_pub = self.create_publisher(
            String, '/gapdrone_edge_ai/inference_result', 10)
        
        self.get_logger().info("Hailo-8 Inference Pipeline Initialized.")

    def video_callback(self, msg):
        self.get_logger().debug(f"Received Video Frame: {msg.data}")
        self.process_inference()

    def process_inference(self):
        inference_result = {
            "model": "yolo_custom_v8",
            "hardware_accel": "hailo-8L",
            "fps": round(random.uniform(28.0, 32.0), 1),
            "detections": [
                {
                    "class": "biological_anomaly",
                    "confidence": round(random.uniform(0.8, 0.99), 2),
                    "bbox": [100, 150, 50, 75]
                }
            ]
        }
        msg = String()
        msg.data = json.dumps(inference_result)
        self.inference_pub.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = HailoInferencePipeline()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
