import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, User, CheckCircle } from 'lucide-react';
import TimeSlotTable from '@/components/booking/TimeSlotTable';
import BookingDialog, { BookingFormData } from '@/components/booking/BookingDialog';
import { useBookingSlots } from '@/hooks/useBookingSlots';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BookMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teacherId } = useParams();
  const teacherName = location.state?.teacherName || 'O\'qituvchi';

  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { bookedSlots, isLoading, createBooking } = useBookingSlots({
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
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16">
              <button
                onClick={() => navigate('/')}
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

        <div className="container mx-auto px-4 pt-24 pb-8 max-w-lg">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                So'rovingiz qabul qilindi!
              </h2>
              <p className="text-muted-foreground mb-6">
                {teacherName} bilan uchrashuv so'rovi yuborildi. Tez orada siz bilan bog'lanamiz.
              </p>
              <Button onClick={() => navigate('/')}>
                Bosh sahifaga qaytish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
