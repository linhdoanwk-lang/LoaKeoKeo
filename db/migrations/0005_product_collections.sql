CREATE TABLE IF NOT EXISTS product_collections (
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id BIGINT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (product_id, collection_id)
);

CREATE INDEX IF NOT EXISTS idx_product_collections_collection_id
  ON product_collections(collection_id);

INSERT INTO product_collections (product_id, collection_id)
SELECT id, collection_id
FROM products
WHERE collection_id IS NOT NULL
ON CONFLICT DO NOTHING;
