import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function ReturnHome() {
  return (
    <>
      <div className="flex items-center">
        <Image
          src="/Fitly_Check.svg"
          alt="FITLY Logo"
          width={60}
          height={65}
          className="mr-3"
        />
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          FITLY
        </Link>
      </div>
    </>
  );
}
