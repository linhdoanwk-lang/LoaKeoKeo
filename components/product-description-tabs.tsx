"use client";

import { useState } from "react";

type ProductDescriptionTabsProps = {
  descriptionHtml: string;
  collectionNames: string[];
  sku?: string;
};

export function ProductDescriptionTabs({ descriptionHtml, collectionNames, sku }: ProductDescriptionTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "details">("description");

  return (
    <section id="product-description" className="bg-[#f6f6f8] px-5 py-14 sm:py-16 lg:px-8 lg:py-20" aria-label="Thông tin sản phẩm">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex justify-center gap-3 sm:gap-8" role="tablist" aria-label="Nội dung sản phẩm">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "description"}
            aria-controls="product-description-panel"
            onClick={() => setActiveTab("description")}
            className={`min-w-32 rounded-lg px-5 py-3 text-sm font-semibold transition ${activeTab === "description" ? "border border-black bg-white text-black" : "border border-transparent text-black/50 hover:text-black"}`}
          >
            Mô tả
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "details"}
            aria-controls="product-details-panel"
            onClick={() => setActiveTab("details")}
            className={`min-w-32 rounded-lg px-5 py-3 text-sm font-semibold transition ${activeTab === "details" ? "border border-black bg-white text-black" : "border border-transparent text-black/50 hover:text-black"}`}
          >
            Thông tin thêm
          </button>
        </div>

        {activeTab === "description" ? (
          <div
            id="product-description-panel"
            role="tabpanel"
            className="mx-auto mt-8 max-w-[1390px] text-[15px] leading-7 text-black/50 sm:mt-9 [&_a]:font-medium [&_a]:text-black [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-black/80 [&_h2:first-child]:mt-0 [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-black/75 [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-black/75 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        ) : (
          <div id="product-details-panel" role="tabpanel" className="mx-auto mt-9 max-w-3xl overflow-hidden rounded-xl border border-black/10 bg-white">
            <dl className="divide-y divide-black/10 text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-5 px-5 py-4 sm:grid-cols-[180px_1fr]"><dt className="font-medium text-black/45">Danh mục</dt><dd>{collectionNames.length ? collectionNames.join(", ") : "Sản phẩm nổi bật"}</dd></div>
              {sku && <div className="grid grid-cols-[130px_1fr] gap-5 px-5 py-4 sm:grid-cols-[180px_1fr]"><dt className="font-medium text-black/45">SKU</dt><dd>{sku}</dd></div>}
              <div className="grid grid-cols-[130px_1fr] gap-5 px-5 py-4 sm:grid-cols-[180px_1fr]"><dt className="font-medium text-black/45">Giao hàng</dt><dd>Giao hàng toàn quốc, đóng gói an toàn.</dd></div>
              <div className="grid grid-cols-[130px_1fr] gap-5 px-5 py-4 sm:grid-cols-[180px_1fr]"><dt className="font-medium text-black/45">Bảo hành</dt><dd>Chính sách bảo hành minh bạch theo từng sản phẩm.</dd></div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
