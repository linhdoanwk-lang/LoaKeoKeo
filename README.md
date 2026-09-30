# Âm Thanh Việt

Website bán loa gồm storefront, collections, blog và khu quản trị một tài khoản. Dự án chạy bằng Next.js và sẵn sàng triển khai trên Vercel.

## Dịch vụ dữ liệu

- PostgreSQL qua một integration trên Vercel Marketplace, khuyến nghị Neon.
- Vercel Blob public store cho ảnh sản phẩm.
- Tài khoản admin duy nhất được cấu hình bằng biến môi trường; không có phân quyền nhân viên.

## Chạy local

1. Sao chép `.env.example` thành `.env.local` và điền các giá trị thật.
2. Chạy `npm install`.
3. Khởi tạo bảng bằng `npm run db:init`.
4. Chạy `npm run dev` và mở `http://localhost:3000`.

## Triển khai Vercel

1. Import repository vào Vercel.
2. Thêm một PostgreSQL integration và Blob store vào project.
3. Thêm `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` trong Environment Variables.
4. Chạy `npm run db:init` với `DATABASE_URL` của database để áp dụng toàn bộ migration trong `db/migrations`.
5. Deploy. Khu quản trị nằm tại `/admin`.

Không commit `.env.local` hoặc bất kỳ mật khẩu/token nào vào source.
