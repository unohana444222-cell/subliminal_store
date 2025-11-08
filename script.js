// بيانات المتجر
let cart = [];
let currentLanguage = 'ar';

// وظائف المودال
function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
    updateCartDisplay();
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// إدارة السلة
function addToCart(productId) {
    const products = {
        1: { name: "الحصول على الدلال", price: 20 },
        2: { name: "Babydoll Story", price: 20 },
        3: { name: "دهون البطن", price: 10 }
    };
    
    cart.push(products[productId]);
    updateCartUI();
    showNotification('تمت الإضافة إلى السلة');
}

function updateCartUI() {
    document.querySelector('.cart-count').textContent = cart.length;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>السلة فارغة</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total;
}

// وظائف الشراء
function buyNow(productId) {
    addToCart(productId);
    openCartModal();
}

function processPayment() {
    if (cart.length === 0) {
        showNotification('السلة فارغة');
        return;
    }
    
    showNotification('جاري معالجة الدفع...');
    setTimeout(() => {
        showNotification('تمت العملية بنجاح!');
        cart = [];
        updateCartUI();
        closeModal('cartModal');
    }, 2000);
}

// قائمة الرغبات
function toggleWishlist(button) {
    button.classList.toggle('active');
    button.innerHTML = button.classList.contains('active') ? 
        '✓ تم الإضافة إلى قائمة الرغبات' : 
        'إضافة إلى قائمة الرغبات';
    
    showNotification('تم تحديث قائمة الرغبات');
}

// تسجيل الدخول
function processLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('يرجى ملء جميع الحقول');
        return;
    }
    
    showNotification('جاري تسجيل الدخول...');
    setTimeout(() => {
        showNotification('تم تسجيل الدخول بنجاح!');
        closeModal('loginModal');
    }, 1500);
}

// تبديل اللغة
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    const langBtn = document.querySelector('.lang-btn');
    langBtn.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
    
    // يمكن إضافة ترجمة المحتوى هنا لاحقاً
    showNotification(currentLanguage === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English');
}

// الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-pink);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// إغلاق المودال بالنقر خارج المحتوى
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
