import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name) {
            formErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.message) {
            formErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission (e.g., send data to an API)
            console.log('Form submitted:', formData);
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    };

    return (
        <section className="bg-rose-pine-surface p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-rose-pine-text mb-4">Contact Me</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-rose-pine-text" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-rose-pine-overlay text-rose-pine-text"
                        required
                    />
                    {errors.name && <p className="text-rose-pine-love">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-rose-pine-text" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-rose-pine-overlay text-rose-pine-text"
                        required
                    />
                    {errors.email && <p className="text-rose-pine-love">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-rose-pine-text" htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-rose-pine-overlay text-rose-pine-text"
                        required
                    />
                    {errors.message && <p className="text-rose-pine-love">{errors.message}</p>}
                </div>
                <button type="submit" className="bg-rose-pine-iris text-rose-pine-base font-bold py-2 px-4 rounded-md hover:bg-rose-pine-rose transition duration-300">
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Contact;