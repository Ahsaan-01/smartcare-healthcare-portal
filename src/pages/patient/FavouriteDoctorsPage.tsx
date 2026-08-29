import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Trash2 } from 'lucide-react';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { MOCK_DOCTORS } from '../../data/mockDoctors';
import { toast } from '../../store/useToastStore';

export const FavouriteDoctorsPage: React.FC = () => {
  const { favouriteDoctorIds, clearFavourites } = useFavouritesStore();

  const savedDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doc) => favouriteDoctorIds.includes(doc.id));
  }, [favouriteDoctorIds]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved doctors?')) {
      clearFavourites();
      toast.info('All saved doctors have been removed.');
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Patient Dashboard', to: '/patient/dashboard' },
          { label: 'Saved Doctors' }
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>Saved Doctors</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quickly access and book appointments with your bookmarked Pakistani medical specialists.
          </p>
        </div>

        {savedDoctors.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
              onClick={handleClearAll}
            >
              Clear All Saved
            </Button>
            <Link to="/find-doctors">
              <Button variant="primary" size="sm" leftIcon={<Search className="w-3.5 h-3.5" />}>
                Find More Doctors
              </Button>
            </Link>
          </div>
        )}
      </div>

      {savedDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-rose-300" />}
          title="No Saved Doctors Yet"
          description="You haven't added any doctors to your favourites list. Browse our verified specialists in Karachi, Lahore, and Islamabad to bookmark them for easy access."
          actionLabel="Discover Doctors Now"
          onAction={() => (window.location.href = '/find-doctors')}
        />
      )}
    </div>
  );
};
