import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Play, Music2, ExternalLink } from 'lucide-react';

const Music = () => {
  const spotifyEmbedUrl = 'https://open.spotify.com/embed/artist/6h8I11DQTo4g1gOgwwIQTd';
  
  const videos = [
    {
      id: 'HnbiPF1hSfM',
      title: 'EE Evolution 2023 Trailer',
      type: 'Official'
    },
    {
      id: 'xkEmYQvJ_68',
      title: 'Thoda Thoda - Performed by Gire & Gana',
      type: 'Studio Cover'
    },
    {
      id: 'DjYmBOkQwx0',
      title: 'Mazhai',
      type: 'Studio Cover'
    },
    {
      id: '7SptWt9b9Kk',
      title: 'Marakkavillaye',
      type: 'Studio Cover'
    },
    {
      id: 'xONqfGLkoYo',
      title: 'Sydney Festival Hype Reel',
      type: 'Live Performance'
    },
    {
      id: 'mT93FpfvYDU',
      title: 'Eastern Empire Sydney Festival 2017',
      type: 'Live Performance'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4" style={{
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/59d4e29ac027d8f12df47f49/1507210332539-YI23GP65QJI2MBP0PIDF/ABL-148.jpg?format=2500w)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">OUR MUSIC</h1>
          <p className="text-2xl text-gray-300">Listen to our latest releases and covers</p>
        </div>
      </section>

      {/* Spotify Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Music2 className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Stream on Spotify</h2>
            <p className="text-xl text-gray-400">Listen to all our original songs and covers</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <iframe
              src={spotifyEmbedUrl}
              width="100%"
              height="380"
              frameBorder="0"
              allow="encrypted-media"
              title="Eastern Empire on Spotify"
              className="rounded-lg"
            ></iframe>
            <div className="flex justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold"
                onClick={() => window.open('https://open.spotify.com/artist/6h8I11DQTo4g1gOgwwIQTd', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Open in Spotify
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SoundCloud Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Listen on SoundCloud</h2>
            <p className="text-xl text-gray-400">More tracks and exclusive content</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/easternempire&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              title="Eastern Empire on SoundCloud"
            ></iframe>
            <div className="flex justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold"
                onClick={() => window.open('https://soundcloud.com/easternempire', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Open in SoundCloud
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Library */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Play className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Music Videos</h2>
            <p className="text-xl text-gray-400">Watch our official music videos and live performances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <Card key={index} className="bg-black border-zinc-800 hover:border-zinc-600 transition-all duration-300 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="inline-block bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-sm">{video.type}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold"
              onClick={() => window.open('https://www.youtube.com/channel/UCMqBs4odGJ-Tl6UMTlxPPDA', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              More on YouTube
            </Button>
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Stream Everywhere</h2>
          <p className="text-xl text-gray-300 mb-12">
            Find Eastern Empire on all major streaming platforms
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Button
              variant="outline"
              className="border-zinc-700 hover:border-white text-white h-auto py-6"
              onClick={() => window.open('https://open.spotify.com/artist/6h8I11DQTo4g1gOgwwIQTd', '_blank')}
            >
              Spotify
            </Button>
            <Button
              variant="outline"
              className="border-zinc-700 hover:border-white text-white h-auto py-6"
              onClick={() => window.open('https://soundcloud.com/easternempire', '_blank')}
            >
              SoundCloud
            </Button>
            <Button
              variant="outline"
              className="border-zinc-700 hover:border-white text-white h-auto py-6"
              onClick={() => window.open('https://www.youtube.com/channel/UCMqBs4odGJ-Tl6UMTlxPPDA', '_blank')}
            >
              YouTube
            </Button>
            <Button
              variant="outline"
              className="border-zinc-700 hover:border-white text-white h-auto py-6"
              onClick={() => window.open('https://www.facebook.com/easternempiremusic', '_blank')}
            >
              Facebook
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Music;