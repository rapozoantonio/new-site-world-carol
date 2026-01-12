"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WhatsAppWidget() {
  const t = useTranslations("services");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="https://api.whatsapp.com/send?phone=34611200787"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 flex items-center space-x-3 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contacto por WhatsApp"
    >
      {/* Text label - appears on hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-full px-4 py-2 shadow-lg whitespace-nowrap"
      >
        <span className="text-gray-900 font-medium text-sm">
          Contáctame ahora
        </span>
      </motion.div>

      {/* WhatsApp button */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg cursor-pointer"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.81 1.158l-.346.214-3.582.938 1.02-3.696a9.892 9.892 0 01.43-4.285A9.88 9.88 0 0112.06 1.133c5.513 0 10 4.486 10 10s-4.487 10-10 10c-1.687 0-3.282-.403-4.69-1.172l-.346-.2-3.582.938 1.02-3.696a9.884 9.884 0 01-.43-4.285c0-5.514 4.487-10.001 10.001-10.001" />
        </svg>
      </motion.div>
    </motion.a>
  );
}
