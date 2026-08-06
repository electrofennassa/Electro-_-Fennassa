import { jsPDF } from 'jspdf';
import { Order } from '../types';

export function generatePDFInvoice(order: Order) {
  const doc = new jsPDF();

  // Header Colors & Fonts
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 40, 'F');

  // Title Store
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ELECTRO_FENNASSA', 15, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Électroménager & Ameublement - Taourirt, Maroc', 15, 30);

  doc.setFontSize(16);
  doc.text('FACTURE', 160, 25);

  // Store Contact Info
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.text('Adresse : BD la Résistance, Hay Jdid, Taourirt, Maroc', 15, 48);
  doc.text('Téléphone : +212644543909 | Email : Electro_Fennassa@proton.me', 15, 54);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, 58, 195, 58);

  // Invoice & Customer Info Box
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Facture N° : ${order.orderNumber}`, 15, 68);
  doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`, 15, 74);
  doc.text(`Statut : ${order.status}`, 15, 80);

  doc.text('CLIENT :', 120, 68);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nom : ${order.customerName}`, 120, 74);
  doc.text(`Tél : ${order.customerPhone}`, 120, 80);
  doc.text(`Adresse : ${order.address}, ${order.city}`, 120, 86);
  doc.text(`Mode de paiement : ${order.paymentMethod}`, 120, 92);

  // Table Header
  let startY = 105;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, startY, 180, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Réf / Article', 18, startY + 5.5);
  doc.text('Qté', 115, startY + 5.5);
  doc.text('Prix Unitaire (DH)', 135, startY + 5.5);
  doc.text('Total (DH)', 170, startY + 5.5);

  startY += 12;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  order.items.forEach((item) => {
    // Truncate long product names
    const shortName = item.productName.length > 48 ? item.productName.substring(0, 45) + '...' : item.productName;
    doc.text(`${item.productRef || 'EF-REF'} - ${shortName}`, 18, startY);
    doc.text(`${item.quantity}`, 118, startY);
    doc.text(`${item.unitPrice.toLocaleString('fr-FR')} DH`, 135, startY);
    doc.text(`${item.totalPrice.toLocaleString('fr-FR')} DH`, 170, startY);

    startY += 8;
  });

  // Table Bottom Line
  doc.setDrawColor(226, 232, 240);
  doc.line(15, startY, 195, startY);
  startY += 8;

  // Totals Summary Box
  doc.setFont('helvetica', 'bold');
  doc.text(`Frais de livraison : ${order.shippingFee === 0 ? 'Gratuit (Taourirt)' : order.shippingFee + ' DH'}`, 120, startY);
  startY += 6;
  
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129); // emerald-600
  doc.text(`TOTAL FACTURE : ${order.totalAmount.toLocaleString('fr-FR')} DH`, 120, startY);

  // Footer stamp
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('Merci de votre confiance chez ELECTRO_FENNASSA - Spécialiste Électroménager & Ameublement', 15, 280);

  // Save / Download PDF
  doc.save(`facture_${order.orderNumber}.pdf`);
}
