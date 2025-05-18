'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Share2, MapPin, Mail} from 'lucide-react';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from "react";
import { faLinkedin, faThreads, faTwitter, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-emerald-50">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
      
        <div className="text-center mb-12">
          <h3 className="text-emerald-800 max-w-2xl mx-auto text-2xl font-semibold ">
          Είτε έχετε ερωτήσεις σχετικά με τις υπηρεσίες μας, τον τρόπο χρήσης ή οτιδήποτε άλλο,
           η ομάδα μας είναι πάντα έτοιμη να απαντήσει σε όλες σας τις απορίες.
          </h3>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <section className="w-full md:w-3/5 bg-emerald-100 rounded-xl shadow-lg p-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-3 text-3xl">
                    <Mail style={{ width: '2rem', height: '2rem' }} />            
                </div>
                
                <h3 className="font-semibold text-emerald-800 mb-1">Επικοινώνησε μαζί μας στο</h3>
                <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-gray-700 text-sm" >contactFitly@fitly.com</p> 
                <Copy  style={{ width: '0.8rem', height: '0.8rem' }}  onClick={() => navigator.clipboard.writeText('contactFitly@fitly.com')} />
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-3 text-3xl">
                <Share2 style={{ width: '2rem', height: '2rem' }} />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-1">Social Media</h3>
                <div className="flex gap-3">
                  <a href="https://github.com/Periklas712" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faGithub} className="w-8 h-8" /></a>
                  <a href="https://github.com/FiveSlashNine" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faGithub} className="w-8 h-8" /></a>
                  <a href="https://www.linkedin.com/in/kristi-zefi/" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" /></a>
                  <a href="https://gr.linkedin.com/in/periklis-giannikos-403718252" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" /></a>
                </div>
                <div className="flex gap-6 justify-center">
                  <FontAwesomeIcon className="text-gray-600 hover:text-emerald-700 transition-colors text-xl" icon={faInstagram} />
                  <FontAwesomeIcon className="text-gray-600 hover:text-emerald-700 transition-colors text-xl" icon={faFacebook} />
                  <FontAwesomeIcon className="text-gray-600 hover:text-emerald-700 transition-colors text-xl" icon={faTwitter} />
                  <FontAwesomeIcon className="text-gray-600 hover:text-emerald-700 transition-colors text-xl" icon={faThreads} />
                  </div>
              </div>  
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-3 text-3xl">
                <MapPin style={{ width: '2rem', height: '2rem' }} />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-1">Η Τοποθεσία μας</h3>

                <p className="text-gray-700 text-sm">
                  Πανεπιστήμιο Μακεδονίας<br />
                  Τμήμα Εφαρμοσμένης Πληροφορικής
                </p>
              </div>
            </div>
          </section>
          <section className="w-full md:w-3/5 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center relative">
            <div className="absolute top-4 right-4">
              <Image
                src="/Fitly_check.svg"
                alt="Fitly Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-center text-emerald-800 mb-2">Contact Us</h1>
            <p className="text-center text-gray-600 mb-8">
               Έχετε ερωτήσεις ή σχόλια; Στείλτε μας το μήνυμά σας!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Πληκτρολογήστε το email σας"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Ονοματεπώνυμο</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                     placeholder="Πληκτρολογήστε το όνομά σας"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Τηλέφωνο</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Πληκτρολογήστε το τηλέφωνό σας"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Μήνυμα</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Γράψτε το μήνυμά σας εδώ..."
                  className="w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all resize-vertical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Συνημμένο αρχείο (Προαιρετικό)</Label>
                <Input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
           
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Υποβολή
              </Button>
            </form>
            {submitted && (
              <div className="mt-4 p-4 bg-emerald-50 text-emerald-600 rounded-lg text-center">
                Το μήνυμά σας έχει αποσταλεί επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.
              </div>
            )}
          </section>
        </div>
      </main>
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-emerald-800 text-center mb-8">🗺️ Εδώ είμαστε!</h2>
          <div className="w-full h-[400px] bg-gray-200 rounded-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.068956766116!2d22.957533576410235!3d40.62501694293546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838febd9553d7%3A0xdafb4206c7c961c9!2zzqDOsc69zrXPgM65z4PPhM6uzrzOuc6_IM6czrHOus61zrTOv869zq_Osc-C!5e1!3m2!1sel!2sgr!4v1747518558112!5m2!1sel!2sgr"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

    </div>
  );
}