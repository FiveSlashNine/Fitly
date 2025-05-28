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
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

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
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                {t("storyTitle")}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{t("storyContent")}</p>
          </div>

          {/* Our Team Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                {t("teamTitle")}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{t("teamContent1")}</p>
            <p className="text-gray-600">{t("teamContent2")}</p>
          </div>
        </div>

        {/* Our Values Section */}
        <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">
                {t("valuesTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    {t("value1Title")}
                  </h3>
                </div>
                <p className="text-gray-600">{t("value1Content")}</p>
              </div>
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    {t("value2Title")}
                  </h3>
                </div>
                <p className="text-gray-600">{t("value2Content")}</p>
              </div>
              <div className="bg-emerald-50/90 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    {t("value3Title")}
                  </h3>
                </div>
                <p className="text-gray-600">{t("value3Content")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center">
          <div className="bg-emerald-600/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/90 mb-6">{t("ctaDescription")}</p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              {t("ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
