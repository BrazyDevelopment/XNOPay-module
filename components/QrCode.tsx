'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
interface QrCodeProps {
  value: string;
}

export function QrCode({ value }: QrCodeProps) {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');

  useEffect(() => {
    // Get the computed style of the root element to resolve CSS variables
    const rootStyle = getComputedStyle(document.documentElement);
    const primaryBg = rootStyle.getPropertyValue('--bg-primary').trim() || '#ffffff';
    const primaryFg = rootStyle.getPropertyValue('--fg-color').trim() || '#000000';

    setBgColor(primaryBg);
    setFgColor(primaryFg);
  }, []);

    return (
      <div className="p-3 bg-white rounded-lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <QRCodeSVG
            value={value}
            size={180}
            bgColor={bgColor}
            fgColor={fgColor}
            level="H"
            includeMargin={false}
            className="rounded-md"
            />
        </motion.div>
      </div>
    )
  }