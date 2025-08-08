from flask import Flask, jsonify
from flask_cors import CORS
import time

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow requests from the frontend
# In a production environment, you would restrict this to your frontend's domain
CORS(app)

@app.route('/api/apply', methods=['POST'])
def apply():
    """
    A mock endpoint to simulate the initiation of a loan application.
    In a real-world scenario, this would handle form data.
    """
    print("Received request for /api/apply")
    return jsonify({"status": "success", "message": "Application process initiated."}), 200

@app.route('/api/offer', methods=['GET'])
def get_offer():
    """
    A mock endpoint that simulates a delay for an underwriting process
    and then returns a hardcoded loan offer.
    """
    print("Received request for /api/offer. Simulating 2-second delay.")
    # Simulate a network/processing delay
    time.sleep(2)

    mock_offer = {
        "loanAmount": "₹25,000",
        "tenure": "12 Months",
        "monthlyPayment": "₹2,300",
        "clarityNote": "You will receive ₹24,500 (after processing fees)."
    }

    print(f"Returning mock offer: {mock_offer}")
    return jsonify(mock_offer), 200

if __name__ == '__main__':
    # Running on 0.0.0.0 makes the server accessible from other services
    # and the host machine, which is useful for containerized environments.
    app.run(host='0.0.0.0', port=5001)
