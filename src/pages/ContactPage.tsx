import { useState, useEffect } from "react";
import { Send, MapPin, Mail, Phone, Building, Users } from "lucide-react";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible on component mount with a delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Setup smooth scrolling for all anchor links
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

    // Setup intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(elem => {
      observer.observe(elem);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <style jsx>{`
        .animate-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .slide-in {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .bounce {
          animation: bounce 1s ease infinite;
          animation-delay: 1s;
        }
        
        .input-focus-effect:focus-within {
          transition: all 0.3s ease;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className={`container mx-auto px-4 max-w-4xl transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have questions or want to work together? Fill out the form below and our team will respond promptly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700">
          {formSubmitted ? (
            <div className="p-8 bg-green-50 text-center scale-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-green-800 mb-2">Thank you for reaching out!</h3>
              <p className="text-green-700 mb-6">
                We've received your message and will contact you shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 transform"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="md:flex">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 md:w-1/3 p-8 text-white slide-in">
                <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start animate-on-scroll stagger-1 opacity-0 transform translate-x-4">
                    <MapPin className="w-6 h-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Our Location</h4>
                      <p className="text-primary-100">123 Business Avenue, Suite 500, City, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start animate-on-scroll stagger-2 opacity-0 transform translate-x-4">
                    <Mail className="w-6 h-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <p className="text-primary-100">contact@yourcompany.com</p>
                    </div>
                  </div>
                  <div className="flex items-start animate-on-scroll stagger-3 opacity-0 transform translate-x-4">
                    <Phone className="w-6 h-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <p className="text-primary-100">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8 slide-in-right">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative animate-on-scroll stagger-1 opacity-0">
                      <label htmlFor="name" className="text-sm font-medium text-neutral-700 mb-1 block">
                        Full Name *
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden input-focus-effect transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 hover:border-primary-400">
                        <span className="px-3 text-gray-400">
                          <Users size={18} />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full py-3 pl-1 pr-4 border-0 focus:ring-0 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="relative animate-on-scroll stagger-2 opacity-0">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-700 mb-1 block">
                        Email Address *
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden input-focus-effect transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 hover:border-primary-400">
                        <span className="px-3 text-gray-400">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full py-3 pl-1 pr-4 border-0 focus:ring-0 transition-all"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="relative animate-on-scroll stagger-3 opacity-0">
                      <label htmlFor="phone" className="text-sm font-medium text-neutral-700 mb-1 block">
                        Phone Number
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden input-focus-effect transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 hover:border-primary-400">
                        <span className="px-3 text-gray-400">
                          <Phone size={18} />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full py-3 pl-1 pr-4 border-0 focus:ring-0 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="relative animate-on-scroll stagger-4 opacity-0">
                      <label htmlFor="company" className="text-sm font-medium text-neutral-700 mb-1 block">
                        Company
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden input-focus-effect transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 hover:border-primary-400">
                        <span className="px-3 text-gray-400">
                          <Building size={18} />
                        </span>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="block w-full py-3 pl-1 pr-4 border-0 focus:ring-0 transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="animate-on-scroll stagger-1 opacity-0">
                    <label htmlFor="subject" className="text-sm font-medium text-neutral-700 mb-1 block">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full py-3 px-4 border border-gray-300 rounded-lg input-focus-effect transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-400"
                    >
                      <option value="">Please select</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Request">Service Request</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Support">Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="animate-on-scroll stagger-2 opacity-0">
                    <label htmlFor="message" className="text-sm font-medium text-neutral-700 mb-1 block">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="block w-full py-3 px-4 border border-gray-300 rounded-lg input-focus-effect transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-400"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <div className="animate-on-scroll stagger-3 opacity-0">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center transform hover:translate-y-1 hover:scale-102"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}