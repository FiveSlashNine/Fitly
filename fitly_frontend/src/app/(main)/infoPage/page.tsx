import Link from 'next/link';
import { UserPlus, Search, CalendarCheck } from 'lucide-react';
import Arrow from '@/components/ui/Arrow';
import ReserveImageSection from '@/components/ui/ReserveImageSection';
export default function InfoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 font-sans">         
            <ReserveImageSection />
        <div className="relative w-full bg-gradient-to-b from-white to-emerald-50">
            <section className="w-full py-16 relative z-10">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className=" text-2xl text-emerald-600 font-semibold tracking-widest mb-2 ">
                            Πώς λειτουργεί το Fitly
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-12">
                        Ξεκίνα σήμερα σε 3 απλά βήματα
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 flex flex-col items-center">
                            <span className="mb-2">
                                <UserPlus className="w-10 h-10 text-emerald-500 mx-auto" />
                            </span>
                            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Δημιουργία λογαριασμού </h3>
                            <p className="text-gray-600">Κάνε εγγραφή σε λίγα δευτερόλεπτα ή συνδέσου με τον υπάρχοντα λογαριασμό σου</p>
                        </div>
                       
                        <Arrow />
                        <div className="flex-1 flex flex-col items-center">
                            <span className="mb-2">
                                <Search className="w-10 h-10 text-emerald-500 mx-auto" />
                            </span>
                            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Αναζήτησε το πρόγραμμα που σου ταιριάζει</h3>
                            <p className="text-gray-600">
                            Ανακάλυψε προγράμματα που προσφέρονται από επαγγελματίες και γυμναστήρια.
                              Αναζήτησε αυτό που σου ταιριάζει, βάσει τοποθεσίας, ημερομηνίας ή τύπου άσκησης.
                            </p>
                        </div>
                        <Arrow />
                        <div className="flex-1 flex flex-col items-center">
                            <span className="mb-2">
                                <CalendarCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                            </span>
                            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Κάνε την κράτησή σου</h3>
                            <p className="text-gray-600">Διάλεξε το πρόγραμμα που σε ενδιαφέρει, κάνε την κράτησή σου άμεσα και ξεκίνα την προπόνησή σου χωρίς καθυστέρηση!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-16 relative z-10">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-emerald-800 mb-4">
                        Για Ιδιοκτήτες Γυμναστηρίων & Επαγγελματίες Fitness
                    </h2>
                    <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                    Το Fitly σας δίνει τη δυνατότητα να δημοσιεύετε τα προγράμματα γυμναστικής σας και να δέχεστε κρατήσεις online.
                     Προσελκύστε νέα μέλη και βελτιώστε τις υπηρεσίες σας με ευκολία.                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                        <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Δημοσίευση Προγραμμάτων & Συνεδριών</h3>
                            <p className="text-gray-600">Δημιουργήστε και δημοσιεύστε τα πρόγραμματα που προσφέρεται με λίγα κλικ.</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Διαχείριση Κρατήσεων & Συνεδριών</h3>
                            <p className="text-gray-600">Από τη δημιουργία μιας συνεδρίας έως την επιβεβαίωση της κράτησης,
                                 το Fitly απλοποιεί κάθε βήμα. Διαχειριστείτε τις συνεδρίες, τις κρατήσεις με ευκολία.</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Στατιστικά </h3>
                            <p className="text-gray-600">Παρακολουθήστε την απόδοση των προγραμμάτων και τις προτιμήσεις των μελών σας μέσω αναλυτικών στατιστικών.</p>
                        </div>
                    </div>
                    <a href="/signup    ">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded transition">
                            Εγγραφή στο Fitly
                        </button>
                    </a>
                </div>
            </section>
            </div>
            {/* ...rest of your info page... */}
        </div>
    );
}