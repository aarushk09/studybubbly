'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Users, Share, CheckCircle } from 'lucide-react'

interface FloatingBubbleProps {
  size: number;
  duration: number;
  xPosition: number;
}

const FloatingBubble = ({ size, duration, xPosition }: FloatingBubbleProps) => {
  const controls = useAnimation()

  const animate = useCallback(() => {
    controls.start({
      y: [0, -window.innerHeight - size],
      opacity: [0, 1, 1, 0],
      transition: {
        y: { duration: duration, ease: "linear" },
        opacity: { duration: duration * 0.2, times: [0, 0.1, 0.9, 1] },
      },
    }).then(animate)
  }, [controls, duration, size])

  useEffect(() => {
    animate()
  }, [animate])

  return (
    <motion.div
      className="absolute rounded-full bg-blue-200 opacity-50"
      style={{
        width: size,
        height: size,
        left: `${xPosition}%`,
        bottom: -size,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={controls}
    />
  )
}

const BubbleContainer = () => {
  interface Bubble {
    id: string;
    size: number;
    duration: number;
    xPosition: number;
  }

  const [bubbles, setBubbles] = useState<Bubble[]>([])

  const createBubble = useCallback(() => ({
    id: Math.random().toString(36).substr(2, 9),
    size: Math.random() * 40 + 20,
    duration: Math.random() * 15 + 10,
    xPosition: Math.random() * 100,
  }), [])

  useEffect(() => {
    const initialBubbles = Array.from({ length: 10 }, createBubble)
    setBubbles(initialBubbles)

    const interval = setInterval(() => {
      setBubbles(prevBubbles => [...prevBubbles, createBubble()])
    }, 2000)

    return () => clearInterval(interval)
  }, [createBubble])

  return (
    <>
      {bubbles.map(bubble => (
        <FloatingBubble
          key={bubble.id}
          size={bubble.size}
          duration={bubble.duration}
          xPosition={bubble.xPosition}
        />
      ))}
    </>
  )
}

export default function EnhancedHomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#4299E1"/>
              <path d="M12 20C12 13.9249 16.9249 9 23 9C29.0751 9 34 13.9249 34 20C34 26.0751 29.0751 31 23 31" stroke="white" strokeWidth="2"/>
              <circle cx="23" cy="20" r="4" fill="white"/>
              <circle cx="13" cy="25" r="2" fill="white"/>
            </svg>
            <h1 className="text-2xl font-bold text-blue-600">Study Bubbly</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            {['Home', 'Notes', 'Meet the Staff', 'About', 'More'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-yellow-400 text-blue-800 border-yellow-500 hover:bg-yellow-500">Start Now</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Apply Now</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-400 to-purple-500 text-white overflow-hidden">
        <BubbleContainer />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Study Bubbly: A study resource for everything AP.
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            study smart. tutor together. ace APs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="bg-yellow-400 text-blue-800 hover:bg-yellow-500">
              Take me to the notes!
            </Button>
          </motion.div>
        </div>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 36.7C840 27 960 13 1080 16.3C1200 20 1320 40 1380 50L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </section>

      {/* About Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">About Us</h2>
          <blockquote className="text-2xl italic text-center mb-8 text-gray-600">&quot;Sometimes you have to take risks&quot; - Vincent Yang (Founder)</blockquote>
          <p className="text-lg text-center max-w-3xl mx-auto text-gray-700">
            Study Bubbly was founded during the Covid-19 pandemic with several friends, each in a different state. Despite initial doubts, countless hours of effort made this success possible. Now, Study Bubbly is completely led by high school volunteers and aims to provide free, high-quality AP resources nationwide and abroad.
          </p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Our Success Stories</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            We&apos;re proud of the impact we&apos;ve made on students nationwide! From mastering AP Calculus to acing AP Literature, here&apos;s what students have to say about Study Bubbly.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                &quot;Study Bubbly&apos;s resources were a lifesaver during my AP exams! The notes were concise and easy to understand.&quot;
              </p>
              <p className="font-semibold text-blue-600">— Sophie R., California</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                &quot;I loved the collaborative study sessions on Discord. It felt like I wasn&apos;t alone!&quot;
              </p>
              <p className="font-semibold text-blue-600">— Jamal K., New York</p>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              Read More Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Get Involved with Study Bubbly</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            Whether you want to contribute notes, become a tutor, or help manage our social media, there&apos;s always a role for you! Join a team of passionate students and help make learning accessible to everyone.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Note Writer</h3>
              <p className="text-gray-700">Help us build a collection of accurate, high-quality notes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tutor</h3>
              <p className="text-gray-700">Share your knowledge and offer one-on-one support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Share className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Outreach</h3>
              <p className="text-gray-700">Help expand our reach to more students.</p>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-yellow-400 text-blue-800 hover:bg-yellow-500">
              See Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Study Guides Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Featured Study Guides</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            Don&apos;t know where to start? Check out some of our most popular study guides for AP classes.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">AP Biology</h3>
              <p className="text-gray-700 mb-4">Explore comprehensive notes on cell structure, genetics, and more!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">AP US History</h3>
              <p className="text-gray-700 mb-4">Key events and movements that shaped the United States—summarized!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">AP Psychology</h3>
              <p className="text-gray-700 mb-4">From brain anatomy to behavioral theories, get the info you need.</p>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              View All Study Guides
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">How Study Bubbly Works</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            We make it simple to find the resources you need.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Search className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Explore Our Library</h3>
              <p className="text-gray-700">Use our categorized search to find notes for your class.</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Join the Community</h3>
              <p className="text-gray-700">Attend live study sessions on our Discord server.</p>
            </div>
            <div className="text-center">
              <Share className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. Share & Collaborate</h3>
              <p className="text-gray-700">Contribute your own notes and insights to help others.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Study Bubbly Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Why Choose Study Bubbly?</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            There are countless study resources out there, but here&apos;s why Study Bubbly is different:
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Free & Accessible</h3>
              <p className="text-gray-700 text-center">Our resources are 100% free for every student.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Student-Led & Trusted</h3>
              <p className="text-gray-700 text-center">All our content is created and reviewed by top-performing high school students.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Comprehensive & Up-to-Date</h3>
              <p className="text-gray-700 text-center">We&apos;re always updating our materials to reflect the latest AP curriculum.</p>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Join Our Community!</h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            Want to study smarter and connect with like-minded peers? Join our Discord server where you can attend study sessions, ask for help, and even host your own events!
          </p>
          <div className="text-center">
            <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
              Join the Discord Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 73.3C480 67 600 73 720 83.3C840 93 960 107 1080 103.7C1200 100 1320 80 1380 70L1440 60V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="#1F2937"/>
        </svg>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['FAQ', 'About Us', 'Blog', 'Code of Conduct', 'Privacy Policy', 'Terms of Use and Conditions'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <Link href="https://linktr.ee/studybubbly" className="text-blue-400 hover:underline">Study Bubbly&apos;s Social Media</Link>
              <p className="mt-4">Questions, comments, or requests? Feel free to reach out to us at cpstudentbubble@gmail.com!</p>
            </div>
            <div>
              <p className="text-sm">&copy;2021 by Study Bubbly</p>
              <p className="text-sm mt-4">AP is a registered trademark by the College Board, which is not affiliated with, and does not endorse this website.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}