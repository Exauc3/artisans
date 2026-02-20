import { ArrowLeft, MessageCircle, Phone, User, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { ClientRequest } from '../types';
import { clientRequests as initialRequests } from '../data/mockData';

interface ClientRequestsScreenProps {
  onBack: () => void;
}

export function ClientRequestsScreen({ onBack }: ClientRequestsScreenProps) {
  const [requests, setRequests] = useState<ClientRequest[]>(
    initialRequests.map((req, index) => ({
      ...req,
      // Add time field for display
      time: index === 0 ? '14:30' : index === 1 ? '16:15' : '11:20'
    }))
  );

  const [selectedRequest, setSelectedRequest] = useState<(ClientRequest & { time?: string }) | null>(null);

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMarkContacted = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'viewed' as const } : r
    ));
    setSelectedRequest(null);
  };

  const newCount = requests.filter(r => r.status === 'new').length;

  if (selectedRequest) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
          <button 
            onClick={() => setSelectedRequest(null)} 
            className="p-3 hover:bg-gray-100 rounded-full active:scale-95"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Detail Content */}
        <div className="px-6 py-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <User size={28} className="text-blue-700" />
                </div>
                <div>
                  <h2 className="text-gray-900 mb-1">{selectedRequest.clientName}</h2>
                  <p className="text-gray-600">{selectedRequest.clientPhone}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full ${
                selectedRequest.status === 'new' 
                  ? 'bg-amber-100 text-amber-700'
                  : selectedRequest.status === 'viewed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <p>
                  {selectedRequest.status === 'new' 
                    ? 'Nouveau' 
                    : selectedRequest.status === 'viewed'
                    ? 'Vu'
                    : 'Répondu'}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 mb-1">Service demandé</p>
                <p className="text-gray-900">{selectedRequest.service}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Localisation</p>
                <p className="text-gray-900">{selectedRequest.location}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Urgence</p>
                <p className="text-gray-900">{selectedRequest.urgency}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Budget</p>
                <p className="text-gray-900">{selectedRequest.budget}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Date</p>
                <p className="text-gray-900">{selectedRequest.date} {selectedRequest.time ? `à ${selectedRequest.time}` : ''}</p>
              </div>
              {selectedRequest.description && (
                <div>
                  <p className="text-gray-600 mb-2">Message du client</p>
                  <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4">
                    <p className="text-gray-900 leading-relaxed">{selectedRequest.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Actions */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleWhatsApp(selectedRequest.clientPhone)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} />
              Contacter sur WhatsApp
            </button>

            <button
              onClick={() => handleCall(selectedRequest.clientPhone)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Phone size={24} />
              Appeler le client
            </button>
          </div>

          {selectedRequest.status === 'new' && (
            <button
              onClick={() => handleMarkContacted(selectedRequest.id)}
              className="w-full bg-white border-2 border-green-300 text-green-700 py-4 rounded-2xl hover:bg-green-50 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <CheckCircle size={20} />
              Marquer comme vu
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full active:scale-95">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-gray-900">Demandes clients</h2>
          </div>
          {newCount > 0 && (
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full">
              {newCount}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex gap-3">
          <button className="flex-1 bg-amber-500 text-white py-3 rounded-xl">
            Toutes ({requests.length})
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200">
            Nouvelles ({newCount})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="px-6 py-6 space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            onClick={() => setSelectedRequest(request)}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-[0.98] border-2 border-transparent hover:border-amber-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">{request.clientName}</h3>
                  <p className="text-gray-600 mb-2">{request.service}</p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={14} />
                    <span>{request.date}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${
                request.status === 'new' 
                  ? 'bg-amber-100 text-amber-700'
                  : request.status === 'viewed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <p>
                  {request.status === 'new' 
                    ? 'Nouveau' 
                    : request.status === 'viewed'
                    ? 'Vu'
                    : 'Répondu'}
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWhatsApp(request.clientPhone);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCall(request.clientPhone);
                }}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Appeler
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-800 mb-2">Aucune demande</h3>
            <p className="text-gray-600">Les demandes de clients apparaîtront ici</p>
          </div>
        )}
      </div>
    </div>
  );
}