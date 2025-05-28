import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ReserveImageSection() {
  const t = useTranslations("ReserveImageSection");
  return (
    <>
      <section className="relative w-full h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/gym.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
        <div className="relative z-10 max-w-2xl ml-12">
          <h2 className="text-white text-sm font-semibold mb-2 tracking-widest">
            {t("subtitle")}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t("title")}
          </h1>
          <p className="text-white text-lg mb-6">{t("description")}</p>
          <Link href="/availableSessions">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded transition">
              {t("button")}
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
