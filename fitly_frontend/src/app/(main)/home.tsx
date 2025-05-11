"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { sessionTypes } from "../types/session";

//ΦΟΡΤΩΝΩ ΔΥΝΑΜΙΚΑ ΤΟΝ ΧΑΡΤΗ ΑΠΟ ΤΟ COMPONENTS/ClientMap
const DynamicMap = dynamic(() => import("../../components/ClientMap"), {
  ssr: false,
  loading: () => <p>Φόρτωση χάρτη...</p>,
});

//ΤΥΠΟΣ ΓΙΑ ΤΗΣ ΠΟΛΕΙΣ
interface City {
  name: string;
  position: [number, number]; //ΣΥΝΤΕΤΑΓΜΕΝΕΣ
}

//HARDCODED ΑΛΛΑ ΜΠΟΡΕΙ ΝΑ ΠΡΟΣΘΕΟΣΥΜΕ ΚΑΙ ΑΛΛΕΣ
const cities: City[] = [
  { name: "Αθήνα", position: [37.9838, 23.7275] },
  { name: "Θεσσαλονίκη", position: [40.6401, 22.9444] },
];

export default function Home() {
  const [location, setLocation] = useState(""); //ΤΟΠΟΘΕΣΙΑ
  const [sessionType, setSessionType] = useState(""); //ΤΥΠΟΣ ΓΥΜΝΑΣΤΙΚΗΣ
  const [locationError, setLocationError] = useState(false);
  const router = useRouter();

  //ΣΥΝΑΡΤΗΣΗ ΓΙΑ ΤΟ ΚΟΥΜΠΟ ΑΝΑΖΗΤΗΣΗ ΠΡΩΤΑ ΕΛΕΓΧΕΙ ΑΝ ΕΧΕΙ ΓΡΑΨΕΙ ΣΤΟ ΠΕΔΙΟ LOCATION. ΑΝ ΝΑΙ ΠΑΙΡΝΕΙ
  // ΤΟ LOCATION ΚΑΙ ΤΟ TYPE ΚΑΙ ΤΟ ΠΕΡΝΑΕΙ ΣΤΗΝ ΣΕΛΙΔΑ
  const handleSearch = () => {
    if (!location.trim()) {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    if (sessionType) {
      //ΣΤΕΛΝΩ ΣΤΗΝ AVAILABLE SESSIONS ΚΑΙ ΤΟ LOCATION ΚΑΙ ΤΟΝ ΤΥΠΟΣ ΩΣΤΕ ΜΕΤΑ ΝΑ ΚΑΝΕΙ SEARCH ΚΑΙ ΜΕ ΤΑ ΔΥΟ
      router.push(
        `/availableSessions?location=${encodeURIComponent(
          location
        )}&type=${encodeURIComponent(sessionType)}`
      );
    } else {
      //ΑΝ ΧΡΗΣΤΗΣ ΔΕΝ ΕΠΙΛΕΞΕΙ ΤΥΠΟ ΓΥΜΝΑΣΤΙΚΗΣ ΣΤΕΛΝΕΙ ΜΟΝΟ ΤΟ LOCATION ΩΣΤΕ ΜΕΤΑ ΝΑ ΚΑΝΕΙ ΤΟ SEARCH ΜΟΝΟ ΓΙΑ ΤΟ LOCATION
      router.push(
        `/availableSessions?location=${encodeURIComponent(location)}`
      );
    }
  };

  //ΣΥΝΑΡΤΗΣΗ ΕΠΙΛΟΓΗΣ ΠΟΛΗΣ ΣΤΟΝ ΧΑΡΤΗ
  const handleCitySelect = (cityName: string) => {
    setLocation(cityName);
    setLocationError(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MAIN CONTENT */}
      <main className="flex-grow pt-[120px] pb-16 px-8 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-2 text-emerald-800 text-center">
              Ανακάλυψε Το Ιδανικό Πρόγραμμα Γυμναστικής
            </h2>
            <p className="text-gray-600 mb-8 text-lg text-center">
              Αμέτρητα προγράμματα όπου και να βρίσκεσαι!
            </p>

            <div className="space-y-5">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-4 text-gray-400 w-4 h-4 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Τοποθεσία"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (e.target.value) setLocationError(false);
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocation("");
                      setLocationError(false);
                    }}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    &times;
                  </button>
                )}
                {locationError && (
                  <p className="text-sm text-red-500 mt-2 ml-1">
                    Παρακαλώ εισάγετε τοποθεσία.
                  </p>
                )}
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-4 text-gray-400 w-4 h-4 pointer-events-none"
                />
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full appearance-none pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all"
                >
                  <option value="">Είδος</option>
                  {sessionTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="w-full p-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-base transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                Αναζήτηση
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 rounded-lg shadow-md overflow-hidden h-[400px] relative">
            {/* Περνάμε τα απαραίτητα props στο DynamicMap */}
            <DynamicMap cities={cities} onCitySelect={handleCitySelect} />
          </div>
        </div>
      </main>

      {/* SERVICES SECTION */}
      <section className="py-12 px-8 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          {/* Top banner */}
          <div className="border border-emerald-200 rounded-lg p-6 mb-8 bg-white shadow-sm">
            <h3 className="text-lg font-medium text-emerald-700 mb-2">
              Υπηρεσίες μας
            </h3>
            <p className="text-gray-600">
              Ανακάλυψε τη λύση που ταιριάζει στις ανάγκες σου με λίγα μόνο
              κλικ! Είτε αναζητάς χώρο για να γυμναστείς είτε προσφέρεις τα δικά
              σου προγράμματα ως επαγγελματίας ή επιχείρηση, εμείς έχουμε τη
              σωστή επιλογή για σένα. Από προγράμματα για αρχάριους μέχρι
              προχωρημένους, έχουμε κάτι για όλους! Απλά διάλεξε την περιοχή και
              το πρόγραμμα που σου ταιριάζει και ξεκίνα την προπόνησή σου
              σήμερα!
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-emerald-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 transform hover:scale-[1.01] animate-fadeIn delay-100">
              <h3 className="text-lg font-medium mb-3 text-emerald-800">
                Αναζήτηση Προγραμμάτων Γυμναστικής Για Αθλούμενους
              </h3>
              <p className="text-gray-600 mb-6">
                Αγαπάς τη γυμναστική ή θέλεις να δοκιμάσεις νέα προγράμματα; Ή
                μήπως αναζητάς έναν νέο χώρο για την προπόνησή σου; Είμαστε εδώ
                για να σε βοηθήσουμε! Με μια απλή αναζήτηση, βρες το πρόγραμμα ή
                το γυμναστήριο που σου ταιριάζει και κάνε την κράτησή σου εύκολα
                και γρήγορα!
              </p>
              <Link
                href="/auth/signup"
                className="px-4 py-2 border border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium"
              >
                Εγγραφή
              </Link>
            </div>

            <div className="border border-emerald-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 transform hover:scale-[1.01] animate-fadeIn delay-200">
              <h3 className="text-lg font-medium mb-3 text-emerald-800">
                Παροχή Προγραμμάτων Γυμναστικής
              </h3>
              <p className="text-gray-600 mb-6">
                Είσαι ιδιοκτήτης γυμναστηρίου ή επαγγελματίας και θέλεις να
                προωθήσεις τον χώρο σου ή τα προγράμματα γυμναστικής σε
                ασκούμενους; Αν ναι, το FITLY είναι εδώ για σένα! Στην πλατφόρμα
                μας, μπορείς να δημιουργήσεις και να προωθήσεις τα προγράμματά
                σου, ενώ εμείς αναλαμβάνουμε όλη τη δουλειά για σένα.
              </p>
              <Link
                href="/registerGym"
                className="px-4 py-2 border border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium"
              >
                Εγγραφή
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
