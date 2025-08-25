from django.shortcuts import redirect, render
from django.contrib import messages
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
    
            # Loop through the data dictionary to populate wurcom unit fields in api_data dict dynamically
            for i in range(2, 21):
                if not data.get(f"wurcom_unit_{i}"):
                    break
                else:
                    api_data['subscription']['metafields'][f"Car Station {i} - Car Designation"] = data.get(f"wurcom_unit_{i}")
                    api_data['subscription']['metafields'][f"SIM {i}"] = data.get(f"wurcom_location_{i}")
                    api_data['subscription']['metafields'][f"Car Station {i} - Serial Number"] = data.get(f"wurcom_serial_{i}")

            # Provide success/failure message after form is submitted.
            response = requests.post(url, headers=headers, auth=(username, password), json=api_data)
            if response.status_code == 200 or response.status_code == 201:
                messages.success(request, "Activation submitted successfully.")
                return redirect('wurcom_activation')
                # return JsonResponse({'status': 'success', 'data': response.json()})
            else:
                messages.error(request, f"Error submitting activation. Please try again.")
                return redirect('wurcom_activation')
                # return JsonResponse({'status': 'error', 'message': response.json()}, status=response.status_code)
    except Exception as e:
        messages.error(request, f"An unexpected error occurred: {str(e)}")
        return redirect('wurcom_activation')
        # return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    return render(request, 'activation.html', {})