import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, Music, Award, Globe } from 'lucide-react';

const Bio = () => {
  const members = [
    {
      name: 'Gana Aruneswaran',
      role: 'Keys & Vocals',
      image: 'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688161854-PHS7VPBUBCZ45VBOJLRA/Eternal+The+Show-3.jpg?format=1000w',
      bio: 'A classically trained musician with a passion for South Asian fusion, Gana brings melodic brilliance to every performance.'
    },
    {
      name: 'Kasturi Murugavel',
      role: 'Bass Guitar',
      image: 'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688308635-MWVZ15D9TU3O2ZYYAZCM/Eternal+The+Show-20.jpg?format=1000w',
      bio: 'With grooves that anchor the band, Kasturi\'s bass lines provide the foundation for Eastern Empire\'s electric sound.'
    },
    {
      name: 'Charou Ram',
      role: 'Percussion & Production',
      image: 'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1567688440851-OCWDWNMFXWG2SM43XRJI/Eternal+The+Show-21.jpg?format=1000w',
      bio: 'A master of rhythm, Charou combines traditional tabla with modern percussion, creating the heartbeat of Eastern Empire.'
    },
    {
      name: 'Ensemble Members',
      role: 'Strings, Vocals & More',
      image: 'https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1627188930727-XRIP0GJG3ZCWM9POLMPL/EEE_FacebookBanner_820x312_6A.jpg?format=1000w',
      bio: 'Our rotating ensemble of talented musicians brings versatility, allowing us to configure from intimate string quartets to full electric ensembles.'
    }
  ];

  const milestones = [
    {
      year: '2011',
      title: 'Formation',
      description: 'Eastern Empire was founded by a group of passionate South Asian musicians in Sydney.'
    },
    {
      year: '2015',
      title: 'First Major Festival',
      description: 'Performed at Sydney Festival, marking our debut on the city\'s biggest stages.'
    },
    {
      year: '2017',
      title: 'International Collaborations',
      description: 'Began collaborating with international South Asian artists, expanding our musical horizons.'
    },
    {
      year: '2019',
      title: 'Studio Releases',
      description: 'Released multiple studio covers and original compositions, gaining recognition on streaming platforms.'
    },
    {
      year: '2023',
      title: 'Evolution',
      description: 'Launched EE Evolution, our most ambitious project showcasing the band\'s growth and versatility.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1627188930727-XRIP0GJG3ZCWM9POLMPL/EEE_FacebookBanner_820x312_6A.jpg?format=2500w)',
        backgroundSize: '110%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">OUR STORY</h1>
          <p className="text-2xl text-gray-300">Sydney's Premier South Asian Ensemble</p>
        </div>
      </section>

      {/* Main Bio */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-8">We are EASTERN EMPIRE</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              <span className="text-2xl font-bold text-white">Eclectic. Electric. And unlike any other.</span> Eastern Empire is Sydney's finest ensemble of South Asian artists. Performing together since 2011, the band has rocked Sydney's biggest stages and festivals with its inimitable interpretation of Indian music.
            </p>
            <p>
              Having collaborated with a host of international acts, Eastern Empire has been influential in popularising South Asian music in the Sydney music scene, and is now set to leave its mark on the world stage.
            </p>
            <p>
              Our unique sound blends traditional South Asian instruments and melodies with contemporary arrangements, creating a fusion that resonates with audiences across cultures. From intimate acoustic performances to high-energy festival sets, Eastern Empire adapts to every occasion while maintaining our distinctive musical identity.
            </p>
            <p>
              We specialize in creating unforgettable experiences for weddings, corporate events, cultural celebrations, and music festivals. Our versatile ensemble can be configured from a 3-piece acoustic setup to a full 10+ member electric orchestra, ensuring we deliver the perfect atmosphere for your event.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in Eastern Empire's evolution</p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-3xl font-bold text-white">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-px h-full bg-zinc-700"></div>
                <div className="flex-grow pb-8">
                  <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band Members */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Music className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Meet the Band</h2>
            <p className="text-xl text-gray-400">The talented musicians behind Eastern Empire</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, index) => (
              <Card key={index} className="bg-black border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-gray-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">South Asian Weddings</h3>
                <p className="text-gray-300">
                  We specialize in creating the perfect ambiance for South Asian weddings, from elegant string quartets for ceremonies to high-energy performances for receptions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Corporate Events</h3>
                <p className="text-gray-300">
                  Add cultural flair to your corporate functions with our sophisticated ensemble performances, perfect for galas, launches, and celebrations.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Festivals & Concerts</h3>
                <p className="text-gray-300">
                  Our festival-ready performances bring energy and authenticity to major stages, captivating diverse audiences with our eclectic sound.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Private Events</h3>
                <p className="text-gray-300">
                  From intimate gatherings to grand celebrations, we tailor our performances to suit your unique occasion and venue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;