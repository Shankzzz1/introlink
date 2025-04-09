import { useState } from 'react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role?: string;
}

const Testimonials = () => {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      quote: "I finally found a platform that respects my pace.",
      author: "Anjali M.",
      role: "Premium User"
    },
    {
      id: 2,
      quote: "The intuitive design made learning effortless. Highly recommended!",
      author: "James T.",
      role: "Student"
    },
    {
      id: 3,
      quote: "This platform transformed how I approach my daily tasks. Game changer!",
      author: "Elena K.",
      role: "Professional"
    }
  ]);

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600">Don't take our word for it. Hear from our satisfied users.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">— {testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
