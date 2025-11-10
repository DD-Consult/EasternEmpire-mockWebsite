import React, { useState, useEffect } from 'react';
import { Calendar } from '../components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Clock, Music } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;

const Gigs = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // If no backend URL is configured, don't try to fetch
    if (!API) {
      console.log('No backend URL configured');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setError('Unable to load events at this time.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567687980262-R01VKBQKZQQ0PU6AVYBH/Eternal+The+Show-9.jpg?format=2500w)',
        backgroundSize: '110%',
        backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">TOUR DATES</h1>
          <p className="text-2xl text-gray-300">Catch us live at our upcoming shows</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Shows</h2>
          {loading ? (
            <p className="text-center text-gray-400">Loading events...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-gray-400 text-xl mb-4">{error}</p>
              <p className="text-gray-500">Please check back later or contact us for booking information.</p>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">No upcoming shows scheduled. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={event.id || event._id || index} className="bg-black border-zinc-800 hover:border-zinc-600 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{event.venue}</p>
                        <p className="text-sm">{event.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5" />
                      <p>{new Date(event.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}</p>
                    </div>
                    {event.description && (
                      <p className="text-gray-400">{event.description}</p>
                    )}
                    {event.ticketUrl && (
                      <Button
                        className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
                        onClick={() => window.open(event.ticketUrl, '_blank')}
                      >
                        Get Tickets
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Past Performances</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <Card key={event.id || event._id || index} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-2">{event.venue}</p>
                    <p className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <Music className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Want us at your event?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Eastern Empire is available for private events, corporate functions, weddings, and festivals.
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold"
            onClick={() => window.location.href = '/bookings'}
          >
            Book Us for Your Event
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gigs;