import { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyForm = ({ eventId, onClose, onApplicationSuccess }) => {
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        userComment: ''
    });

    useEffect(() => {
        // Retrieve userId from local storage
        const userId = localStorage.getItem('userId');
        setFormData((prevData) => ({ ...prevData, userId }));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/events/apply', {
                eventId,
                ...formData
            });
            console.log('Application submitted successfully:', response.data);
            onApplicationSuccess(eventId); // Notify parent component of successful application
            onClose();
        } catch (error) {
            console.error('Error applying for event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="userName"
                placeholder="Name"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <input
                type="email"
                name="userEmail"
                placeholder="Email"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <input
                type="text"
                name="userPhone"
                placeholder="Phone"
                value={formData.userPhone}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <textarea
                name="userComment"
                placeholder="Comment"
                value={formData.userComment}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded-lg"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default ApplyForm;