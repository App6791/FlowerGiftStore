// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // يمكن إضافة تفاعل إضافي هنا إذا لزم الأمر
});
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const address = document.getElementById('address').value;

        alert(`تم إتمام الشراء للمنتج: ${product}, الكمية: ${quantity}, العنوان: ${address}`);
    });
});
