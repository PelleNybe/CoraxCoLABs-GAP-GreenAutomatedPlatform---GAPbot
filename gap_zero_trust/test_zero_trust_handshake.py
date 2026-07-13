import unittest
import time
import sys
import os
import json
import hmac
import hashlib

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

if __name__ == '__main__':
    unittest.main()
