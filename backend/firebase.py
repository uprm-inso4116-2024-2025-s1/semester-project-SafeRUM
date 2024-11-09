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