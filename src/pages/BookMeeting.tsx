import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import TimeSlotTable from '@/components/booking/TimeSlotTable';
import BookingDialog, { BookingFormData } from '@/components/booking/BookingDialog';
import { useBookingSlots } from '@/hooks/useBookingSlots';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const BookMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teacherId } = useParams();
  const teacherName = location.state?.teacherName || 'O\'qituvchi';

  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { bookedSlots, isLoading, createBooking, refetch } = useBookingSlots({
    teacherId: teacherId || '',
    teacherName,
  });

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    try {
      await createBooking(selectedSlot.date, selectedSlot.time, formData);
      setIsDialogOpen(false);
      setSelectedSlot(null);
      toast.success('Uchrashuv muvaffaqiyatli band qilindi!');
      // Refetch to update the UI with the new booking
      await refetch();
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/support-teachers')}
              className="text-primary-foreground mr-4 p-2 hover:bg-primary/90 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-primary-foreground">
              Uchrashuv belgilash
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Teacher Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{teacherName}</h2>
                <p className="text-muted-foreground">Support o'qituvchi</p>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Qulay vaqtni tanlang. Tanlangan vaqtda biz siz bilan bog'lanamiz.
              </p>
            </div>

            {/* Time Slot Table */}
            <TimeSlotTable
              teacherId={teacherId || ''}
              teacherName={teacherName}
              bookedSlots={bookedSlots}
              onSlotSelect={handleSlotSelect}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Booking Dialog */}
      <BookingDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        teacherName={teacherName}
        selectedDate={selectedSlot?.date || ''}
        selectedTime={selectedSlot?.time || ''}
        onSubmit={handleBookingSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BookMeeting;
