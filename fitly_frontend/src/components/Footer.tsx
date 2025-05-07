import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faDumbbell, faInfo, faPersonRunning, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
    return (
<>
{/* FOOTER */}
 <footer className="py-8 px-6 bg-gradient-to-b from-emerald-50 to-white">
 <div className="max-w-6xl mx-auto">
 <div className="h-0.5 bg-gray-200 my-4"></div>
   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
     {/* ΑΘΛΟΥΜΕΝΟΣ */}
     <div>
       <h3  className="font-medium text-lg mb-4 text-emerald-800"><FontAwesomeIcon icon={faPersonRunning} className="w-8 h-8"/>Αθλούμενος</h3>
       <ul className="space-y-3">
         <li><Link href="/infoPage" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Πως Λειτουργεί
             </Link>
         </li>
         <li><Link href="/signin" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Σύνδεση Αθλούμενου
             </Link></li>
         <li><Link href="/signUpUser" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Εγγραφή Αθλούμενου
             </Link></li>
       </ul>
     </div>

     {/* ΓΥΜΝΑΣΤΗΡΙΟ*/}
     <div>
       <h3 className="font-medium text-lg mb-4 text-emerald-800"> <FontAwesomeIcon icon={faDumbbell} className="w-8 h-8" /> Γυμναστήριο</h3>
       <ul className="space-y-3">
         <li><Link href="/infoPage" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Πως Λειτουργεί
             </Link></li>
         <li><Link href="/signin" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Σύνδεση Γυμναστηρίου
             </Link></li>
         <li><Link href="/signUpGym" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Εγγραφή Γυμναστηρίου
             </Link></li>
       </ul>
     </div>

     {/* ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ */}
     <div>
       <h3 className="font-medium text-lg mb-4 text-emerald-800"><FontAwesomeIcon icon={faInfo} className="w-8 h-8" /> Σχετικά με εμάς</h3>
       <ul className="space-y-3">
         <li><Link href="/aboutPage" className="text-gray-600 hover:text-emerald-700 transition-colors">
                  Τι προσφέρουμε
             </Link>
         </li>
             <li><Link href="/infoPage" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Πως Λειτουργεί
             </Link>
         </li>
             <li><Link href="/contactPage" className="text-gray-600 hover:text-emerald-700 transition-colors">
                 Επικοινωνία
             </Link>
         </li>
       </ul>
     </div>

     {/* SOCIAL MEDIA */}
     <div>
       <h3 className="font-medium text-lg mb-4 text-emerald-800"> <FontAwesomeIcon icon={faShareNodes} className="w-8 h-8" /> Follow us</h3>
       <div className="flex gap-6">
         <a href="https://github.com/Periklas712" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faGithub} className="w-8 h-8" /></a>
         <a href="https://github.com/FiveSlashNine" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faGithub} className="w-8 h-8" /></a>
         <a href="https://www.linkedin.com/in/kristi-zefi/" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" /></a>
         <a href="https://gr.linkedin.com/in/periklis-giannikos-403718252" className="text-gray-600 hover:text-emerald-700 transition-colors text-xl"><FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" /></a>
       </div>
     </div>
   </div>
   <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
     <p className="text-emerald-800 text-center" ><FontAwesomeIcon icon={faCopyright} className="w-8 h-8" />2025 FITLY. All rights reserved.</p>
   </div>
 </div>
</footer></>);
}