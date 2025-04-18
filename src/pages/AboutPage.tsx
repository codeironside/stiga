import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  
  const section1InView = useInView(section1Ref, { once: false, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: false, amount: 0.3 });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67]
      }
    })
  };
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const connections = Array(5).fill(0).map((_, i) => ({
    id: i,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100
  }));

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background-50 text-gray-800 min-h-screen">
      {/* Animated background particles */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-20">
          {connections.map((connection) => (
            <svg key={connection.id} className="absolute w-full h-full">
              <motion.line
                x1={`${connection.x1}%`}
                y1={`${connection.y1}%`}
                x2={`${connection.x2}%`}
                y2={`${connection.y2}%`}
                stroke="rgba(0, 51, 102, 0.2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
            </svg>
          ))}
        </div>
      </motion.div>
      
      {/* Hero section with floating animation */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut"
            },
            opacity: { duration: 1 }
          }}
          className="text-center mb-24"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-display font-extrabold leading-none text-primary-700"
          >
            About Striga
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-24 bg-primary-500 mx-auto mt-8 mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 font-light"
          >
            At Striga, we specialize in providing secure and innovative solutions for industries like IT, security, construction, and real estate. Through strategic relationships, partnerships, and targeted sponsorships, we position ourselves as a leader in the space of technology risk mitigation and secure solutions.
          </motion.p>
        </motion.div>
        
        {/* Split layout with animated cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          {/* Left section - Networking */}
          <motion.div 
            ref={section1Ref}
            className="relative"
            style={{
              rotateY: section1InView ? mousePosition.x * 5 : 0,
              rotateX: section1InView ? -mousePosition.y * 5 : 0,
              perspective: "1000px",
            }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.div
              className="bg-white shadow-xl p-10 rounded-2xl border border-background-200"
              initial="hidden"
              animate={section1InView ? "visible" : "hidden"}
              variants={cardVariants}
              custom={0}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 51, 102, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-start">
                <motion.div 
                  className="mr-6 p-4 bg-primary-50 rounded-full mb-6 md:mb-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </motion.div>
                <div>
                  <motion.h3
                    className="text-3xl font-bold text-primary-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Networking & Relationship Building
                  </motion.h3>
                  <motion.p 
                    className="mt-4 text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={section1InView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Networking is at the heart of our strategy. We join industry-specific groups in IT, security, construction, and real estate sectors, establishing credibility through participation in events.
                  </motion.p>
                </div>
              </div>

              {/* Animated features that slide in */}
              <div className="mt-10 space-y-6">
                {["Industry-Specific Networking", "VIP Events", "Leveraging Our Network"].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: 0.6 + (i * 0.2) }}
                    className="bg-background-100 p-4 rounded-lg border-l-4 border-primary-500"
                  >
                    <h4 className="text-xl font-semibold text-primary-700">{item}</h4>
                    <p className="mt-2 text-gray-600">
                      {i === 0 && "We actively engage with local chambers of commerce and other industry leaders, forming connections with influential businesses."}
                      {i === 1 && "We host exclusive dinners and meetups for executives and government officials, where we present Striga's value."}
                      {i === 2 && "Using our connections, we engage with key individuals that help position Striga as a trusted provider of innovative solutions."}
                    </p >
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right section - Partnerships */}
          <motion.div 
            ref={section2Ref}
            className="relative"
            style={{
              rotateY: section2InView ? mousePosition.x * 5 : 0,
              rotateX: section2InView ? -mousePosition.y * 5 : 0,
              perspective: "1000px",
            }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.div
              className="bg-white shadow-xl p-10 rounded-2xl border border-background-200"
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
              variants={cardVariants}
              custom={1}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 51, 102, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-start">
                <motion.div 
                  className="mr-6 p-4 bg-primary-50 rounded-full mb-6 md:mb-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14v8m0-8l-9 5M12 22l9-5"
                    />
                  </svg>
                </motion.div>
                <div>
                  <motion.h3
                    className="text-3xl font-bold text-primary-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={section2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Targeted Sponsorships & Partnerships
                  </motion.h3>
                  <motion.p
                    className="mt-4 text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={section2InView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Our company thrives on strategic partnerships and sponsorships. Through these carefully selected relationships, we increase our exposure and amplify Striga's role as an industry leader in secure, innovative solutions.
                  </motion.p>
                </div>
              </div>
              
              {/* Partnership features with floating animation */}
              <motion.div 
                className="mt-10 relative p-6 bg-primary-50 rounded-xl overflow-hidden"
                whileHover={{
                  boxShadow: "0 0 30px rgba(0, 51, 102, 0.15)"
                }}
              >
                <motion.div
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary-100 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.2, 0.3] 
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.h4 
                  className="text-2xl font-bold text-primary-700 mb-4"
                  initial={{ opacity: 0 }}
                  animate={section2InView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Our Partnership Approach
                </motion.h4>
                
                <div className="space-y-4">
                  {["Strategic Alliances", "Technology Partnerships", "Community Engagement"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 + (i * 0.2) }}
                      className="flex items-center"
                    >
                      <motion.div 
                        className="h-2 w-2 bg-primary-700 rounded-full mr-3"
                        animate={{ 
                          scale: [1, 1.3, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.5
                        }}
                      />
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom animated wave */}
      <div className="relative h-32 mt-20">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            fill="#002B55"
            d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,234.7C672,235,768,213,864,213.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section >
  );
};

export default AboutPage;