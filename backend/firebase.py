from functools import wraps

import requests
from firebase_admin import auth, credentials, initialize_app
from flask import Flask, jsonify, request

# Initialize the Flask app and Firebase Admin

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_app = initialize_app(cred)


# Decorator for routes to token auth
def firebase_token_required(f):
    """
    Decorator to check if the Firebase token in the request is valid.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        # Grab the token from the Authorization header
        token = None
        if "Authorization" in request.headers:
            try:
                token = request.headers.get("Authorization").split(" ")[
                    1
                ]  # Bearer <token>
            except IndexError:
                return {"message": "Token not found in the Authorization header."}, 401

        if not token:
            return {"message": "Missing token."}, 401

        try:
            # Verify the token using Firebase Admin SDK
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token  # Add user information to the request object for downstream use
        except auth.InvalidIdTokenError:
            return {"message": "Invalid ID token."}, 401
        except auth.ExpiredIdTokenError:
            return {"message": "Expired ID token."}, 401
        except auth.RevokedIdTokenError:
            return {"message": "Revoked ID token."}, 401
        except Exception as e:
            return {"message": f"Authentication failed: {str(e)}"}, 401

        # Proceed with the wrapped function
        return f(*args, **kwargs)

    return wrapper


def admin_required(f):
    """
    Decorator to check if the Firebase token in the request belongs to an admin user.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        # Grab the token from the Authorization header
        token = None
        if "Authorization" in request.headers:
            try:
                token = request.headers.get("Authorization").split(" ")[
                    1
                ]  # Bearer <token>
            except IndexError:
                return (
                    jsonify(
                        {"message": "Token not found in the Authorization header."}
                    ),
                    401,
                )

        if not token:
            return jsonify({"message": "Missing token."}), 401

        try:
            # Verify the token using Firebase Admin SDK
            decoded_token = auth.verify_id_token(token)

            # Check for the custom admin claim
            if not decoded_token.get("admin"):
                return jsonify({"message": "Admin privileges required."}), 403

            # Attach user information to the request object
            request.user = decoded_token

        except auth.InvalidIdTokenError:
            return jsonify({"message": "Invalid ID token."}), 401
        except auth.ExpiredIdTokenError:
            return jsonify({"message": "Expired ID token."}), 401
        except auth.RevokedIdTokenError:
            return jsonify({"message": "Revoked ID token."}), 401
        except Exception as e:
            return jsonify({"message": f"Authentication failed: {str(e)}"}), 401

        # Proceed with the wrapped function
        return f(*args, **kwargs)

    return wrapper
