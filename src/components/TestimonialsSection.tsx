import React from 'react';

const testimonials = [
  {
    content: "Working with ACME Inc. transformed our business. Their team delivered a solution that exceeded our expectations and helped us increase revenue by 40% in the first year.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The team at ACME Inc. is exceptional. They took the time to understand our unique challenges and delivered a custom solution that perfectly addressed our needs.",
    author: "Mark Wilson",
    role: "CTO, GrowthLabs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "We've worked with several agencies before, but ACME Inc. stands out for their professionalism, expertise, and commitment to our success.",
    author: "Emily Chen",
    role: "Marketing Director, Innovate Inc.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>

            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-neutral sm:text-4xl">

            What Our Clients Say
          </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral lg:mx-auto">

            Don't just take our word for it — hear from some of our satisfied clients.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg text-neutral">{testimonial.content}</p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.author} />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-neutral">{testimonial.author}</div>
                  <div className="text-sm text-primary">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
