#!/usr/bin/env python3
"""
Eastern Empire API Testing Suite
Tests all backend API endpoints for the Eastern Empire application
"""

import requests
import json
import sys
from datetime import datetime
import os
from pathlib import Path

# Load the backend URL from frontend/.env
def load_backend_url():
    frontend_env_path = Path("/app/frontend/.env")
    if frontend_env_path.exists():
        with open(frontend_env_path, 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    return "http://localhost:8001"

BASE_URL = load_backend_url()
API_BASE = f"{BASE_URL}/api"

class APITester:
    def __init__(self):
        self.results = []
        self.failed_tests = []
        
    def log_result(self, test_name, success, details):
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.results.append(result)
        if not success:
            self.failed_tests.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
    
    def test_health_check(self):
        """Test GET /api/ - health check"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Eastern Empire" in data["message"]:
                    self.log_result("Health Check", True, f"API is healthy: {data['message']}")
                else:
                    self.log_result("Health Check", False, f"Unexpected response: {data}")
            else:
                self.log_result("Health Check", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")
    
    def test_newsletter_subscription(self):
        """Test POST /api/newsletter - newsletter subscription"""
        try:
            # Test valid subscription with unique email
            unique_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
            payload = {"email": unique_email}
            response = requests.post(f"{API_BASE}/newsletter", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "email" in data and data["email"] == payload["email"]:
                    self.log_result("Newsletter Subscription", True, f"Successfully subscribed: {data['email']}")
                else:
                    self.log_result("Newsletter Subscription", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Newsletter Subscription", False, f"Status {response.status_code}: {response.text}")
                
            # Test duplicate subscription (should fail)
            response2 = requests.post(f"{API_BASE}/newsletter", json=payload, timeout=10)
            if response2.status_code == 400:
                self.log_result("Newsletter Duplicate Check", True, "Correctly rejected duplicate email")
            else:
                self.log_result("Newsletter Duplicate Check", False, f"Should have rejected duplicate, got status {response2.status_code}")
                
        except Exception as e:
            self.log_result("Newsletter Subscription", False, f"Error: {str(e)}")
    
    def test_get_newsletter_subscriptions(self):
        """Test GET /api/newsletter - get all subscriptions"""
        try:
            response = requests.get(f"{API_BASE}/newsletter", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get Newsletter Subscriptions", True, f"Retrieved {len(data)} subscriptions")
                else:
                    self.log_result("Get Newsletter Subscriptions", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Get Newsletter Subscriptions", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Get Newsletter Subscriptions", False, f"Error: {str(e)}")
    
    def test_contact_form(self):
        """Test POST /api/contact - contact form submission"""
        try:
            payload = {
                "firstName": "John",
                "lastName": "Doe", 
                "email": "john@example.com",
                "subject": "Test",
                "message": "Hello"
            }
            response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["firstName", "lastName", "email", "subject", "message"]
                if all(field in data for field in required_fields):
                    self.log_result("Contact Form Submission", True, f"Successfully submitted contact form for {data['firstName']} {data['lastName']}")
                else:
                    self.log_result("Contact Form Submission", False, f"Missing required fields in response: {data}")
            else:
                self.log_result("Contact Form Submission", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Contact Form Submission", False, f"Error: {str(e)}")
    
    def test_get_contact_messages(self):
        """Test GET /api/contact - get all messages"""
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get Contact Messages", True, f"Retrieved {len(data)} contact messages")
                else:
                    self.log_result("Get Contact Messages", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Get Contact Messages", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Get Contact Messages", False, f"Error: {str(e)}")
    
    def test_get_events(self):
        """Test GET /api/events - comprehensive validation of seeded events"""
        try:
            response = requests.get(f"{API_BASE}/events", timeout=10)
            if response.status_code != 200:
                self.log_result("Get Events", False, f"Status {response.status_code}: {response.text}")
                return
                
            data = response.json()
            if not isinstance(data, list):
                self.log_result("Get Events", False, f"Expected list, got: {type(data)}")
                return
            
            # Check we have exactly 3 events
            if len(data) != 3:
                self.log_result("Get Events", False, f"Expected exactly 3 events, got {len(data)}")
                return
            
            # Expected dates in chronological order
            expected_dates = ["2025-12-15", "2026-01-20", "2026-02-25"]
            required_fields = ["title", "venue", "address", "date", "time", "description", "ticketUrl"]
            
            # Validate each event
            for i, event in enumerate(data):
                # Check all required fields are present
                missing_fields = [field for field in required_fields if field not in event]
                if missing_fields:
                    self.log_result("Get Events", False, f"Event {i+1} missing fields: {missing_fields}")
                    return
                
                # Check ObjectId conversion (should not have MongoDB ObjectId)
                if "_id" in event and not isinstance(event["_id"], str):
                    self.log_result("Get Events", False, f"Event {i+1} has non-string _id: {type(event['_id'])}")
                    return
                
                # Validate date format and expected dates
                event_date = event.get("date", "")
                if event_date != expected_dates[i]:
                    self.log_result("Get Events", False, f"Event {i+1} has date '{event_date}', expected '{expected_dates[i]}'")
                    return
            
            # Check chronological sorting
            event_dates = [event["date"] for event in data]
            if event_dates != expected_dates:
                self.log_result("Get Events", False, f"Events not in chronological order. Got: {event_dates}, Expected: {expected_dates}")
                return
            
            # All validations passed
            event_titles = [event["title"] for event in data]
            self.log_result("Get Events", True, f"✅ All validations passed: 3 events with correct dates {expected_dates}, proper structure, and chronological order. Events: {event_titles}")
            
        except Exception as e:
            self.log_result("Get Events", False, f"Error: {str(e)}")
    
    def test_events_detailed_validation(self):
        """Detailed validation of event structure and content"""
        try:
            response = requests.get(f"{API_BASE}/events", timeout=10)
            if response.status_code != 200:
                self.log_result("Events Detailed Validation", False, f"Status {response.status_code}: {response.text}")
                return
                
            data = response.json()
            
            # Print detailed event information for verification
            print("\n📋 DETAILED EVENT VALIDATION:")
            print("=" * 50)
            
            for i, event in enumerate(data, 1):
                print(f"\n🎵 Event {i}:")
                print(f"  Title: {event.get('title', 'N/A')}")
                print(f"  Venue: {event.get('venue', 'N/A')}")
                print(f"  Address: {event.get('address', 'N/A')}")
                print(f"  Date: {event.get('date', 'N/A')}")
                print(f"  Time: {event.get('time', 'N/A')}")
                print(f"  Description: {event.get('description', 'N/A')[:100]}...")
                print(f"  Ticket URL: {event.get('ticketUrl', 'N/A')}")
                print(f"  ID Type: {type(event.get('_id', event.get('id', 'N/A')))}")
            
            print("=" * 50)
            
            # Validate no serialization errors (all values should be JSON serializable)
            try:
                json.dumps(data)
                self.log_result("Events Detailed Validation", True, "All events are properly JSON serializable with no ObjectId issues")
            except TypeError as e:
                self.log_result("Events Detailed Validation", False, f"JSON serialization error: {str(e)}")
                
        except Exception as e:
            self.log_result("Events Detailed Validation", False, f"Error: {str(e)}")
    
    def test_booking_inquiry(self):
        """Test POST /api/bookings - booking inquiry"""
        try:
            payload = {
                "name": "Test User",
                "email": "test@test.com",
                "phone": "0400000000",
                "eventType": "wedding",
                "eventDate": "2025-12-25",
                "venue": "Test Venue"
            }
            response = requests.post(f"{API_BASE}/bookings", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["name", "email", "phone", "eventType", "eventDate", "venue"]
                if all(field in data for field in required_fields):
                    self.log_result("Booking Inquiry", True, f"Successfully submitted booking for {data['name']} - {data['eventType']}")
                else:
                    self.log_result("Booking Inquiry", False, f"Missing required fields in response: {data}")
            else:
                self.log_result("Booking Inquiry", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Booking Inquiry", False, f"Error: {str(e)}")
    
    def test_get_bookings(self):
        """Test GET /api/bookings - get all bookings"""
        try:
            response = requests.get(f"{API_BASE}/bookings", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get Bookings", True, f"Retrieved {len(data)} booking inquiries")
                else:
                    self.log_result("Get Bookings", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Get Bookings", False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Get Bookings", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Eastern Empire API Tests")
        print(f"📍 Testing against: {API_BASE}")
        print("=" * 60)
        
        # Run tests in order
        self.test_health_check()
        self.test_newsletter_subscription()
        self.test_get_newsletter_subscriptions()
        self.test_contact_form()
        self.test_get_contact_messages()
        self.test_get_events()
        self.test_booking_inquiry()
        self.test_get_bookings()
        
        # Summary
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"Total Tests: {len(self.results)}")
        print(f"Passed: {len(self.results) - len(self.failed_tests)}")
        print(f"Failed: {len(self.failed_tests)}")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)