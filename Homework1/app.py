from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# This dictionary will store loan applications with their details
applications = {}

@app.route('/')
def index():
    # Render the main page of the applcation
    return render_template('index.html')

# API endpoint to accept an application with name and zipcode
@app.route('/api/accept_application', methods=['POST'])
def accept_application():
    data = request.get_json()  # Get JsON data from the request
    print("Received application data:", data)
    
    name = data.get('name')  # Extract applicant's name
    zipcode = data.get('zipcode')  # Extract applicant's zipcode
    
    if name and zipcode:  # Ensure both fields are provided
        app_id = len(applications) + 1  # Assign a new application number
        applications[app_id] = {'name': name, 'zipcode': zipcode, 'status': 'received'}  # Store application details
        return jsonify({'message': 'Application received successfully', 'application_number': app_id})
    
    return jsonify({'message': 'Missing name or zipcode'})  # Return an error message if input is incomplete

# API endpoint to chek the status of an application
@app.route('/api/check_status', methods=['GET'])
def check_status():
    print("Checking status, applications:", applications)
    app_id = request.args.get('app_number', type=int)  # Get application number from query params
    print("Checking status for application:", app_id)
    
    if app_id in applications:  # If the application exists
        return jsonify({
            'application_number': app_id,
            'status': applications[app_id]['status']
        })
    return jsonify({'message': 'Application not found'})  # Return error if application number is invalid

# API endpoint to chang the status of an application
@app.route('/api/change_status', methods=['POST'])
def change_status():
    data = request.get_json()  # Get JSON data from the request
    app_id = int(data.get('app_number'))  # Extract application number
    new_status = data.get('status')  # Extract new status
    
    if app_id in applications:  # If the application exists
        applications[app_id]['status'] = new_status  # Update the status
        return jsonify({'message': 'Status updated successfully'})
    return jsonify({'message': 'Application not found'}), 404  # Return error if application is not found

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask server in debug mode for easier troubleshooting
