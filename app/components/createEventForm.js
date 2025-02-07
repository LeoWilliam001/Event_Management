import { useState } from 'react';
import axios from 'axios';

const CreateEventForm = ({ onClose, onEventCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
            const response = await axios.post('/api/events/create', { ...formData, createdBy: userId });
            console.log('Event created successfully:', response.data);
            onEventCreated(response.data.event); // Notify parent component of the new event
            onClose();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <textarea
                name="description"
                placeholder="Event Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                Create Event
            </button>
        </form>
    );
};

export default CreateEventForm;