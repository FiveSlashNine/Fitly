import React from "react";
import Image from "next/image";
import {
  Dumbbell,
  Users,
  Heart,
  Sparkles,
  Target,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/Fitly_Check.svg"
          alt="Fitly Logo Background"
          width={800}
          height={800}
          className="opacity-5"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Dumbbell className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Σχετικά με το Fitly
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Συνδέουμε λάτρεις της γυμναστικής με επαγγελματίες γυμναστές και
            γυμναστήρια μέσω μιας καινοτόμας πλατφόρμας κρατήσεων.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                Η Ιστορία μας
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Το Fitly γεννήθηκε από μια απλή παρατήρηση: η εύρεση και η κράτηση
              συνεδριών γυμναστικής πρέπει να είναι τόσο εύκολη όσο η παραγγελία
              παράδοσης φαγητού. Καθώς φοιτητές, παθιασμένοι με τη φυσική
              κατάσταση και την τεχνολογία, παρατηρήσαμε το χάσμα μεταξύ των
              επαγγελματιών γυμναστικής και των πιθανών πελατών και αποφασίσαμε
              να το γεφυρώσουμε.{" "}
            </p>
          </div>

          {/* Our Team Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                Η Ομάδα μας
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Είμαστε φοιτητές του Τμήματος Εφαρμοσμένης Πληροφορικής του
              Πανεπιστημίου Μακεδονίας. Ο συνδυασμός γνώσεων τεχνολογίας και
              επιχειρηματικότητας μας επιτρέπει να δημιουργούμε λύσεις που
              καλύπτουν τις ανάγκες τόσο των επαγγελματιών όσο και των χρηστών.{" "}
            </p>
            <p className="text-gray-600">
              Αυτό που ξεκίνησε ως πανεπιστημιακό έργο θα εξελιχθεί σε μια
              ολοκληρωμένη πλατφόρμα που βοηθά τόσο τους ασκούμενους που
              αναζητούν να βρουν την τέλεια προπόνηση όσο και τους επαγγελματίες
              να αναπτύξουν την επιχείρησή τους.{" "}
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                Οι Αξίες μας
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    Προσβασιμότητα
                  </h3>
                </div>
                <p className="text-gray-600">
                  Η γυμναστική πρέπει να είναι εύκολα προσβάσιμη σε όλους
                  οπουδήπωτε και αν βρίσκονται.
                </p>
              </div>
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    Ευχρηστία
                  </h3>
                </div>
                <p className="text-gray-600">
                  Μια απλή και λειτουργική πλατφόρμα κρατήσεων που απευθύνεται
                  σε όλους τους χρήστες.
                </p>
              </div>
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    Εμπιστοσύνη
                  </h3>
                </div>
                <p className="text-gray-600">
                  Δημιουργούμε μια κοινότητα που βασίζεται στη διαφάνεια, στους
                  επαγγελματίες και στην αξιόπιστη εξυπηρέτηση.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center">
          <div className="bg-emerald-600/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Γίνε μέλος της κοινότητας του Fitly !
            </h2>
            <p className="text-white/90 mb-6">
              Είτε είστε λάτρης της γυμναστικής που αναζητά την επόμενη
              προπόνησή σας είτε επαγγελματίας που θέλει να αναπτύξει την
              επιχείρησή σας, το Fitly είναι εδώ για να σας βοηθήσει να πετύχετε
              τους στόχους σας.{" "}
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Ξεκινήστε Τη Διαδρομή Σας Σήμερα{" "}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
