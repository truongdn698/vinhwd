# Thiệp cưới Đức Hùng & Phương Thảo — React 19 (Vite)

Bản chuyển đổi từ `MyWeddingCard` (tĩnh) sang React 19 + Vite, dùng ReactBits chính chủ.

## Phase 1 — Scaffold (hiện tại)

- Vite + React 19 + React DOM 19
- ReactBits chính chủ (bản JS + CSS, không Tailwind):
  - `src/components/FlexCarousel/` — dải ảnh WebGL (dùng cho Our Moments)
  - `src/components/FlipCard/` — thẻ lật 3D (dùng cho Save the Date)
- `src/App.jsx` là demo xác minh 2 component chạy được.

## Cài đặt & chạy (trên Mac của bạn)

```bash
cd /Users/truongdn98/XiaomiMiMoProjects/MyWeddingCard-React
npm install
npm run dev
```

Mở http://localhost:5173 — bạn sẽ thấy demo FlipCard + FlexCarousel.

> Lưu ý: agent không chạy được lệnh shell trên Mac, nên `npm install`
> cần bạn chạy tay một lần trong Terminal (hoặc terminal của VS Code).

## Phase 2 — Migrate (sắp tới)

1. Copy assets: `assets/` từ `MyWeddingCard` → `MyWeddingCard-React/public/assets`
   (giữ nguyên tên file để không phải sửa code).
2. Chuyển theme (màu olive/kem/gold, font) vào `src/index.css`.
3. Migrate từng section thành component React, thay ảnh demo bằng ảnh cưới thật.
4. Build thử: `npm run build`.
