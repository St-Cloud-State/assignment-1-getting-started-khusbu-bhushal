from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# This will store the applications (instead of books)
applications = {}

# API to accept application (add name and zipcode)
from flask import Flask, jsonify, request

app = Flask(__name__)

# Dictionary to store applications (in-memory)
applications = {}

@app.route('/')
def index():
    return render_template('index.html')

# API to accept application (with name and zipcode)
@app.route('/api/accept_application', methods=['POST'])
def accept_application():
    # Get data sent in the request body
    data = request.get_json()
    print(data)  # This will print the data sent by the frontend
    #line3 added

    
    # Extract name and zipcode from the data
    name = data.get('name')
    zipcode = data.get('zipcode')
    
    # Check if both name and zipcode are provided
    if name and zipcode:
        # Generate a unique application number (we're using the length of the applications dictionary)
        app_id = len(applications) + 1
        
        # Store the application with the app_id, name, and zipcode
        applications[app_id] = {'name': name, 'zipcode': zipcode, 'status': 'received'}
        
        # Return a confirmation message with the application number
        return jsonify({'message': 'Application received successfully', 'application_number': app_id})
    
    # If name or zipcode is missing, return an error message
    return jsonify({'message': 'Missing name or zipcode'})

if __name__ == '__main__':
    app.run(debug=True)

# API to check the status of an application
@app.route('/api/check_status', methods=['GET'])
def check_status():
    app_id = request.args.get('app_number', type=int)
    
    if app_id in applications:
        return jsonify({'application_number': app_id, 'status': applications[app_id]['status']})
    return jsonify({'message': 'Application not found'})

if __name__ == '__main__':
    app.run(debug=True) #line 6 added

# API to change the status of an application
@app.route('/api/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    app_id = data.get('app_number')
    new_status = data.get('status')
    
    if app_id in applications:
        applications[app_id]['status'] = new_status
        return jsonify({'message': 'Status updated successfully'})
    return jsonify({'message': 'Application not found'}), 404

# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
