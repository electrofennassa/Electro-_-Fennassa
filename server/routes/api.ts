import { Router, Request, Response } from 'express';
import { validateAdminCredentials, generateToken, authMiddleware, adminOnlyMiddleware } from '../auth';
import { db } from '../db';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_CONTACT } from '../../src/data/initialData';

const router = Router();

// Initialize DB if empty
const currentData = db.readData();
if (!currentData.products || currentData.products.length === 0) {
  db.writeData({
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    orders: INITIAL_ORDERS,
    storeInfo: INITIAL_CONTACT
  });
}

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'ELECTRO_FENNASSA',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Authentication endpoint
router.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }

  if (validateAdminCredentials(email, password)) {
    const user = {
      id: 'admin-1',
      name: 'Administration ELECTRO_FENNASSA',
      email: 'Electro_Fennassa@proton.me',
      role: 'admin',
      phone: '+212644543909',
      address: 'BD la Résistance, Hay Jdid, Taourirt, Maroc'
    };
    const token = generateToken(user);
    return res.json({ success: true, token, user });
  }

  return res.status(401).json({ success: false, message: 'Identifiants invalides (Email ou mot de passe incorrect).' });
});

// Products Endpoints
router.get('/products', (req: Request, res: Response) => {
  const data = db.readData();
  res.json({ success: true, count: data.products.length, data: data.products });
});

router.post('/products', adminOnlyMiddleware, (req: Request, res: Response) => {
  const data = db.readData();
  const newProduct = {
    ...req.body,
    id: `p-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
  data.products.unshift(newProduct);
  db.writeData(data);
  res.status(201).json({ success: true, data: newProduct });
});

router.put('/products/:id', adminOnlyMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.readData();
  const index = data.products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Produit non trouvé.' });
  }
  data.products[index] = { ...data.products[index], ...req.body };
  db.writeData(data);
  res.json({ success: true, data: data.products[index] });
});

router.delete('/products/:id', adminOnlyMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.readData();
  data.products = data.products.filter((p: any) => p.id !== id);
  db.writeData(data);
  res.json({ success: true, message: 'Produit supprimé avec succès.' });
});

// Categories Endpoints
router.get('/categories', (req: Request, res: Response) => {
  const data = db.readData();
  res.json({ success: true, data: data.categories });
});

// Orders Endpoints
router.get('/orders', (req: Request, res: Response) => {
  const data = db.readData();
  res.json({ success: true, count: data.orders.length, data: data.orders });
});

router.post('/orders', (req: Request, res: Response) => {
  const data = db.readData();
  const newOrder = {
    ...req.body,
    id: `ord-${Date.now()}`,
    orderNumber: `EF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'En attente',
    createdAt: new Date().toISOString()
  };
  data.orders.unshift(newOrder);
  db.writeData(data);
  res.status(201).json({ success: true, data: newOrder });
});

router.put('/orders/:id/status', adminOnlyMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const data = db.readData();
  const index = data.orders.findIndex((o: any) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Commande non trouvée.' });
  }
  data.orders[index].status = status;
  db.writeData(data);
  res.json({ success: true, data: data.orders[index] });
});

// Admin Metrics Stats
router.get('/admin/stats', adminOnlyMiddleware, (req: Request, res: Response) => {
  const data = db.readData();
  const totalRevenue = data.orders.reduce((acc: number, o: any) => acc + (o.totalAmount || 0), 0);
  const lowStockCount = data.products.filter((p: any) => p.stock <= 5).length;

  res.json({
    success: true,
    data: {
      totalSales: data.orders.length,
      totalRevenue,
      ordersCount: data.orders.length,
      productsCount: data.products.length,
      customersCount: 42,
      lowStockCount,
      pendingOrdersCount: data.orders.filter((o: any) => o.status === 'En attente').length
    }
  });
});

// CSV Export route
router.get('/export/csv', (req: Request, res: Response) => {
  const data = db.readData();
  let csv = 'ID,Nom,Référence,SKU,Prix (DH),Catégorie,Marque,Stock,Garantie\n';
  data.products.forEach((p: any) => {
    csv += `"${p.id}","${p.name.replace(/"/g, '""')}","${p.ref}","${p.sku}",${p.price},"${p.categoryName}","${p.brand}",${p.stock},${p.guaranteeYears}\n`;
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="electro_fennassa_produits.csv"');
  res.status(200).send(csv);
});

export default router;
