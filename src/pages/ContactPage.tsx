import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Users } from "lucide-react"; // Ensure these icons exist

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-20 bg-white">
      {/* Contact Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Send Us a Message
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200"
            >
              <h3 className="text-xl font-medium text-green-800">Thank you for your message!</h3>
              <p className="mt-2 text-green-700">
                We've received your inquiry and will get back to you shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Please select</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Service Request">Service Request</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
