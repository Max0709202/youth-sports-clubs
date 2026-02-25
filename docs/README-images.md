# Architecture & schema images

PNG diagrams are available in two places:

1. **In this project (Cursor assets)**  
   If the images were generated in this session, they are at:
   - `C:\Users\Administrator\.cursor\projects\c-git-youth-sports-clubs\assets\system-architecture.png`
   - `C:\Users\Administrator\.cursor\projects\c-git-youth-sports-clubs\assets\database-schema.png`  
   Open that folder in File Explorer and copy the PNGs here (e.g. into `docs/`) to keep them in the repo.

2. **In the chat**  
   The system architecture and database schema PNGs were also shown in the conversation above. You can right‑click each image and choose **Save image as…** to download them.

- **system-architecture.png** – Browser → Middleware (tenant resolution) → Storefront / Marketing / Dashboard → API → Supabase, Stripe, Printify/Printful → PostgreSQL.
- **database-schema.png** – ER diagram: tenants, tenant_domains, tenant_themes, catalog_templates, tenant_products, orders, carts, payments, fulfillment, webhooks.
