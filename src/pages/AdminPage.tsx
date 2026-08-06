import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle,
  FileText,
  Search,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Product, Order, OrderStatus, CategoryId } from '../types';
import { InvoiceModal } from '../components/InvoiceModal';
import { downloadProjectZip } from '../utils/projectZip';
import { INITIAL_CATEGORIES, INITIAL_BRANDS } from '../data/initialData';

export const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus } = useCart();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Form State for Product Create / Edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    ref: '',
    sku: '',
    price: 0,
    originalPrice: 0,
    promo: false,
    categoryId: 'refrigerateurs' as CategoryId,
    brand: 'Samsung',
    description: '',
    stock: 10,
    guaranteeYears: 2,
    images: ['', '']
  });

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 text-rose-600 rounded-full mx-auto flex items-center justify-center font-bold text-2xl">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accès Réservé Administrateur</h2>
        <p className="text-xs text-slate-500">
          Veuillez vous connecter avec les identifiants Admin (<span className="font-bold">Electro_Fennassa@proton.me / Nour@1969</span>).
        </p>
      </div>
    );
  }

  // Calculated Stats Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      ref: `REF-${Math.floor(100 + Math.random() * 900)}`,
      sku: `EF-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: 2500,
      originalPrice: 2900,
      promo: false,
      categoryId: 'refrigerateurs',
      brand: 'Samsung',
      description: 'Description de qualité pour le magasin.',
      stock: 10,
      guaranteeYears: 2,
      images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80']
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      ref: p.ref,
      sku: p.sku,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      promo: p.promo,
      categoryId: p.categoryId,
      brand: p.brand,
      description: p.description,
      stock: p.stock,
      guaranteeYears: p.guaranteeYears,
      images: p.images.length >= 2 ? [p.images[0], p.images[1]] : [p.images[0] || '', '']
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catName = INITIAL_CATEGORIES.find(c => c.id === productForm.categoryId)?.name || 'Électroménager';

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: productForm.name,
        ref: productForm.ref,
        sku: productForm.sku,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        promo: productForm.promo,
        categoryId: productForm.categoryId,
        categoryName: catName,
        brand: productForm.brand,
        description: productForm.description,
        stock: Number(productForm.stock),
        guaranteeYears: Number(productForm.guaranteeYears),
        images: productForm.images.filter(Boolean)
      });
    } else {
      addProduct({
        name: productForm.name,
        ref: productForm.ref,
        sku: productForm.sku,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        promo: productForm.promo,
        categoryId: productForm.categoryId,
        categoryName: catName,
        brand: productForm.brand,
        description: productForm.description,
        stock: Number(productForm.stock),
        guaranteeYears: Number(productForm.guaranteeYears),
        availability: Number(productForm.stock) > 0 ? 'En Stock' : 'Rupture',
        images: productForm.images.filter(Boolean)
      });
    }

    setShowProductModal(false);
  };

  const handleExportCSV = () => {
    window.location.href = '/api/export/csv';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div>
          <span className="bg-orange-600 text-white text-[10px] uppercase px-2.5 py-0.5 rounded font-black tracking-widest inline-block mb-1">
            TABLEAU DE BORD ADMINISTRATION
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            ELECTRO_FENNASSA Back-Office
          </h1>
          <p className="text-xs text-slate-500">
            Gestion du magasin physique & en ligne à Taourirt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exporter CSV</span>
          </button>

          <button
            onClick={downloadProjectZip}
            className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-orange-500" />
            <span>Export Code ZIP</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistiques & Aperçu</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'products'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Produits ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Commandes ({orders.length})</span>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Chiffre d'Affaires</span>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {totalRevenue.toLocaleString('fr-FR')} <span className="text-xs font-bold text-slate-400">DH</span>
              </div>
              <span className="text-[10px] text-slate-400">Total ventes enregistrées</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Commandes</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {orders.length}
              </div>
              <span className="text-[10px] text-emerald-500 font-bold">Paiement à la livraison majoritaire</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Catalogue Produits</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {products.length}
              </div>
              <span className="text-[10px] text-slate-400">13 Rayons spécialisés</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Alerte Stock Faible</span>
              <div className="text-2xl font-black text-rose-600">
                {lowStockProducts.length}
              </div>
              <span className="text-[10px] text-rose-500 font-bold">Stock ≤ 5 unités</span>
            </div>
          </div>

          {/* Graphical Trends Section */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700 pb-3">
              Performance des Ventes & Répartition par Rayon
            </h3>

            {/* SVG Bar Chart Visualization */}
            <div className="h-48 flex items-end gap-4 pt-6 pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex-1 bg-orange-100 dark:bg-orange-950/50 rounded-xl h-[45%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-orange-600">Lun</span>
              </div>
              <div className="flex-1 bg-orange-200 dark:bg-orange-950/70 rounded-xl h-[65%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-orange-600">Mar</span>
              </div>
              <div className="flex-1 bg-orange-300 dark:bg-orange-900/60 rounded-xl h-[85%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-orange-600">Mer</span>
              </div>
              <div className="flex-1 bg-orange-400 dark:bg-orange-800/80 rounded-xl h-[55%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-white">Jeu</span>
              </div>
              <div className="flex-1 bg-orange-600 rounded-xl h-[100%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-white">Ven</span>
              </div>
              <div className="flex-1 bg-orange-500 rounded-xl h-[75%] flex flex-col justify-end p-2 text-center">
                <span className="text-[10px] font-bold text-white">Sam</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Gestion du Catalogue Produits
            </h2>
            <button
              onClick={handleOpenAddProduct}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Produit</th>
                  <th className="p-4">Réf / SKU</th>
                  <th className="p-4">Prix (DH)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Rayon</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {products.map((p) => (
                  <tr key={p.id} className="text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <span className="font-bold block">{p.name}</span>
                        <span className="text-[10px] text-orange-600 font-bold uppercase">{p.brand}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      <div>{p.ref}</div>
                      <div className="text-[9px]">{p.sku}</div>
                    </td>
                    <td className="p-4 font-mono font-bold">{p.price.toLocaleString('fr-FR')} DH</td>
                    <td className="p-4 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${p.stock <= 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {p.stock} un.
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{p.categoryName}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 text-slate-500 hover:text-orange-600 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Gestion des Commandes Clients
          </h2>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm block">
                      N° Commande: {ord.orderNumber}
                    </span>
                    <span className="text-slate-500">
                      Client: {ord.customerName} ({ord.customerPhone}) • {ord.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <option value="En attente">En attente</option>
                      <option value="Confirmée">Confirmée</option>
                      <option value="En cours d'expédition">En cours d'expédition</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </select>

                    <button
                      onClick={() => setSelectedInvoiceOrder(ord)}
                      className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-orange-500" />
                      <span>Facture PDF</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {it.productName} (x{it.quantity})</span>
                      <span className="font-mono font-bold">{it.totalPrice.toLocaleString('fr-FR')} DH</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Nom du Produit *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Prix (DH) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Prix Rayé (Promo) DH</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Rayon / Catégorie</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value as CategoryId })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  >
                    {INITIAL_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Marque</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  >
                    {INITIAL_BRANDS.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Stock disponible</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Garantie (Années)</label>
                  <input
                    type="number"
                    value={productForm.guaranteeYears}
                    onChange={(e) => setProductForm({ ...productForm, guaranteeYears: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">URL Image Principale (Unsplash/HTTP)</label>
                <input
                  type="text"
                  value={productForm.images[0]}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value, productForm.images[1]] })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
    </div>
  );
};
