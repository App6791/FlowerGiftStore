document.addEventListener('DOMContentLoaded', function() {
    const currencySelector = document.getElementById('currency');
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const contactForm = document.getElementById('contact-form');
    let cart = [];

    const prices = {
        'flower1': { 'SAR': 50, 'USD': 13.33, 'EUR': 11.22 },
        'flower2': { 'SAR': 45, 'USD': 12.00, 'EUR': 10.10 },
        'gift1': { 'SAR': 70, 'USD': 18.67, 'EUR': 15.73 },
        'gift2': { 'SAR': 60, 'USD': 16.00, 'EUR': 13.47 }
    };

    function updatePrices(currency) {
        products.forEach(product => {
            const productId = product.getAttribute('data-id');
            const price = prices[productId][currency];
            product.querySelector('.price').textContent = `السعر: ${price} ${currency}`;
        });
    }

    function addToCart(productId, quantity = 1) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity });
        }
        displayCart();
    }

    function displayCart() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                const productElement = document.createElement('div');
                productElement.className = 'cart-item';
                productElement.innerHTML = `
                    <p>${item.id} - الكمية: ${item.quantity}</p>
                    <button class="remove-btn" data-id="${item.id}">إزالة</button>
                `;
                cartItemsContainer.appendChild(productElement);
            });
        }
    }

    currencySelector.addEventListener('change', (e) => {
        updatePrices(e.target.value);
    });

    products.forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.getAttribute('data-id');
            addToCart(productId);
        });
    });

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const productId = e.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== productId);
                displayCart();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            emailjs.send("service_p9mje9a", "template_hgl2hlr", data)
                .then(response => {
                    alert('تم إرسال الرسالة بنجاح!');
                    contactForm.reset();
                })
                .catch(error => {
                    alert('حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
                    console.error('EmailJS Error:', error);
                });
        });
    }

    updatePrices(currencySelector.value);
});
