from django.shortcuts import render
from django.http import JsonResponse
import requests
import os

def WurcomActivationView(request):

    try:

        # Define variables
        url = 'https://wurtec-sandbox.chargify.com/subscriptions.json'
        username = os.environ.get('MAXIO_API_KEY')
        password = 'x'
        
        headers = {
            'Content-Type': 'application/json'
        }

        # Process the request
        if request.method == 'POST':
            
            # Get form data
            data = {key: value for key, value in request.POST.items() if key != 'csrfmiddlewaretoken'}


            # Prepare data for API request
            # Assuming the API expects the data in a specific format, you might need to map the form fields to the API fields
            api_data = {
                "subscription": {
                    "product_handle": "wur-com-saas",
                    "customer_attributes": {
                        "first_name": data.get("firstname"),
                        "last_name": data.get("lastname"),
                        "email": data.get("email"),
                        "phone": data.get("phone"),
                        "organization": data.get("organization")
                    },
                    "metafields": {
                        "Building Name": data.get("building_name"),
                        "Service Address": data.get("service_address"),
                        "city": data.get("city"),
                        "state": data.get("state"),
                        "zip": data.get("zip"),
                        "Monitoring Service - Email Address": data.get("monitoring_email"),
                        "Monitoring Service - Phone Number": data.get("monitoring_phone"),
                        "Car Station 1 - Car Designation": data.get("wurcom_unit_1"),
                        "SIM 1": data.get("wurcom_location_1"),
                        "Car Station 1 - Serial Number": data.get("wurcom_serial_1")
                    }
                }
            }

            response = requests.post(url, headers=headers, auth=(username, password), json=api_data)
            if response.status_code == 200:
                return JsonResponse({'status': 'success', 'data': response.json()})
            else:
                return JsonResponse({'status': 'error', 'message': response.text}, status=response.status_code)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    return render(request, 'activation.html', {})