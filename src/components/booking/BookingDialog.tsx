import { useState } from 'react';
import { format, parse } from 'date-fns';
import { uz } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  selectedDate: string;
  selectedTime: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isSubmitting: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  comments: string;
}

const BookingDialog = ({
  isOpen,
  onClose,
  teacherName,
  selectedDate,
  selectedTime,
  onSubmit,
  isSubmitting,
}: BookingDialogProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    comments: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Iltimos, to\'liq ismingizni kiriting');
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ fullName: '', phone: '', comments: '' });
    } catch (err) {
      setError('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  const formattedDate = selectedDate 
    ? format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy, EEEE', { locale: uz })
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Uchrashuv belgilash</DialogTitle>
          <DialogDescription>
            {teacherName} bilan {formattedDate} kuni soat {selectedTime} da uchrashuv
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">To'liq ism *</Label>
            <Input
              id="fullName"
              placeholder="Ismingizni kiriting"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon raqam (ixtiyoriy)</Label>
            <Input
              id="phone"
              placeholder="+998 90 123 45 67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Izoh (ixtiyoriy)</Label>
            <Textarea
              id="comments"
              placeholder="Qo'shimcha ma'lumot..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
