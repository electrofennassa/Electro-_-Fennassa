import React from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle, FileText } from 'lucide-react';
import { Order } from '../types';
import { generatePDFInvoice } from '../utils/pdfInvoice';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handleDownloadPDF = () => {
    generatePDFInvoice(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 text-white font-black text-sm rounded-lg flex items-center justify-center">
                EF
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                ELECTRO_FENNASSA
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              BD la Résistance, Hay Jdid, Taourirt, Maroc | +212644543909
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              FACTURE OFFICIELLE
            </span>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">
              {order.orderNumber}
            </p>
            <p className="text-[11px] text-slate-400">
              Date: {new Date(order.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Customer & Order Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
              Informations Client
            </h4>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</p>
            <p className="text-slate-500">{order.customerEmail}</p>
            <p className="text-slate-500">{order.customerPhone}</p>
            <p className="text-slate-500">{order.address}, {order.city}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
              Détails de la Commande
            </h4>
            <p><span className="text-slate-500">Statut :</span> <span className="font-bold text-emerald-600">{order.status}</span></p>
            <p><span className="text-slate-500">Mode de paiement :</span> <span className="font-semibold">{order.paymentMethod}</span></p>
            <p><span className="text-slate-500">Garantie commerciale :</span> <span className="font-semibold text-sky-600">Inclus 1 à 5 ans</span></p>
          </div>
        </div>

        {/* Items Table */}
        <div className="py-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Article</th>
                <th className="pb-3 text-center">Qté</th>
                <th className="pb-3 text-right">Prix Unitaire</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-slate-800 dark:text-slate-200">
                  <td className="py-3 font-medium">
                    <div>{item.productName}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{item.productRef}</span>
                  </td>
                  <td className="py-3 text-center font-bold">{item.quantity}</td>
                  <td className="py-3 text-right font-mono">{item.unitPrice.toLocaleString('fr-FR')} DH</td>
                  <td className="py-3 text-right font-bold font-mono">{item.totalPrice.toLocaleString('fr-FR')} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Totals */}
        <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-200/60 dark:border-orange-900/40 flex justify-between items-center text-xs font-bold">
          <div>
            <span className="text-slate-500 block text-[11px]">Frais d'expédition</span>
            <span className="text-slate-800 dark:text-slate-200">
              {order.shippingFee === 0 ? 'Livraison gratuite (Taourirt)' : `${order.shippingFee} DH`}
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-500 block text-[11px]">Total TTC réglé</span>
            <span className="text-xl font-black text-orange-600 dark:text-orange-400">
              {order.totalAmount.toLocaleString('fr-FR')} DH
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 italic">
            Merci de votre commande chez ELECTRO_FENNASSA. Pour toute assistance: +212644543909
          </p>

          <button
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger Facture PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
