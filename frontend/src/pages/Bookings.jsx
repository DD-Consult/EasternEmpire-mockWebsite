import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Calendar as CalendarIcon, Users, Music2, Sparkles, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Bookings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    venue: '',
    configuration: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Encode form data for Netlify
      const encode = (data) => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] || ''))
          .join("&");
      };

      // Submit to Netlify Forms (works in both development and production)
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "booking-form",
          ...bookingForm
        })
      });

      // Also submit to backend API if available
      if (BACKEND_URL && API) {
        try {
          await axios.post(`${API}/bookings`, bookingForm);
        } catch (apiError) {
          console.log('Backend API submission failed, but Netlify form captured the data');
        }
      }
      
      toast({
        title: 'Booking Inquiry Sent!',
        description: 'We\'ll get back to you within 24 hours.',
      });
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        venue: '',
        configuration: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send inquiry. Please try again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  const configurations = [
    {
      title: 'String Quartet',
      description: 'Elegant 4-piece acoustic ensemble perfect for ceremonies and intimate gatherings',
      ideal: 'Weddings, Corporate Dinners, Private Events',
      icon: Music2
    },
    {
      title: '3-Piece Instrumental/Vocal',
      description: 'Versatile trio with keys, bass, and percussion plus vocals',
      ideal: 'Receptions, Cocktail Hours, Small Venues',
      icon: Users
    },
    {
      title: 'Full Ensemble (6-10+ Pieces)',
      description: 'Our complete electric orchestra with full instrumentation',
      ideal: 'Large Weddings, Festivals, Major Events',
      icon: Sparkles
    }
  ];

  const services = [
    {
      title: 'South Asian Weddings',
      description: 'We specialize in South Asian weddings, bringing authentic musical traditions with a modern twist. From Sangeet ceremonies to grand receptions, we create the perfect atmosphere.',
      features: ['Traditional & Modern Repertoire', 'Customizable Song List', 'Multiple Configuration Options', 'Professional Sound Equipment']
    },
    {
      title: 'Corporate Events',
      description: 'Add sophistication and cultural flair to your corporate functions, product launches, and gala dinners with our professional ensemble.',
      features: ['Elegant Background Music', 'High-Energy Performances', 'Flexible Set Lengths', 'Professional Presentation']
    },
    {
      title: 'Cultural Celebrations',
      description: 'Perfect for Diwali celebrations, community festivals, and cultural events. We bring authenticity and energy to every performance.',
      features: ['Diverse Repertoire', 'Engaging Stage Presence', 'Audience Interaction', 'Festival-Ready Setup']
    },
    {
      title: 'Private Events',
      description: 'From birthday celebrations to anniversary parties, we tailor our performance to suit your unique occasion.',
      features: ['Personalized Song Selection', 'Intimate or Grand Scale', 'Professional Service', 'Memorable Experience']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507209948785-1B3H2WJ7FCKSNVI4ODEG/ABL-5.jpg?format=2500w)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">BOOK EASTERN EMPIRE</h1>
          <p className="text-2xl text-gray-300 mb-8">
            Bring world-class South Asian music to your event
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-400">Professional entertainment for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-black border-zinc-800 hover:border-zinc-600 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Configurations */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Band Configurations</h2>
            <p className="text-xl text-gray-400">Choose the perfect setup for your event</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {configurations.map((config, index) => {
              const Icon = config.icon;
              return (
                <Card key={index} className="bg-zinc-900 border-zinc-800 text-center hover:border-zinc-600 transition-all duration-300">
                  <CardHeader>
                    <Icon className="w-12 h-12 mx-auto mb-4 text-white" />
                    <CardTitle className="text-xl text-white">{config.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{config.description}</p>
                    <p className="text-sm text-gray-400">
                      <strong>Ideal for:</strong> {config.ideal}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <CalendarIcon className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Request a Booking</h2>
            <p className="text-xl text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
          <Card className="bg-black border-zinc-800">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" name="booking-form" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="booking-form" />
                <div className="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Full Name *</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    required
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Phone (Optional)</label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="04XX XXX XXX"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Event Type *</label>
                  <input type="hidden" name="eventType" value={bookingForm.eventType} />
                  <Select
                    value={bookingForm.eventType}
                    onValueChange={(value) => setBookingForm({ ...bookingForm, eventType: value })}
                    required
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectValue placeholder="Select your event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="cultural">Cultural Celebration</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="private">Private Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Event Date (Optional)</label>
                  <Input
                    type="date"
                    name="eventDate"
                    value={bookingForm.eventDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Venue/Location (Optional)</label>
                  <Input
                    type="text"
                    name="venue"
                    placeholder="e.g., Sydney Opera House or TBD"
                    value={bookingForm.venue}
                    onChange={(e) => setBookingForm({ ...bookingForm, venue: e.target.value })}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Preferred Band Configuration (Optional)</label>
                  <input type="hidden" name="configuration" value={bookingForm.configuration} />
                  <Select
                    value={bookingForm.configuration}
                    onValueChange={(value) => setBookingForm({ ...bookingForm, configuration: value })}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectValue placeholder="Select band configuration or skip if unsure" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="quartet">String Quartet (4 pieces)</SelectItem>
                      <SelectItem value="trio">3-Piece Instrumental/Vocal</SelectItem>
                      <SelectItem value="full">Full Ensemble (6-10+ pieces)</SelectItem>
                      <SelectItem value="unsure">Not Sure / Need Recommendation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Additional Details (Optional)</label>
                  <Textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                    rows={6}
                    placeholder="Tell us about your event, guest count, special song requests, or any questions you have..."
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-semibold"
                >
                  {loading ? 'Sending...' : 'Submit Booking Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Have Other Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Feel free to reach out directly via email or Facebook. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold"
              onClick={() => window.location.href = 'mailto:info@easternempire.com.au'}
            >
              Email Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold"
              onClick={() => window.open('https://www.facebook.com/easternempiremusic', '_blank')}
            >
              Message on Facebook
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bookings;