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
  DollarSign,
  MapPin,
  Store,
  Phone,
  Save,
  Tag,
  Zap,
  PackageCheck,
  Percent,
  Sparkles,
  Layers,
  CheckSquare,
  Square,
  Grid,
  FolderPlus,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Product, Order, OrderStatus, CategoryId, StoreContact, Pack, Category } from '../types';
import { InvoiceModal } from '../components/InvoiceModal';
import { downloadProjectZip } from '../utils/projectZip';
import { INITIAL_BRANDS } from '../data/initialData';

export const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus,
    packs,
    addPack,
    updatePack,
    deletePack,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    storeContact,
    updateStoreContact 
  } = useCart();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'promotions' | 'packs' | 'orders' | 'settings'>('overview');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Store Contact Form State
  const [contactForm, setContactForm] = useState<StoreContact>(storeContact);
  const [contactSavedMessage, setContactSavedMessage] = useState(false);

  // Category Form State
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
    description: '',
    iconName: 'Box',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80'
  });

  // Quick Image Change State
  const [quickImageCat, setQuickImageCat] = useState<Category | null>(null);
  const [quickImageUrl, setQuickImageUrl] = useState('');

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: '',
      name: '',
      description: '',
      iconName: 'Box',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80'
    });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      iconName: cat.iconName || 'Box',
      image: cat.image
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: categoryForm.name,
        description: categoryForm.description,
        iconName: categoryForm.iconName,
        image: categoryForm.image
      });
    } else {
      addCategory({
        id: categoryForm.id,
        name: categoryForm.name,
        description: categoryForm.description,
        iconName: categoryForm.iconName,
        image: categoryForm.image
      });
    }
    setShowCategoryModal(false);
  };

  const handleSaveQuickImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickImageCat && quickImageUrl.trim()) {
      updateCategory({
        ...quickImageCat,
        image: quickImageUrl.trim()
      });
      setQuickImageCat(null);
      setQuickImageUrl('');
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreContact(contactForm);
    setContactSavedMessage(true);
    setTimeout(() => setContactSavedMessage(false), 3000);
  };

  // Toggle Promo status on product with 1-click
  const toggleProductPromo = (p: Product) => {
    const isNowPromo = !p.promo;
    const newOriginalPrice = isNowPromo 
      ? (p.originalPrice && p.originalPrice > p.price ? p.originalPrice : Math.round(p.price * 1.25))
      : p.price;
    const discountPercent = isNowPromo 
      ? Math.round(((newOriginalPrice - p.price) / newOriginalPrice) * 100)
      : 0;

    updateProduct({
      ...p,
      promo: isNowPromo,
      originalPrice: newOriginalPrice,
      discountPercent
    });
  };

  // Form State for Pack Create / Edit
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [showPackModal, setShowPackModal] = useState(false);
  const [packForm, setPackForm] = useState({
    name: '',
    type: 'Pack 3 produits',
    description: '',
    image: '',
    selectedProductIds: [] as string[],
    originalPrice: 15000,
    packPrice: 12000,
    badge: 'Offre Star -20%'
  });

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
    images: ['', '', '']
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
      description: 'Appareil électroménager haute qualité garanti constructeur.',
      stock: 10,
      guaranteeYears: 2,
      images: [
        'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=80',
        'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'
      ]
    });
    setShowProductModal(true);
  };

  const handleOpenAddPack = () => {
    setEditingPack(null);
    setPackForm({
      name: 'Pack Trio Équipement Maison',
      type: 'Pack 3 produits',
      description: 'Pack spécial regroupant 3 appareils électroménagers indispensables avec livraison et installation gratuites à Taourirt.',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      selectedProductIds: products.slice(0, 3).map(p => p.id),
      originalPrice: 17500,
      packPrice: 13990,
      badge: 'Offre Star -20%'
    });
    setShowPackModal(true);
  };

  const handleOpenEditPack = (pk: Pack) => {
    setEditingPack(pk);
    setPackForm({
      name: pk.name,
      type: pk.type,
      description: pk.description,
      image: pk.image,
      selectedProductIds: pk.products.map(p => p.id),
      originalPrice: pk.originalPrice,
      packPrice: pk.packPrice,
      badge: pk.badge
    });
    setShowPackModal(true);
  };

  const handleToggleProductInPack = (productId: string) => {
    setPackForm(prev => {
      const exists = prev.selectedProductIds.includes(productId);
      const updated = exists 
        ? prev.selectedProductIds.filter(id => id !== productId)
        : [...prev.selectedProductIds, productId];
      
      const count = updated.length;
      let typeName = 'Pack 2 produits';
      if (count === 3) typeName = 'Pack 3 produits';
      if (count >= 4) typeName = 'Pack 4 produits';

      return {
        ...prev,
        selectedProductIds: updated,
        type: typeName
      };
    });
  };

  const handleSavePack = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProds = products.filter(p => packForm.selectedProductIds.includes(p.id));
    const savings = Math.max(0, packForm.originalPrice - packForm.packPrice);
    const itemCount = selectedProds.length || packForm.selectedProductIds.length || 2;

    const packData = {
      name: packForm.name,
      type: packForm.type,
      itemCount,
      description: packForm.description,
      image: packForm.image || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      products: selectedProds.length > 0 ? selectedProds : products.slice(0, itemCount),
      originalPrice: Number(packForm.originalPrice),
      packPrice: Number(packForm.packPrice),
      savings,
      badge: packForm.badge
    };

    if (editingPack) {
      updatePack({ ...editingPack, ...packData });
    } else {
      addPack(packData);
    }
    setShowPackModal(false);
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
      images: [
        p.images[0] || '',
        p.images[1] || p.images[0] || '',
        p.images[2] || p.images[0] || ''
      ]
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catName = categories.find(c => c.id === productForm.categoryId)?.name || 'Électroménager';

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm w-full">
        <div>
          <span className="bg-red-600 text-white text-[10px] uppercase px-2.5 py-0.5 rounded font-black tracking-widest inline-block mb-1">
            TABLEAU DE BORD ADMINISTRATION
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ELECTRO_FENNASSA Back-Office
          </h1>
          <p className="text-xs text-slate-500">
            Gestion du magasin physique & en ligne à Taourirt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exporter CSV</span>
          </button>

          <button
            onClick={downloadProjectZip}
            className="flex-1 sm:flex-none justify-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-red-500" />
            <span>Export Code ZIP</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold gap-3 sm:gap-6 overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistiques</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'products'
              ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Produits ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'categories'
              ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4 text-red-500" />
          <span>Catégories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'promotions'
              ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Tag className="w-4 h-4 text-rose-500" />
          <span>Promos ({products.filter(p => p.promo || (p.discountPercent && p.discountPercent > 0)).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('packs')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'packs'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <PackageCheck className="w-4 h-4 text-amber-500" />
          <span>Packs ({packs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'orders'
              ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2.5 border-b-2 flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors ${
            activeTab === 'settings'
              ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Coordonnées</span>
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
                          onClick={() => toggleProductPromo(p)}
                          className={`p-1.5 rounded transition-colors ${
                            p.promo || (p.discountPercent && p.discountPercent > 0)
                              ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/50'
                              : 'text-slate-400 hover:text-rose-600'
                          }`}
                          title={p.promo ? "Désactiver Promo" : "Activer Promo"}
                        >
                          <Zap className="w-4 h-4" />
                        </button>
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

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider inline-flex items-center gap-1">
                <Grid className="w-3.5 h-3.5" /> Rayons & Catégories du Catalogue
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">Gestion des Catégories & Modification des Images</h2>
              <p className="text-xs text-orange-100 max-w-xl">
                Ajoutez de nouveaux rayons, modifiez leurs noms, descriptions et changez facilement les images de couverture affichées sur l'accueil et la boutique.
              </p>
            </div>
            <button
              onClick={handleOpenAddCategory}
              className="bg-white text-orange-600 hover:bg-orange-50 font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md whitespace-nowrap"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Ajouter une Catégorie</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-16/10 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <button
                      type="button"
                      onClick={() => {
                        setQuickImageCat(cat);
                        setQuickImageUrl(cat.image);
                      }}
                      className="absolute top-3 right-3 bg-slate-900/80 hover:bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1 shadow-md transition-colors"
                      title="Changer l'image de la catégorie"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Changer l'image</span>
                    </button>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="bg-orange-600/90 text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white inline-block mb-1">
                        ID: {cat.id}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-1">{cat.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
                      {cat.description || "Aucune description fournie pour cette catégorie."}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {count} Produit(s) actif(s)
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditCategory(cat)}
                          className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Modifier la catégorie"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Voulez-vous vraiment supprimer la catégorie "${cat.name}" ?`)) {
                              deleteCategory(cat.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Supprimer la catégorie"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Promotions Tab */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider inline-flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Offres Spéciales & Ventes Flash
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">Gestion Directe des Promotions</h2>
              <p className="text-xs text-rose-100 max-w-xl">
                Activez ou désactivez la promotion sur n'importe quel produit du catalogue en un seul clic, définissez le prix barré (Prix Rayé) et le pourcentage de réduction.
              </p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="bg-white text-rose-600 hover:bg-rose-50 font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un Produit Promo</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Produit</th>
                  <th className="p-4">Rayon</th>
                  <th className="p-4">Prix Vendu (DH)</th>
                  <th className="p-4">Prix Barré (DH)</th>
                  <th className="p-4">Réduction %</th>
                  <th className="p-4">Statut Promo</th>
                  <th className="p-4 text-right">Action 1-Clic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {products.map((p) => {
                  const isPromo = p.promo || (p.discountPercent && p.discountPercent > 0);
                  const origPrice = p.originalPrice || Math.round(p.price * 1.25);
                  const discount = p.discountPercent || Math.round(((origPrice - p.price) / origPrice) * 100);

                  return (
                    <tr key={p.id} className={`text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors ${isPromo ? 'bg-rose-50/40 dark:bg-rose-950/20' : ''}`}>
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                        <div>
                          <span className="font-bold block">{p.name}</span>
                          <span className="text-[10px] text-orange-600 font-bold uppercase">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 font-medium">{p.categoryName}</td>
                      <td className="p-4 font-mono font-black text-emerald-600 dark:text-emerald-400">{p.price.toLocaleString('fr-FR')} DH</td>
                      <td className="p-4 font-mono text-slate-400 line-through">
                        {isPromo ? `${origPrice.toLocaleString('fr-FR')} DH` : '-'}
                      </td>
                      <td className="p-4">
                        {isPromo ? (
                          <span className="bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-current" /> -{discount}%
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {isPromo ? (
                          <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                            En Promotion
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 font-medium text-[10px] px-2.5 py-1 rounded-full">
                            Prix Standard
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleProductPromo(p)}
                            className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition-all flex items-center gap-1 ${
                              isPromo 
                                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-300' 
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>{isPromo ? 'Désactiver Promo' : 'Activer Promo'}</span>
                          </button>
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-400 hover:text-orange-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            title="Modifier prix et détails"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Packs Tab */}
      {activeTab === 'packs' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider inline-flex items-center gap-1">
                <PackageCheck className="w-3.5 h-3.5" /> Packs Spéciaux Électroménager
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">Gestion des Offres Groupées & Packs</h2>
              <p className="text-xs text-amber-100 max-w-xl">
                Créez, modifiez ou supprimez les offres de packs (Ex: Réfrigérateur + Télévision + Micro-ondes, Pack Mariage, Pack Duo). Les utilisateurs peuvent commander directement ces packs sur le site.
              </p>
            </div>
            <button
              onClick={handleOpenAddPack}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un Nouveau Pack</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((pk) => (
              <div
                key={pk.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700">
                    <img src={pk.image} alt={pk.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {pk.badge}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-white/20">
                      {pk.type} ({pk.itemCount} articles)
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                      {pk.name}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 mt-1">
                      {pk.description}
                    </p>
                  </div>

                  {/* Products Included Thumbnails */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Articles Inclus dans le Pack:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {pk.products.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
                          <img src={p.images?.[0]} alt="" className="w-7 h-7 object-cover rounded-lg" />
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 max-w-[90px] truncate">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through">
                      {pk.originalPrice.toLocaleString('fr-FR')} DH
                    </div>
                    <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                      {pk.packPrice.toLocaleString('fr-FR')} <span className="text-xs">DH</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      Économie: {pk.savings.toLocaleString('fr-FR')} DH
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditPack(pk)}
                      className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 rounded-xl transition-colors"
                      title="Modifier le Pack"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePack(pk.id)}
                      className="p-2 bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors"
                      title="Supprimer le Pack"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

      {/* Settings Tab - Store Contact */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-orange-600" />
                <span>Modifier les Coordonnées de la Boutique</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ces informations apparaissent dans l'en-tête, le pied de page, les factures et la page Contact.
              </p>
            </div>

            {contactSavedMessage && (
              <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Coordonnées enregistrées !
              </span>
            )}
          </div>

          <form onSubmit={handleSaveContact} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Nom de la Boutique *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Email Officiel *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Téléphone Magasin *</label>
                <input
                  type="text"
                  required
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Numéro WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Adresse Physique *</label>
                <input
                  type="text"
                  required
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Ville *</label>
                <input
                  type="text"
                  required
                  value={contactForm.city}
                  onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Horaires d'Ouverture *</label>
              <input
                type="text"
                required
                value={contactForm.hours}
                onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Lien Google Maps</label>
              <input
                type="text"
                value={contactForm.googleMapsUrl}
                onChange={(e) => setContactForm({ ...contactForm, googleMapsUrl: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-orange-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les Coordonnées</span>
              </button>
            </div>
          </form>
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

              <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 p-3 rounded-2xl space-y-3">
                <label className="flex items-center gap-2 font-black text-slate-900 dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.promo}
                    onChange={(e) => setProductForm({ ...productForm, promo: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>Activer la Vente Flash / Offre Promotionnelle</span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Prix de Vente (DH) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-slate-800 border rounded-xl px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Prix Rayé Original (DH)</label>
                    <input
                      type="number"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      placeholder="Prix d'origine sans promo"
                      className="w-full bg-white dark:bg-slate-800 border rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
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
                    {categories.map(c => (
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
                <label className="block font-bold mb-1">Description détaillée *</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Saisissez la description complète du produit..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block font-bold">3 URLs d'Images du Produit *</label>
                
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Image 1 (Principale)</label>
                  <input
                    type="text"
                    required
                    value={productForm.images[0]}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value, productForm.images[1], productForm.images[2]] })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Image 2 (Secondaire)</label>
                  <input
                    type="text"
                    required
                    value={productForm.images[1]}
                    onChange={(e) => setProductForm({ ...productForm, images: [productForm.images[0], e.target.value, productForm.images[2]] })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Image 3 (Détail/Angle)</label>
                  <input
                    type="text"
                    required
                    value={productForm.images[2]}
                    onChange={(e) => setProductForm({ ...productForm, images: [productForm.images[0], productForm.images[1], e.target.value] })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
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

      {/* Pack Edit / Add Modal */}
      {showPackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-amber-500" />
                {editingPack ? 'Modifier le Pack Spécial' : 'Créer un Nouveau Pack Spécial'}
              </h3>
              <button
                type="button"
                onClick={() => setShowPackModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePack} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Nom du Pack *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pack Trio Réfrigérateur + Télévision + Micro-ondes"
                  value={packForm.name}
                  onChange={(e) => setPackForm({ ...packForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Type de Pack *</label>
                  <select
                    value={packForm.type}
                    onChange={(e) => setPackForm({ ...packForm, type: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  >
                    <option value="Pack 2 produits">Pack 2 produits (Duo)</option>
                    <option value="Pack 3 produits">Pack 3 produits (Trio)</option>
                    <option value="Pack 4 produits">Pack 4 produits (Familial)</option>
                    <option value="Pack Spécial Mariage">Pack Spécial Mariage</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Badge Promotionnel</label>
                  <input
                    type="text"
                    placeholder="Ex: Offre Star -20% / Pack Mariage"
                    value={packForm.badge}
                    onChange={(e) => setPackForm({ ...packForm, badge: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Prix Vendu du Pack (DH) *</label>
                  <input
                    type="number"
                    required
                    value={packForm.packPrice}
                    onChange={(e) => setPackForm({ ...packForm, packPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2 font-mono font-bold text-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Prix Rayé Original Cumulé (DH) *</label>
                  <input
                    type="number"
                    required
                    value={packForm.originalPrice}
                    onChange={(e) => setPackForm({ ...packForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image Principale du Pack (URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={packForm.image}
                  onChange={(e) => setPackForm({ ...packForm, image: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5">
                  Sélectionnez les produits du catalogue à inclure dans ce Pack ({packForm.selectedProductIds.length} sélectionnés)
                </label>
                <div className="max-h-44 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl p-2 divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900">
                  {products.map(p => {
                    const isSelected = packForm.selectedProductIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleToggleProductInPack(p.id)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-100/60 dark:bg-amber-950/60 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                          <img src={p.images[0]} alt="" className="w-7 h-7 object-cover rounded" />
                          <span>{p.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500">{p.price.toLocaleString('fr-FR')} DH</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description du Pack *</label>
                <textarea
                  required
                  rows={3}
                  value={packForm.description}
                  onChange={(e) => setPackForm({ ...packForm, description: e.target.value })}
                  placeholder="Décrivez les avantages et détails de ce pack..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPackModal(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md"
                >
                  {editingPack ? 'Mettre à jour le Pack' : 'Créer le Pack'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-orange-500" />
                {editingCategory ? 'Modifier la Catégorie' : 'Créer une Nouvelle Catégorie'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Nom de la Catégorie *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cuisinières & Gaz, Robots..."
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">ID / Slug (Optionnel)</label>
                  <input
                    type="text"
                    placeholder="Ex: cuisinieres-gaz"
                    value={categoryForm.id}
                    disabled={!!editingCategory}
                    onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Icône Représentative</label>
                <select
                  value={categoryForm.iconName}
                  onChange={(e) => setCategoryForm({ ...categoryForm, iconName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                >
                  <option value="Refrigerator font-bold">Réfrigérateur (Refrigerator)</option>
                  <option value="WashingMachine">Lave-linge (WashingMachine)</option>
                  <option value="Wind">Climatiseur / Ventilo (Wind)</option>
                  <option value="Tv">Téléviseur / Ecran (Tv)</option>
                  <option value="Flame">Four / Gaz (Flame)</option>
                  <option value="Box">Congélateur / Boîte (Box)</option>
                  <option value="Sparkles">Petit Électro / Luxe (Sparkles)</option>
                  <option value="Layers">Ameublement / Literie (Layers)</option>
                  <option value="Grid">Général (Grid)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Description du Rayon</label>
                <textarea
                  rows={2}
                  placeholder="Décrivez les équipements présents dans cette catégorie..."
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">URL de l'image de couverture *</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2"
                  />

                  {categoryForm.image && (
                    <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                      <img src={categoryForm.image} alt="Aperçu" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                        Aperçu en direct
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                      Suggestions d'images HD en 1-clic :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Réfrigérateurs', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80' },
                        { label: 'Lave-linge', url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80' },
                        { label: 'Climatisation', url: 'https://images.unsplash.com/photo-1631545806062-8e7c1f810214?w=600&q=80' },
                        { label: 'Téléviseurs', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80' },
                        { label: 'Cuisine & Fours', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80' },
                        { label: 'Petit Électro', url: 'https://images.unsplash.com/photo-1570222020535-09c310c85b73?w=600&q=80' },
                        { label: 'Ameublement', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCategoryForm({ ...categoryForm, image: item.url })}
                          className="bg-slate-100 hover:bg-orange-100 dark:bg-slate-800 dark:hover:bg-orange-950/60 text-slate-700 dark:text-slate-300 hover:text-orange-600 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          + {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-md"
                >
                  {editingCategory ? 'Enregistrer les Modifications' : 'Créer la Catégorie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Image Change Modal */}
      {quickImageCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-orange-500" />
                Changer l'image de : <span className="text-orange-600">{quickImageCat.name}</span>
              </h3>
              <button
                type="button"
                onClick={() => setQuickImageCat(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuickImage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Nouvelle URL d'Image de Couverture *</label>
                <input
                  type="text"
                  required
                  value={quickImageUrl}
                  onChange={(e) => setQuickImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2 font-mono"
                />
              </div>

              {quickImageUrl && (
                <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <img src={quickImageUrl} alt="Aperçu rapide" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2.5 py-0.5 rounded font-bold">
                    Aperçu visuel
                  </span>
                </div>
              )}

              <div>
                <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Ou choisissez une image prédéfinie HD :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Réfrigérateurs', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80' },
                    { label: 'Lave-linge', url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80' },
                    { label: 'Climatiseur', url: 'https://images.unsplash.com/photo-1631545806062-8e7c1f810214?w=600&q=80' },
                    { label: 'Téléviseur 4K', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80' },
                    { label: 'Cuisine encastrée', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80' },
                    { label: 'Petit électroménager', url: 'https://images.unsplash.com/photo-1570222020535-09c310c85b73?w=600&q=80' },
                    { label: 'Salon / Literie', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuickImageUrl(item.url)}
                      className="bg-slate-100 hover:bg-orange-100 dark:bg-slate-800 dark:hover:bg-orange-950/60 text-slate-700 dark:text-slate-300 hover:text-orange-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuickImageCat(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-md"
                >
                  Appliquer l'image
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
