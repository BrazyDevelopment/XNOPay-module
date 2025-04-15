'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode } from './QrCode';
import { Timer } from './Timer';
import ThemeSwitcher from './ThemeSwitcher';
import { Copy, Wallet, CheckCircle2, ExternalLink, RefreshCw, Shield, Zap, Globe } from 'lucide-react';
import { PaymentDetails } from '@/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const paymentDetails: PaymentDetails = {
  merchantName: 'Merchant Name',
  orderNumber: '2341992',
  usdAmount: 0.07,
  xnoAmount: 0.01,
  nanoAddress: 'nano_1uzg99fkubsbrzh8r9bis48bgjb47sohwnopofkb1nhtjaq6gou6ku4ia5xk',
};

export default function PaymentScreen() {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const expiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [activeTab, setActiveTab] = useState('qr');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1000 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate payment processing for demo purposes
  useEffect(() => {
    if (Math.random() < 0.3 && paymentStatus === 'pending') {
      const timeout = setTimeout(() => {
        setPaymentStatus('processing');
        
        setTimeout(() => {
          setPaymentStatus('completed');
        }, 2000);
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [paymentStatus]);
  
  const handleCopy = async () => {
    try {
      // Check if Clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(paymentDetails.nanoAddress);
      } else {
        // Fallback: Use a textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = paymentDetails.nanoAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy address. Please select it manually.');
    }
  };

  const handleOpenWallet = () => {
    const url = `nano:${paymentDetails.nanoAddress}?amount=${BigInt(Math.round(paymentDetails.xnoAmount * 1e30)).toString()}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl p-6"
    >
      <Card className="backdrop-blur-md bg-base-300 shadow-3xl overflow-hidden border border-primary/20 shadow-black/30 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <CardHeader className="relative pb-2">
          <div className="absolute top-2 right-2">
            <ThemeSwitcher />
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-normal text-3xl">Ӿ</span>
              </div>
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600">
                ӾNOPay
              </CardTitle>
              <CardDescription className="">
                Instant Nano Payments
              </CardDescription>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <Badge variant="outline" className="border border-primary text-primary">
              {paymentDetails.merchantName}
            </Badge>
            <Badge variant="outline" className="border border-primary text-primary">
              Order #{paymentDetails.orderNumber}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <AnimatePresence mode="wait">
            {paymentStatus === 'completed' ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-8 flex flex-col items-center justify-center space-y-4"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center"
                >
                  <CheckCircle2 size={40} className="" />
                </motion.div>
                <h2 className="text-2xl font-bold">Payment Complete!</h2>
                <p className=" text-center">
                  Your transaction has been successfully processed.
                </p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-primary to-accent hover:from-cyan-600 hover:to-blue-700 text-neutral"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="mr-2 h-4 w-4 font-bold" /> New Payment
                </Button>
              </motion.div>
            ) : paymentStatus === 'processing' ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 flex flex-col items-center justify-center space-y-4"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-accent flex items-center justify-center"
                >
                  <RefreshCw size={32} className="" />
                </motion.div>
                <h2 className="text-xl font-bold">Processing Payment</h2>
                <p className="text-center">
                  We're confirming your transaction on the Nano network...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6 text-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="text-3xl font-bold mb-1">
                      ${paymentDetails.usdAmount.toFixed(2)} USD
                    </div>
                    <div className="text-sm">
                      ({paymentDetails.xnoAmount.toFixed(8)} XNO)
                    </div>
                    {/* <motion.div 
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-accent flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Zap size={12} className="text-neutral-content" />
                    </motion.div> */}
                  </motion.div>
                </div>
                
                <Tabs defaultValue="qr" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-base-300 border border-neutral/10">
                    <TabsTrigger value="qr" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-600/80">
                      QR Code
                    </TabsTrigger>
                    <TabsTrigger value="address" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-600/80">
                      Address
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="qr" className="mt-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-2 rounded-xl bg-gradient-to-r from-primary to-accent shadow-md shadow-primary/20"
                        >
                          <QrCode
                            value={`nano:${paymentDetails.nanoAddress}?amount=${BigInt(Math.round(paymentDetails.xnoAmount * 1e30)).toString()}`}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary to-accent rounded-full p-2 cursor-pointer shadow-md"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleOpenWallet}
                        >
                          <Wallet size={20} className="" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="address" className="mt-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/40 to-accent/40 border border-neutral/40">
                          <p className="text-xs text-center break-all font-mono">
                            {paymentDetails.nanoAddress}
                          </p>
                        </div>
                        
                        <motion.div 
                          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary to-accent rounded-full p-2 cursor-pointer shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <CheckCircle2 size={20} className="" />
                          ) : (
                            <Copy size={20} className="" />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 flex justify-center">
                  <Timer timeLeft={timeLeft} />
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="border border-primary hover:border-0 text-primary hover:text-neutral-content hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-700"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" /> Copy Address
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    className="bg-gradient-to-r from-primary to-accent hover:from-cyan-600 hover:to-blue-700"
                    onClick={handleOpenWallet}
                  >
                    <Wallet className="mr-2 h-4 w-4" /> Open Wallet
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Shield size={14} className="text-primary" />
              <span className="text-xs">Secure</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Globe size={14} className="text-primary" />
              <span className="text-xs">Global</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Zap size={14} className="text-primary" />
              <span className="text-xs">Instant</span>
            </div>
          </div>
          
          <div className="text-center w-full">
            <p className="text-xs">
              Powered by{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600">
                ӾNOPay
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
