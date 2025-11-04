import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images (removed first image as requested)
  const galleryImages = [
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507208572358-ZU73JBVWHOH9W16IN9UH/16198942527_80d315f6c8_o.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567687980262-R01VKBQKZQQ0PU6AVYBH/Eternal+The+Show-9.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688161854-PHS7VPBUBCZ45VBOJLRA/Eternal+The+Show-3.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688308635-MWVZ15D9TU3O2ZYYAZCM/Eternal+The+Show-20.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688440851-OCWDWNMFXWG2SM43XRJI/Eternal+The+Show-21.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507208982602-8F1XOKYVLCTL9T21EP1E/15783890164_657075ea2f_o.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507209115020-T8XLJ964FSBGPS0WH404/26597747982_2c796675b4_o+%281%29.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507208917272-N3RMAJX23AEEQT8DCORX/16358901526_39c7c27d23_o.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507209565971-LASKUQY0VOL9CHOBPXNY/26663986496_d9f7f040fa_o.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507209859439-LKOL5IXKIH2YQ4H60ZKZ/26624593331_0639601b88_o+%281%29.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507209948785-1B3H2WJ7FCKSNVI4ODEG/ABL-5.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507210332539-YI23GP65QJI2MBP0PIDF/ABL-148.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688335012-74B4WNEZB1VX4S4CKOZ7/Eternal+The+Show-27.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1569417665485-IIGV7JN070J6UY4B6WDD/Eternal+2019_Medium+Res-325.jpg?format=2500w',
    'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1508253226485-6NRS44HH9QOK5QJSSIO5/bw-2.jpg?format=2500w'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast({
        title: 'Message Sent!',
        description: 'We\'ll get back to you soon.',
      });
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/HnbiPF1hSfM?autoplay=1&mute=1&loop=1&playlist=HnbiPF1hSfM&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Eastern Empire"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-wider" style={{ fontFamily: 'Futura, sans-serif' }}>
            EASTERN EMPIRE
          </h1>
          <p className="text-2xl md:text-3xl mb-8 tracking-wide">Eclectic. Electric.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bookings">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300 px-8 py-6 text-lg font-semibold">
                Book Us
              </Button>
            </Link>
            <Link to="/gigs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-6 text-lg font-semibold">
                Upcoming Shows
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-0 relative">
        <div className="relative w-full h-screen">
          {/* Current Image */}
          <img
            src={galleryImages[currentImageIndex]}
            alt={`Performance ${currentImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={nextImage}
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            By clicking 'Sign Up' you are agreeing to receive email communication from us consisting of updates,
            press releases, ticket promotions and merchandise from Eastern Empire. Your information is secured via
            our MailChimp service and will not be shared with any third party individuals, entities and organisations.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Email Address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="bg-white text-black px-4 py-6 text-lg"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1508253277712-7HMTXZPZCKTO1AW3ZQ92/ABL-43.jpg?format=2500w)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center">CONTACT US</h2>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">First Name (required)</label>
                <Input
                  type="text"
                  value={contactForm.firstName}
                  onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                  required
                  className="bg-white/90 text-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name (required)</label>
                <Input
                  type="text"
                  value={contactForm.lastName}
                  onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                  required
                  className="bg-white/90 text-black"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Email Address (required)</label>
              <Input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                className="bg-white/90 text-black"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Subject (required)</label>
              <Input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
                className="bg-white/90 text-black"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Message (required)</label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows={6}
                className="bg-white/90 text-black"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-semibold"
            >
              Submit
            </Button>
          </form>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">We are EASTERN EMPIRE</h2>
          <p className="text-xl text-gray-300 leading-relaxed text-center mb-12">
            Eclectic. Electric. And unlike any other. Eastern Empire is Sydney's finest ensemble of South Asian artists.
            Performing together since 2011, the band has rocked Sydney's biggest stages and festivals with its inimitable
            interpretation of Indian music. Having collaborated with a host of international acts, Eastern Empire has been
            influential in popularising South Asian music in the Sydney music scene, and is now set to leave its mark on
            the world stage.
          </p>
          <div className="text-center">
            <Link to="/bio">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-5xl font-bold mb-4 text-center">THODA THODA</h2>
            <p className="text-xl text-gray-400 text-center mb-2">05.09.2019 'THODA THODA' PERFORMED BY GIRE & GANA</p>
          </div>
          <div className="aspect-video mb-8">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/xkEmYQvJ_68"
              title="Thoda Thoda"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-zinc-900 p-8 rounded-lg">
            <p className="text-gray-300 mb-4">
              Keys : Gana Aruneswaran<br />
              Bass guitar: Kasturi Murugavel<br />
              Percussion: Charou Ram<br />
              Recorded and Mixed By : Charou Ram<br />
              Mastering : Janakan Raj<br />
              Executive Producer - Eastern Empire<br />
              Direction - Shivayan (Film Drop)<br />
              Video Production - Film Drop<br />
              An Eastern Empire cover
            </p>
            <div className="text-center mt-8">
              <Link to="/music">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold">
                  See More Music
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;