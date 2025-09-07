import React from 'react';

const testimonialsData = [
    {
        name: "Client One",
        feedback: "This professional exceeded my expectations! Highly recommend.",
        role: "CEO, Company A"
    },
    {
        name: "Client Two",
        feedback: "A fantastic experience from start to finish. Will work together again!",
        role: "Manager, Company B"
    },
    {
        name: "Client Three",
        feedback: "Incredible attention to detail and creativity. Truly a pleasure to work with.",
        role: "Director, Company C"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="bg-rose-pine-overlay p-8 text-rose-pine-text">
            <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="bg-rose-pine-surface text-rose-pine-text p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <p className="italic text-rose-pine-subtle">"{testimonial.feedback}"</p>
                        <h3 className="font-semibold mt-4 text-rose-pine-iris">{testimonial.name}</h3>
                        <p className="text-sm text-rose-pine-muted">{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;