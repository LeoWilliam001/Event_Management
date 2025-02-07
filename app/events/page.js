"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ApplyForm from "@/components/applyForm";
import CreateEventForm from "@/components/createEventForm";
import Modal from "@/components/model";
import useAuth from "@/hooks/useAuth";

export default function EventsPage() {
    useAuth(); 

    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [userId, setUserId] = useState('');
    const [appliedEvents, setAppliedEvents] = useState([]);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await axios.get("/api/events");
            setEvents(data);
        }

        async function fetchUserApplications(userId) {
            const { data } = await axios.get(`/api/user/apps?userId=${userId}`);
            const appliedEventIds = data.map(application => application.eventId.toString());
            setAppliedEvents(appliedEventIds);
        }

        fetchEvents();

        // Retrieve userId and guest flag from local storage
        const storedUserId = localStorage.getItem('userId');
        const guestFlag = localStorage.getItem('isGuest');
        setUserId(storedUserId);
        setIsGuest(guestFlag === "true");

        if (storedUserId && guestFlag !== "true") {
            fetchUserApplications(storedUserId);
        }
    }, []);

    const handleApplyClick = (eventId) => {
        if (appliedEvents.includes(eventId)) {
            alert("You have already applied for this event.");
            return;
        }
        setSelectedEventId(eventId);
        setIsFormVisible(true);
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setSelectedEventId(null);
    };

    const handleApplicationSuccess = (eventId) => {
        setAppliedEvents([...appliedEvents, eventId]);
        setEvents(events.map(event => 
            event._id === eventId ? { ...event, attendees: event.attendees + 1 } : event
        ));
    };

    const handleCreateEventClick = () => {
        setIsCreateFormVisible(true);
    };

    const handleCloseCreateForm = () => {
        setIsCreateFormVisible(false);
    };

    const handleEventCreated = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isGuest');
        router.push('/auth/login');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl text-white font-bold mb-4">Events</h1>
            {userId && <p className="mb-4 text-cyan-600">Your User ID: {userId}</p>}
            <button 
                className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event._id} className="p-4 border rounded shadow">
                        <h2 className="text-lg text-white font-semibold">{event.name}</h2>
                        <p className="text-white">{event.description}</p>
                        <p className="text-sm text-green-300">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-sm text-white">Attendees: {event.attendees}</p>
                        {!isGuest && (
                            <>
                                {event.createdBy === userId ? (
                                    <button 
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDeleteEvent(event._id)}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    <button 
                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" 
                                        onClick={() => handleApplyClick(event._id)}
                                        disabled={appliedEvents.includes(event._id)}
                                    >
                                        {appliedEvents.includes(event._id) ? "Applied" : "Apply"}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {!isGuest && (
                <button 
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full"
                    onClick={handleCreateEventClick}
                >
                    + Create Event
                </button>
            )}

            <Modal isVisible={isFormVisible} onClose={handleCloseForm}>
                <ApplyForm eventId={selectedEventId} onClose={handleCloseForm} onApplicationSuccess={handleApplicationSuccess} />
            </Modal>

            <Modal isVisible={isCreateFormVisible} onClose={handleCloseCreateForm}>
                <CreateEventForm onClose={handleCloseCreateForm} onEventCreated={handleEventCreated} />
            </Modal>
        </div>
    );
}