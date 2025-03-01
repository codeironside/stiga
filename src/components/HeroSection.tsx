import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Set loaded state with slight delay for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax effects based on scroll position
  const parallaxOffset = -scrollY * 0.2;
  const imageParallax = -scrollY * 0.1;

  return (
    <section id="home" className="relative bg-white overflow-hidden min-h-screen">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes drawSvg {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          opacity: 0;
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          opacity: 0;
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          opacity: 0;
          animation: scaleIn 0.8s ease-out forwards;
        }
        
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawSvg 1.5s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .btn-hover-effect {
          transition: all 0.3s ease;
        }
        
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .parallax-bg {
          transition: transform 0.2s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2 animate-draw delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ transition: 'all 0.8s ease-out' }}
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left" style={{ transform: `translateY(${parallaxOffset}px)` }}>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className={`block xl:inline ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`}>
                  Innovative solutions for
                </span>{' '}
                <span className={`block text-blue-600 xl:inline ${isLoaded ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
                  your business
                </span>
              </h1>
              <p className={`mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${isLoaded ? 'animate-fade-in-right delay-300' : 'opacity-0'}`}>
                We help businesses like yours grow and thrive in the digital age with cutting-edge technology and strategic solutions tailored to your needs.
              </p>
              <div className={`mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
                <div className="rounded-md shadow">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 btn-hover-effect transition-all"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 btn-hover-effect transition-all group"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div 
        className={`lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden ${isLoaded ? 'animate-scale-in delay-200' : 'opacity-0'}`}
      >
        <div className="parallax-bg" style={{ transform: `translateY(${imageParallax}px)` }}>
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transition-all duration-700 hover:scale-105"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Team working on project"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;