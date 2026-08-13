import unittest
from unittest.mock import patch, MagicMock
import json
import sys
import importlib

# First mock rclpy completely
mock_rclpy = MagicMock()
sys.modules['rclpy'] = mock_rclpy

# Create a proper MockNode base class
class MockNode:
    def __init__(self, node_name):
        self.node_name = node_name
        self.subscriptions = []
        self.publishers = []
        self._logger = MagicMock()

    def create_subscription(self, msg_type, topic, callback, qos):
        sub = MagicMock()
        sub.msg_type = msg_type
        sub.topic = topic
        sub.callback = callback
        sub.qos = qos
        self.subscriptions.append(sub)
        return sub

    def create_publisher(self, msg_type, topic, qos):
        pub = MagicMock()
        pub.msg_type = msg_type
        pub.topic = topic
        pub.qos = qos
        self.publishers.append(pub)
        return pub

    def get_logger(self):
        return self._logger

# Mock rclpy.node and standard messages
mock_rclpy_node = MagicMock()
mock_rclpy_node.Node = MockNode
sys.modules['rclpy.node'] = mock_rclpy_node
sys.modules['std_msgs'] = MagicMock()
sys.modules['std_msgs.msg'] = MagicMock()

# Import the pipeline to test
from gapdrone_edge_ai.hailo_inference_pipeline import HailoInferencePipeline

class TestHailoInferencePipeline(unittest.TestCase):
    def setUp(self):
        self.node = HailoInferencePipeline()

    def test_initialization(self):
        # Verify super().__init__ was called implicitly by checking node_name
        self.assertEqual(self.node.node_name, 'hailo_inference_pipeline')

        # Verify subscriptions
        self.assertEqual(len(self.node.subscriptions), 1)
        sub = self.node.subscriptions[0]
        self.assertEqual(sub.topic, '/camera/video_stream')
        self.assertEqual(sub.qos, 10)
        self.assertEqual(sub.callback, self.node.video_callback)

        # Verify publishers
        self.assertEqual(len(self.node.publishers), 1)
        pub = self.node.publishers[0]
        self.assertEqual(pub.topic, '/gapdrone_edge_ai/inference_result')
        self.assertEqual(pub.qos, 10)

        # Verify logging
        self.node.get_logger().info.assert_called_with("Hailo-8 Inference Pipeline Initialized.")

    def test_video_callback(self):
        mock_msg = MagicMock()
        mock_msg.data = "synthetic_video_frame"

        with patch.object(self.node, 'process_inference') as mock_process:
            self.node.video_callback(mock_msg)

            # Verify logger was called
            self.node.get_logger().debug.assert_called_with("Received Video Frame: synthetic_video_frame")

            # Verify process_inference was triggered
            mock_process.assert_called_once()

    @patch('gapdrone_edge_ai.hailo_inference_pipeline.String')
    def test_process_inference(self, mock_string_class):
        # Setup mock String message
        mock_string_instance = MagicMock()
        mock_string_class.return_value = mock_string_instance

        # Call process_inference
        self.node.process_inference()

        # Verify publish was called
        self.node.inference_pub.publish.assert_called_once_with(mock_string_instance)

        # Extract the data assigned to the mock message
        published_data = mock_string_instance.data
        self.assertIsNotNone(published_data)

        # Parse JSON and assert fields
        result = json.loads(published_data)
        self.assertEqual(result["model"], "yolo_custom_v8")
        self.assertEqual(result["hardware_accel"], "hailo-8L")

        # Check FPS range
        self.assertTrue(28.0 <= result["fps"] <= 32.0)

        # Check detections
        self.assertEqual(len(result["detections"]), 1)
        detection = result["detections"][0]
        self.assertEqual(detection["class"], "biological_anomaly")
        self.assertTrue(0.8 <= detection["confidence"] <= 0.99)
        self.assertEqual(detection["bbox"], [100, 150, 50, 75])

if __name__ == '__main__':
    unittest.main()
