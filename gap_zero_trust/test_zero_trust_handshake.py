import unittest
import time
import sys
import os

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

    def test_verify_payload_empty_dictionary_keyerror(self):
        # Testing a missing key is straightforward. We can just pass an empty dictionary to verify_payload and assert that it gracefully returns False and catches the KeyError.
        result = self.handshake.verify_payload({})
        self.assertFalse(result)

if __name__ == '__main__':
    unittest.main()
