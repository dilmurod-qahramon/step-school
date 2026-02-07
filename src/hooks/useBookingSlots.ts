import { useState, useEffect, useCallback } from 'react';
import type { TimeSlot } from '@/components/booking/TimeSlotTable';
import type { BookingFormData } from '@/components/booking/BookingDialog';

// Google Apps Script Web App URL - Replace with your deployed script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec';

// Spreadsheet ID provided by user
const SPREADSHEET_ID = '1krgPRbY2WPguupYHFUvGa5mxS4tseXKM2h-W6qzkHeQ';

interface UseBookingSlotsProps {
  teacherId: string;
  teacherName: string;
}

export const useBookingSlots = ({ teacherId, teacherName }: UseBookingSlotsProps) => {
  const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch booked slots from Google Sheets via Apps Script
  const fetchBookedSlots = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${APPS_SCRIPT_URL}?action=getBookings&teacherId=${teacherId}&spreadsheetId=${SPREADSHEET_ID}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.bookings)) {
        setBookedSlots(data.bookings.map((booking: any) => ({
          date: booking.date,
          time: booking.time,
          isBooked: true,
          bookedBy: {
            name: booking.name,
            phone: booking.phone,
          },
        })));
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      // Don't show error for initial load - just use empty array
      setBookedSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, [teacherId]);

  // Create a new booking
  const createBooking = async (
    date: string,
    time: string,
    formData: BookingFormData
  ): Promise<boolean> => {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createBooking',
          spreadsheetId: SPREADSHEET_ID,
          teacherId,
          teacherName,
          date,
          time,
          name: formData.fullName,
          phone: formData.phone || '',
          comments: formData.comments || '',
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add the new booking to local state
        setBookedSlots(prev => [
          ...prev,
          {
            date,
            time,
            isBooked: true,
            bookedBy: {
              name: formData.fullName,
              phone: formData.phone,
            },
          },
        ]);
        return true;
      } else {
        throw new Error(data.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  return {
    bookedSlots,
    isLoading,
    error,
    createBooking,
    refetch: fetchBookedSlots,
  };
};
