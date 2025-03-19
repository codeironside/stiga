import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [animationVariant, setAnimationVariant] = useState(0);
  
  // Cycle through animation variants
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationVariant((prev) => (prev + 1) % 3);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  // Custom arrow components with cybersecurity theme
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute right-8 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-accent-500/80 text-background-50 transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-400/30`}
        onClick={onClick}
        style={{ transform: 'skew(-10deg)' }}
      >
        <div className="overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute left-8 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-accent-500/80 text-background-50 transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-400/30`}
        onClick={onClick}
        style={{ transform: 'skew(-10deg)' }}
      >
        <div className="overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10 12.77 13.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  };

  // Digital circuit-inspired dots
  const CustomDot = ({ onClick, active }) => {
    return (
      <div className="relative mx-2 flex items-center">
        <button
          onClick={onClick}
          className={`h-2 w-8 transition-all duration-300 ${
            active ? 'bg-accent-400' : 'bg-neutral-600'
          }`}
          aria-label="Carousel navigation dot"
        />
        {active && (
          <>
            <div className="absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 animate-pulse rounded-full bg-accent-400/50" />
            <div className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 animate-pulse rounded-full bg-accent-400/50" />
          </>
        )}
      </div>
    );
  };

  // Play/Pause button
  const PlayPauseButton = () => {
    return (
      <button
        onClick={() => setIsAutoplay(!isAutoplay)}
        className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-md bg-primary-800/80 text-background-50 backdrop-blur-sm transition-all hover:bg-primary-700"
        aria-label={isAutoplay ? "Pause carousel" : "Play carousel"}
      >
        {isAutoplay ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isAutoplay,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="bottom-6 flex w-full justify-center">
        <div className="rounded-full bg-primary-900/60 px-6 py-2 backdrop-blur-sm">
          <ul className="m-0 flex items-center p-0"> {dots} </ul>
        </div>
      </div>
    ),
    customPaging: i => <CustomDot active={i === currentSlide} />,
    fade: true
  };

  // Cybersecurity themed slides (23 total)
  const cyberSecuritySlides = [
    {
      src: "1.jpg",
      alt: "Network Security",
      caption: "Network Threat Defense",
      description: "Advanced protection against unauthorized access and network vulnerabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      src: "2.jpg",
      alt: "Data Encryption",
      caption: "Military-Grade Encryption",
      description: "Protecting sensitive data with state-of-the-art cryptographic algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      src: "3.jpg",
      alt: "Threat Detection",
      caption: "AI-Powered Threat Detection",
      description: "Identifying and neutralizing threats before they compromise your systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      src: "4.jpg",
      alt: "Security Monitoring",
      caption: "24/7 Security Monitoring",
      description: "Continuous surveillance of your digital assets to ensure maximum protection.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228a10.498 10.498 0 00-2.294 4.066M11.963 7.956a3.75 3.75 0 00-3.75 3.75m3.75-3.75a3.75 3.75 0 013.75 3.75m-3.75-3.75v3.75m3.75-3.75v3.75" />
        </svg>
      )
    },
    {
      src: "5.jpg",
      alt: "Vulnerability Assessment",
      caption: "Vulnerability Assessment",
      description: "Identifying security gaps before they can be exploited by malicious actors.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146" />
        </svg>
      )
    },
    // --- New slides added below (slides 6 to 23) ---
    {
      src: "6.jpg",
      alt: "Firewall Protection",
      caption: "Next-Gen Firewall",
      description: "State-of-the-art firewall solutions to block unauthorized access.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V6l8-4z" />
        </svg>
      )
    },
    {
      src: "7.jpg",
      alt: "Intrusion Prevention",
      caption: "Real-Time Intrusion Prevention",
      description: "Monitoring and blocking suspicious activities to prevent breaches.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      )
    },
    {
      src: "8.jpg",
      alt: "Incident Response",
      caption: "Rapid Incident Response",
      description: "Swift actions to mitigate and recover from security incidents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      src: "9.jpg",
      alt: "Penetration Testing",
      caption: "Proactive Penetration Testing",
      description: "Simulated attacks to identify and address vulnerabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2" />
        </svg>
      )
    },
    {
      src: "10.jpg",
      alt: "Endpoint Security",
      caption: "Comprehensive Endpoint Security",
      description: "Protecting every device connected to your network.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 8h18M4 12h16v8H4v-8z" />
        </svg>
      )
    },
    {
      src: "11.jpg",
      alt: "Cloud Security",
      caption: "Securing Cloud Infrastructure",
      description: "Protecting data and applications in the cloud environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h.28a4 4 0 014-3.47 4 4 0 014 3.47H17a4 4 0 014 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
        </svg>
      )
    },
    {
      src: "12.jpg",
      alt: "IoT Security",
      caption: "Securing Internet of Things",
      description: "Comprehensive security for smart devices and connected systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v2M12 17v2M5 12h2M17 12h2M7.757 7.757l1.414 1.414M14.829 14.829l1.414 1.414M7.757 16.243l1.414-1.414M14.829 9.171l1.414-1.414" />
        </svg>
      )
    },
    {
      src: "13.jpg",
      alt: "Mobile Security",
      caption: "Mobile Device Protection",
      description: "Safeguarding smartphones and tablets from cyber threats.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
        </svg>
      )
    },
    {
      src: "14.jpg",
      alt: "Cyber Threat Intelligence",
      caption: "Cyber Threat Intelligence",
      description: "Gathering and analyzing threat data to anticipate cyber attacks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      src: "15.jpg",
      alt: "Data Loss Prevention",
      caption: "Data Loss Prevention",
      description: "Tools and strategies to secure sensitive data from unauthorized access.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <rect x="6" y="10" width="12" height="10" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V7a3 3 0 016 0v3" />
        </svg>
      )
    },
    {
      src: "16.jpg",
      alt: "Identity Access Management",
      caption: "Identity Access Management",
      description: "Ensuring secure user access through advanced authentication protocols.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 20a10 10 0 0116 0" />
        </svg>
      )
    },
    {
      src: "17.jpg",
      alt: "Security Auditing",
      caption: "Continuous Security Auditing",
      description: "Regular audits to identify and address potential security weaknesses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      src: "18.jpg",
      alt: "Compliance Monitoring",
      caption: "Compliance Monitoring",
      description: "Monitoring systems to adhere to industry standards and regulations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        </svg>
      )
    },
    {
      src: "19.jpg",
      alt: "Risk Management",
      caption: "Risk Management",
      description: "Assessing and mitigating risks to protect your digital assets.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86l-7.14 12.4A1 1 0 004 18h16a1 1 0 00.86-1.5l-7.14-12.4a1 1 0 00-1.72 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
        </svg>
      )
    },
    {
      src: "20.jpg",
      alt: "Security Automation",
      caption: "Security Automation",
      description: "Leveraging automation to streamline and enhance security operations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82V8c0 .59.34 1.11.86 1.35" />
        </svg>
      )
    },
    {
      src: "21.jpg",
      alt: "Secure Software Development",
      caption: "DevSecOps Integration",
      description: "Integrating security throughout the software development lifecycle.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      )
    },
    {
      src: "22.jpg",
      alt: "Security Awareness Training",
      caption: "Security Awareness Training",
      description: "Empowering employees with the knowledge to thwart cyber attacks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a6 6 0 016 6c0 2.5-1.6 4.66-4 5.56V18h-4v-4.44C7.6 12.66 6 10.5 6 8a6 6 0 016-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v4" />
        </svg>
      )
    },
    {
      src: "23.jpg",
      alt: "Dark Web Monitoring",
      caption: "Dark Web Monitoring",
      description: "Tracking dark web activities to preempt potential cyber threats.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <circle cx="12" cy="12" r="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  // Matrix-like binary background component (decorative element)
  const BinaryBackground = () => {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 flex flex-wrap">
          {Array(100).fill().map((_, i) => (
            <div key={i} className="text-xs text-accent-500" style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fadeIn ${Math.random() * 2 + 2}s infinite alternate ${Math.random() * 2}s`
            }}>
              {Math.round(Math.random())}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Digital glitch effect
  const DigitalGlitch = ({ active }) => {
    if (!active) return null;
    
    return (
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {Array(3).fill().map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-accent-500/20" 
            style={{
              left: '0',
              right: '0',
              height: '2px',
              top: `${Math.random() * 100}%`,
              transform: `translateY(-50%)`,
              animation: `slideInRight ${Math.random() * 0.5 + 0.2}s ease-in-out forwards`
            }}
          />
        ))}
      </div>
    );
  };

  // Get the animation style based on the variant
  const getAnimationStyle = (index) => {
    if (currentSlide !== index) return 'opacity-0';
    
    switch (animationVariant) {
      case 0: // Digital reveal animation
        return 'animate-slide-up';
      case 1: // Encrypted reveal animation
        return 'translate-y-0 opacity-100 transition-all duration-1000 delay-300';
      case 2: // Scanner effect
        return 'opacity-100 scale-100 transition-all duration-700';
      default:
        return 'animate-slide-up';
    }
  };

  return (
    <div className="carousel-wrapper relative w-full bg-primary-900">
      {/* Full-width container with cybersecurity styling */}
      <div className="carousel-container relative mx-auto w-full overflow-hidden">
        <BinaryBackground />
        <PlayPauseButton />
        
        {/* Decorative cyber elements */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-r from-accent-500/30 via-transparent to-accent-500/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-r from-accent-500/30 via-transparent to-accent-500/30" />
        
        <DigitalGlitch active={true} />
        
        <Slider {...settings}>
          {cyberSecuritySlides.map((slide, index) => (
            <div key={index} className="relative">
              <div className="relative h-[70vh] w-full overflow-hidden" style={{ maxHeight: '800px', minHeight: '500px' }}>
                {/* Digital noise overlay */}
                <div className="absolute inset-0 z-10 bg-primary-900/20 mix-blend-multiply" />
                
                {/* Cybersecurity grid overlay */}
                <div className="absolute inset-0 z-0" 
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(0,50,102,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,50,102,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} 
                />
                
                {/* Background image */}
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-700"
                  style={{ 
                    backgroundImage: `url(${slide.src})`,
                    transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                  aria-label={slide.alt}
                />

                {/* Content positioning wrapper */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-8 md:px-16">
                    
                    {/* Content card with cyber styling */}
                    <div className="relative max-w-2xl overflow-hidden rounded-lg border border-accent-500/30 bg-primary-900/70 p-6 backdrop-blur-md">
                      {/* Animated accent line */}
                      <div className={`absolute left-0 top-0 h-1 bg-accent-500 ${currentSlide === index ? 'animate-slide-in-right' : 'w-0'}`} style={{ width: currentSlide === index ? '100%' : '0%' }} />
                      
                      {/* Tech icon with glow effect */}
                      <div className={`mb-4 inline-block rounded-md bg-primary-800 p-3 text-accent-400 ${getAnimationStyle(index)}`}>
                        {slide.icon}
                        <div className="absolute inset-0 animate-pulse rounded-md bg-accent-500/20" />
                      </div>
                      
                      {/* Headline with digital reveal effect */}
                      <h2 className={`mb-2 text-4xl font-bold text-background-50 ${getAnimationStyle(index)}`} style={{ textShadow: '0 0 10px rgba(0,194,203,0.5)' }}>
                        {slide.caption}
                      </h2>
                      
                      {/* Description with staggered animation */}
                      <p className={`mb-6 max-w-lg text-lg text-background-100 ${getAnimationStyle(index)}`} style={{ animationDelay: '0.3s' }}>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Enhanced slide counter with cybersecurity styling */}
        <div className="absolute right-8 top-4 z-10 flex items-center rounded-md bg-primary-800/70 px-4 py-2 text-sm font-medium text-background-50 backdrop-blur-sm">
          <span className="mr-2 text-accent-400">[</span>
          <span>{(currentSlide + 1).toString().padStart(2, '0')}</span>
          <span className="mx-1 text-neutral-400">/</span>
          <span>{cyberSecuritySlides.length.toString().padStart(2, '0')}</span>
          <span className="ml-2 text-accent-400">]</span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
