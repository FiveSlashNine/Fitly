import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    return(<>
     <div className="flex flex-col bg-white">
        <header className="flex justify-between items-center px-8 py-5 shadow-md bg-gradient-to-b from-emerald-50 to-white z-10">
          <div className="flex items-center">
            <Image
               src="/Fitly_Check.svg"
               alt="FITLY Logo"
               width={60}
               height={65}
               className="mr-3"
            />
            <Link href="/" className="text-2xl font-bold text-emerald-700">FITLY</Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/contactPage" className="text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                Επικοινωνία
            </Link>
            <Link href="/signIn" className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-emerald-300 transition-colors">
              Σύνδεση
            </Link>
            <Link href="/signUpUser" className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Εγγραφή
            </Link>
          </nav>
        </header>
      </div>
    </>);
}