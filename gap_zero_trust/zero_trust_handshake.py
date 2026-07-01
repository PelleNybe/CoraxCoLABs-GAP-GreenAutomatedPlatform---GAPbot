#!/usr/bin/env python3
"""
zero_trust_handshake.py

A functional Python script demonstrating cryptographic handshakes
using HMAC to sign and verify payloads within the B.A.T.M.A.N.-adv swarm mesh.

Author: Pelle Nyberg, Corax CoLAB (https://coraxcolab.com)
"""

import hmac
import hashlib
import json
import time
import secrets
import os

class ZeroTrustHandshake:
    def __init__(self, shared_secret: bytes):
        self.shared_secret = shared_secret

    def sign_payload(self, payload: dict) -> dict:
        payload["timestamp"] = time.time()
        payload["nonce"] = secrets.token_hex(16)
        
        payload_str = json.dumps(payload, sort_keys=True).encode('utf-8')
        signature = hmac.new(self.shared_secret, payload_str, hashlib.sha256).hexdigest()
        
        return {
            "payload": payload,
            "signature": signature
        }

    def verify_payload(self, signed_message: dict) -> bool:
        if not isinstance(signed_message, dict):
            print("Verification failed: signed_message is not a dict.")
            return False

        try:
            payload = signed_message["payload"]
            received_signature = signed_message["signature"]
            
            if not isinstance(payload, dict):
                print("Verification failed: payload is not a dict.")
                return False

            if not isinstance(received_signature, str):
                print("Verification failed: signature is not a string.")
                return False

            # Check for replay attacks (5-minute window and future timestamps)
            current_time = time.time()
            payload_time = payload.get("timestamp", 0)

            if not isinstance(payload_time, (int, float)) or isinstance(payload_time, bool):
                print("Verification failed: timestamp is not a number.")
                return False

            if current_time - payload_time > 300:
                print("Verification failed: Timestamp too old.")
                return False
                
            if payload_time - current_time > 300: # allow 5 min clock skew
                print("Verification failed: Timestamp from the future.")
                return False

            payload_str = json.dumps(payload, sort_keys=True).encode('utf-8')
            expected_signature = hmac.new(self.shared_secret, payload_str, hashlib.sha256).hexdigest()
            
            return hmac.compare_digest(expected_signature, received_signature)
        except KeyError as e:
            print(f"Verification failed: Missing key {e}")
            return False

if __name__ == "__main__":
    # Example Usage
    secret_key_env = os.environ.get("GAP_SHARED_SECRET")
    if not secret_key_env:
        raise ValueError("CRITICAL ERROR: GAP_SHARED_SECRET environment variable not set. Aborting.")

    secret_key = secret_key_env.encode('utf-8')
    handshake = ZeroTrustHandshake(secret_key)
    
    # 1. Agent A creates a message
    command_message = {
        "action": "PayloadDrop.srv",
        "target_coordinates": {"lat": 59.3293, "lon": 18.0686},
        "agent_id": "gapdrone_1"
    }
    
    print("Original Message:", command_message)
    
    # 2. Agent A signs the message
    signed_msg = handshake.sign_payload(command_message)
    print("\nSigned Message:", json.dumps(signed_msg, indent=2))
    
    # 3. Agent B receives and verifies the message
    is_valid = handshake.verify_payload(signed_msg)
    print("\nVerification Result:", "SUCCESS" if is_valid else "FAILED")
    
    # 4. Attempt to tamper with the message
    signed_msg["payload"]["target_coordinates"]["lat"] = 59.9999
    is_valid_tampered = handshake.verify_payload(signed_msg)
    print("Tampered Verification Result:", "SUCCESS" if is_valid_tampered else "FAILED")
