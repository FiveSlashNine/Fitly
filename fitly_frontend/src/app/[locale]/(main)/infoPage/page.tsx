import { UserPlus, Search, CalendarCheck } from "lucide-react";
import Arrow from "@/components/ui/Arrow";
import ReserveImageSection from "@/components/ui/ReserveImageSection";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function InfoPage() {
  const t = useTranslations("InfoPage");
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 font-sans">
      <ReserveImageSection />
      <div className="relative w-full bg-gradient-to-b from-white to-emerald-50">
        <section className="w-full py-16 relative z-10">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className=" text-2xl text-emerald-600 font-semibold tracking-widest mb-2 ">
              {t("howFitlyWorks")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-12">
              {t("startToday")}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 flex flex-col items-center">
                <span className="mb-2">
                  <UserPlus className="w-10 h-10 text-emerald-500 mx-auto" />
                </span>
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  {t("step1Title")}
                </h3>
                <p className="text-gray-600">{t("step1Description")}</p>
              </div>

              <Arrow />
              <div className="flex-1 flex flex-col items-center">
                <span className="mb-2">
                  <Search className="w-10 h-10 text-emerald-500 mx-auto" />
                </span>
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  {t("step2Title")}
                </h3>
                <p className="text-gray-600">{t("step2Description")}</p>
              </div>
              <Arrow />
              <div className="flex-1 flex flex-col items-center">
                <span className="mb-2">
                  <CalendarCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                </span>
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  {t("step3Title")}
                </h3>
                <p className="text-gray-600">{t("step3Description")} </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 relative z-10">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-emerald-800 mb-4">
              {t("forOwnersAndProfessionals")}
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
              {t("ownersDescription")}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {t("feature1Title")}
                </h3>
                <p className="text-gray-600">{t("feature1Description")}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {t("feature2Title")}
                </h3>
                <p className="text-gray-600">{t("feature2Description")}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {t("feature3Title")}
                </h3>
                <p className="text-gray-600">{t("feature3Description")} </p>
              </div>
            </div>
            <Link href="/signup    ">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded transition">
                {t("signupButton")}
              </button>
            </Link>
          </div>
        </section>
      </div>
      {/* ...rest of your info page... */}
    </div>
  );
}
