import { applyApiHeaders, getAllProducts, addProduct, updateProduct, deleteProduct } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET: Retrieve all products
    if (req.method === 'GET') {
      const { category, search } = req.query || {};
      let products = await getAllProducts();

      if (category && category !== 'All') {
        products = products.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
      }

      if (search) {
        const query = String(search).toLowerCase();
        products = products.filter((p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.makeImporter && p.makeImporter.toLowerCase().includes(query)) ||
          (p.modelNumber && p.modelNumber.toLowerCase().includes(query))
        );
      }

      return res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    }

    // POST: Create a new product
    if (req.method === 'POST') {
      const productData = req.body;
      if (!productData || !productData.name) {
        return res.status(400).json({ success: false, error: 'Product name is required' });
      }

      const created = await addProduct(productData);
      return res.status(201).json({
        success: true,
        message: 'Product created and persisted in production database',
        product: created
      });
    }

    // PUT: Update an existing product
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      const targetId = id || req.query?.id;

      if (!targetId) {
        return res.status(400).json({ success: false, error: 'Product ID is required for update' });
      }

      const updated = await updateProduct(targetId, updates);
      if (!updated) {
        return res.status(404).json({ success: false, error: `Product with ID ${targetId} not found` });
      }

      return res.status(200).json({
        success: true,
        message: 'Product updated and persisted in production database',
        product: updated
      });
    }

    // DELETE: Delete a product
    if (req.method === 'DELETE') {
      const id = req.body?.id || req.query?.id;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Product ID is required for deletion' });
      }

      const deleted = await deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: `Product with ID ${id} not found` });
      }

      return res.status(200).json({
        success: true,
        message: `Product ${id} deleted successfully from production database`
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API products] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
