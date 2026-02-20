import { ArrowLeft, MessageCircle, Phone, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Artisan } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContactScreenProps {
  artisan: Artisan;
  onBack: () => void;
  onComplete: () => void;
}

export function ContactScreen({ artisan, onBack, onComplete }: ContactScreenProps) {
  const [contacted, setContacted] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call' | null>(null);

  const handleWhatsApp = () => {
    setContactMethod('whatsapp');
    setContacted(true);
    // Open WhatsApp after a short delay to show confirmation
    setTimeout(() => {
      window.open(`https://wa.me/${artisan.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }, 1500);
  };

  const handleCall = () => {
    setContactMethod('call');
    setContacted(true);
    // Initiate call after a short delay to show confirmation
    setTimeout(() => {
      window.location.href = `tel:${artisan.phone}`;
    }, 1500);
  };

  if (contacted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h2 className="text-gray-900 mb-3">Contact en cours...</h2>
          <p className="text-gray-700 mb-6">
            {contactMethod === 'whatsapp' 
              ? 'Ouverture de WhatsApp...' 
              : 'Lancement de l\'appel...'}
          </p>
          <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={artisan.photo}
                alt={artisan.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="text-left">
                <h3 className="text-gray-900">{artisan.name}</h3>
                <p className="text-gray-600">{artisan.trade}</p>
                <p className="text-gray-700">
                  {contactMethod === 'whatsapp' ? artisan.whatsapp : artisan.phone}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-2xl transition-all active:scale-95"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full inline-flex active:scale-95">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-3">Choisir la méthode de contact</h1>
          <p className="text-gray-600">Comment souhaitez-vous contacter {artisan.name} ?</p>
        </div>

        {/* Artisan Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <div className="flex items-center gap-4 mb-5">
            <ImageWithFallback
              src={artisan.photo}
              alt={artisan.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-gray-900 mb-1">{artisan.name}</h3>
              <p className="text-gray-600 mb-2">{artisan.trade}</p>
              <div className={`inline-flex px-3 py-1 rounded-full ${
                artisan.availability === 'Disponible' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                <p>{artisan.availability}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4">
            <p className="text-blue-900 text-center">
              Réponse rapide garantie • Contact direct
            </p>
          </div>
        </div>

        {/* Contact Options - Large buttons */}
        <div className="space-y-4">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-3xl shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3"
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              <MessageCircle size={32} />
            </div>
            <div>
              <p className="mb-1">Contacter sur WhatsApp</p>
              <p className="text-green-100 opacity-90">{artisan.whatsapp}</p>
            </div>
          </button>

          <button
            onClick={handleCall}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-6 rounded-3xl shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3"
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              <Phone size={32} />
            </div>
            <div>
              <p className="mb-1">Appeler maintenant</p>
              <p className="text-blue-100 opacity-90">{artisan.phone}</p>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <h3 className="text-amber-900 mb-3">Conseils</h3>
          <ul className="space-y-2 text-amber-800">
            <li>✓ Présentez clairement votre besoin</li>
            <li>✓ Demandez un devis détaillé</li>
            <li>✓ Vérifiez la disponibilité</li>
            <li>✓ Confirmez le lieu d&apos;intervention</li>
          </ul>
        </div>
      </div>
    </div>
  );
}