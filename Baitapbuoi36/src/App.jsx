import React, { useState } from 'react';
import './App.css';

const FEATURE_TAGS = [
  { id: 1, title: 'Điện thoại chơi game', icon: '🎮' },
  { id: 2, title: 'Điện thoại pin trâu', icon: '🔋' },
  { id: 3, title: 'Điện thoại 5G', icon: '📱' },
  { id: 4, title: 'Điện thoại chụp ảnh đẹp', icon: '📸' },
  { id: 5, title: 'Điện thoại gập', icon: '📐' },
  { id: 6, title: 'Điện thoại AI', icon: '🤖' },
];

const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'TECNO', 'HONOR', 'Nubia', 'Sony', 'Nokia', 'Infinix'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Samsung Galaxy Z Fold8 Ultra 5G 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-8-violet-01.jpg',
    price: '52.990.000đ',
    oldPrice: null,
    discount: null,
    isPreorder: true,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 530.000đ',
    sstudent: null,
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 4,
  },
  {
    id: 2,
    name: 'iPhone 17 Pro Max 256GB | Chính hãng',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg',
    price: '35.990.000đ',
    oldPrice: '37.990.000đ',
    discount: 'Giảm 5%',
    isPreorder: false,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 360.000đ',
    sstudent: null,
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 6 tháng',
    rating: 5,
  },
  {
    id: 3,
    name: 'Samsung Galaxy Z Fold8 5G 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-8-lavender-01.jpg',
    price: '46.990.000đ',
    oldPrice: null,
    discount: null,
    isPreorder: true,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 470.000đ',
    sstudent: null,
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 1.5,
  },
  {
    id: 4,
    name: 'Samsung Galaxy Z Flip8 5G 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-8-pink-01.jpg',
    price: '31.990.000đ',
    oldPrice: null,
    discount: null,
    isPreorder: true,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 320.000đ',
    sstudent: null,
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 3,
  },
  {
    id: 5,
    name: 'Samsung Galaxy S26 5G 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-10.jpg',
    price: '21.490.000đ',
    oldPrice: '25.990.000đ',
    discount: 'Giảm 17%',
    isPreorder: false,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 215.000đ',
    sstudent: 'S-Student giảm thêm 500.000đ',
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Samsung Galaxy Z Fold7 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-7.jpg',
    price: '40.990.000đ',
    oldPrice: '46.990.000đ',
    discount: 'Giảm 13%',
    isPreorder: false,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 410.000đ',
    sstudent: 'S-Student giảm thêm 500.000đ',
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 5,
  },
  {
    id: 7,
    name: 'Samsung Galaxy A17 5G 8GB 128GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a17-5g-back.jpg',
    price: '6.790.000đ',
    oldPrice: '7.090.000đ',
    discount: 'Giảm 4%',
    isPreorder: false,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 68.000đ',
    sstudent: 'S-Student giảm thêm 339.500đ',
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Samsung Galaxy S25 Ultra 12GB 256GB',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png',
    price: '27.650.000đ',
    oldPrice: '33.380.000đ',
    discount: 'Giảm 17%',
    isPreorder: false,
    installment: 'Trả góp 0%',
    smember: 'S-member giảm đến 277.000đ',
    sstudent: 'S-Student giảm thêm 500.000đ',
    installmentDetail: 'Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng',
    rating: 4.7,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('phone');

  return (
      <div className="container">
        <div className="main-tabs">
          <button
              className={`tab-btn ${activeTab === 'phone' ? 'active' : ''}`}
              onClick={() => setActiveTab('phone')}
          >
            ĐIỆN THOẠI
          </button>
          <button
              className={`tab-btn ${activeTab === 'tablet' ? 'active' : ''}`}
              onClick={() => setActiveTab('tablet')}
          >
            MÁY TÍNH BẢNG
          </button>
        </div>

        <div className="feature-tags-wrapper">
          <div className="feature-tags">
            {FEATURE_TAGS.map((tag) => (
                <div key={tag.id} className="feature-tag-item">
                  <span className="icon">{tag.icon}</span>
                  <span className="title">{tag.title}</span>
                </div>
            ))}
          </div>
          <button className="scroll-btn right">›</button>
        </div>

        <div className="brands-wrapper">
          <div className="brands-list">
            {BRANDS.map((brand, idx) => (
                <button key={idx} className="brand-item">
                  {brand}
                </button>
            ))}
          </div>
          <a href="#all" className="see-all">
            Xem tất cả ›
          </a>
        </div>

        <div className="product-grid">
          {PRODUCTS.map((item) => (
              <div key={item.id} className="product-card">
                {/* Badges */}
                <div className="badge-container">
                  {item.discount ? (
                      <span className="badge discount-badge">{item.discount}</span>
                  ) : (
                      <div />
                  )}
                  {item.installment && (
                      <span className="badge installment-badge">{item.installment}</span>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Title */}
                <h3 className="product-name">{item.name}</h3>

                {/* Sub-tag hàng đặt trước */}
                {item.isPreorder && <span className="preorder-tag">Hàng đặt trước</span>}

                {/* Price section */}
                <div className="price-box">
                  <span className="current-price">{item.price}</span>
                  {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                </div>

                {/* Promotion Box */}
                <div className="promo-box">
                  {item.smember && <p className="promo-smember">{item.smember}</p>}
                  {item.sstudent && <p className="promo-sstudent">{item.sstudent}</p>}
                  {item.installmentDetail && (
                      <p className="promo-installment">{item.installmentDetail}</p>
                  )}
                </div>

                {/* Bottom Actions: Rating & Wishlist */}
                <div className="card-footer">
                  <div className="rating">
                    {item.rating && (
                        <>
                          <span className="star">★</span>
                          <span className="score">{item.rating}</span>
                        </>
                    )}
                  </div>
                  <button className="heart-btn">🤍</button>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;