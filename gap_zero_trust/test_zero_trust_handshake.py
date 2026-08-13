import unittest
from unittest.mock import patch
import sys
import os
import time

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from zero_trust_handshake import ZeroTrustHandshake

class TestZeroTrustHandshake(unittest.TestCase):
    def setUp(self):
        self.secret_key = b"test_secret_key"
        self.handshake = ZeroTrustHandshake(self.secret_key)

    def test_verify_payload_missing_keys(self):
        # Pass an empty dictionary, which should trigger a KeyError and return False
        result = self.handshake.verify_payload({})
        self.assertFalse(result)

    def test_verify_payload_missing_signature(self):
        # Pass a dictionary missing signature
        result = self.handshake.verify_payload({"payload": {"test": "data"}})
        self.assertFalse(result)

    def test_verify_payload_success(self):
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)
        self.assertTrue(self.handshake.verify_payload(signed))

    def test_verify_payload_replay_attack(self):
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)
        # First verification should succeed
        self.assertTrue(self.handshake.verify_payload(signed))
        # Second verification of the exact same message should fail
        self.assertFalse(self.handshake.verify_payload(signed))

    def test_verify_payload_tampered(self):
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)
        signed["payload"]["action"] = "tampered"
        self.assertFalse(self.handshake.verify_payload(signed))

    def test_verify_payload_invalid_signature_type(self):
        # Pass a signature that is not a string
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)
        signed["signature"] = 12345
        self.assertFalse(self.handshake.verify_payload(signed))

    def test_cleanup_nonces(self):
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)
        self.assertTrue(self.handshake.verify_payload(signed))

        nonce = signed["payload"]["nonce"]
        self.assertIn(nonce, self.handshake.seen_nonces)

        # Simulate time passing by modifying the stored time for the nonce
        self.handshake.seen_nonces[nonce] = time.time() - 301

        # Cleanup nonces using a new current time
        self.handshake._cleanup_nonces(time.time())
        self.assertNotIn(nonce, self.handshake.seen_nonces)

    @patch('time.time')
    def test_verify_payload_expired_timestamp(self, mock_time):
        mock_time.return_value = 1000.0
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)

        # Advance time by 301 seconds
        mock_time.return_value = 1301.0
        self.assertFalse(self.handshake.verify_payload(signed))

    @patch('time.time')
    def test_verify_payload_future_timestamp(self, mock_time):
        mock_time.return_value = 1000.0
        command = {"action": "test", "agent_id": "agent_1"}
        signed = self.handshake.sign_payload(command)

        # Rewind time by 301 seconds
        mock_time.return_value = 699.0
        self.assertFalse(self.handshake.verify_payload(signed))

if __name__ == '__main__':
    unittest.main()
