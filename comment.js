let listProductHTML = document.querySelector('.listProduct'); // เลือก element ที่มี class 'listProduct' เพื่อแสดงรายการสินค้า
let listCartHTML = document.querySelector('.listCart'); // เลือก element ที่มี class 'listCart' สำหรับแสดงสินค้าในตะกร้า
let iconCart = document.querySelector('.icon-cart'); // เลือกไอคอนตะกร้าสินค้า
let iconCartSpan = document.querySelector('.icon-cart span'); // เลือก span ภายในไอคอนตะกร้า เพื่อแสดงจำนวนสินค้า
let body = document.querySelector('body'); // เลือก body ของหน้าเว็บ
let closeCart = document.querySelector('.close'); // เลือกปุ่มปิดตะกร้าสินค้า
let products = []; // สร้าง array สำหรับเก็บข้อมูลสินค้า
let cart = []; // สร้าง array สำหรับเก็บข้อมูลสินค้าในตะกร้า

// เพิ่ม event เมื่อคลิกไอคอนตะกร้า ให้แสดงหรือซ่อนตะกร้าสินค้า
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // เพิ่ม/ลบ class 'showCart' บน body
})

// เพิ่ม event เมื่อคลิกปุ่มปิดตะกร้า ให้ซ่อนตะกร้าสินค้า
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // เพิ่ม/ลบ class 'showCart' บน body
})

// ฟังก์ชันสำหรับแสดงข้อมูลสินค้าใน HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; // ลบข้อมูลสินค้าเดิมทั้งหมด

    // ตรวจสอบว่ามีสินค้าหรือไม่
    if (products.length > 0) {
        products.forEach(product => { // วนลูปแต่ละสินค้าใน array 'products'
            let newProduct = document.createElement('div'); // สร้าง div ใหม่เพื่อแสดงข้อมูลสินค้า
            newProduct.dataset.id = product.id; // กำหนด data-id ให้กับสินค้า
            newProduct.classList.add('item'); // เพิ่ม class 'item' ให้กับ div ของสินค้า
            
            // เพิ่ม event สำหรับคลิกสินค้า เพื่อไปยังหน้ารายละเอียดของสินค้านั้น
            newProduct.addEventListener('click', () => {
                window.location.href = `detail${product.id}.html`; // เปลี่ยนหน้าไปยังหน้า detail โดยใช้ id ของสินค้า
            });

            // เพิ่ม HTML ภายใน div ของสินค้า โดยรวมถึงปุ่ม "Add To Cart" สำหรับเพิ่มสินค้าลงในตะกร้า
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">฿${product.price}</div>
            <button class="addCart">Add To Cart</button>`;

            // ยกเลิกการเปลี่ยนหน้าเมื่อคลิกปุ่ม "Add To Cart"
            newProduct.querySelector('.addCart').addEventListener('click', (event) => {
                event.stopPropagation(); // หยุดการ propagation ไม่ให้ไปหน้ารายละเอียดสินค้า
                addToCart(product.id); // เรียกฟังก์ชัน addToCart เพื่อเพิ่มสินค้าลงในตะกร้า
            });

            listProductHTML.appendChild(newProduct); // เพิ่ม div ของสินค้าเข้าไปใน listProductHTML
        });
    }
}

// เพิ่ม event ให้กับ listProductHTML สำหรับตรวจจับคลิกที่ปุ่ม "Add To Cart"
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target; // ตรวจสอบตำแหน่งที่ถูกคลิก
    if(positionClick.classList.contains('addCart')){ // ถ้าเป็นปุ่ม "Add To Cart"
        let id_product = positionClick.parentElement.dataset.id; // ดึง id ของสินค้า
        addToCart(id_product); // เพิ่มสินค้าลงในตะกร้า
    }
})

// ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id); // ค้นหาตำแหน่งของสินค้าในตะกร้า
    if(cart.length <= 0){ // ถ้ายังไม่มีสินค้าในตะกร้า
        cart = [{ // เพิ่มสินค้าแรกลงในตะกร้า
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){ // ถ้าสินค้ายังไม่อยู่ในตะกร้า
        cart.push({ // เพิ่มสินค้าลงในตะกร้า
            product_id: product_id,
            quantity: 1
        });
    }else{ // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1; // เพิ่มจำนวนสินค้า
    }
    addCartToHTML(); // อัพเดตตะกร้าใน HTML
    addCartToMemory(); // เก็บข้อมูลตะกร้าใน localStorage
}

// ฟังก์ชันเก็บข้อมูลตะกร้าลงใน localStorage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart)); // แปลงข้อมูลเป็น JSON แล้วเก็บใน localStorage
}

// ฟังก์ชันแสดงรายการสินค้าจากตะกร้าใน HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = ''; // ลบข้อมูลตะกร้าสินค้าเดิม
    let totalQuantity = 0; // ตัวแปรเก็บจำนวนสินค้ารวม
    if(cart.length > 0){ // ถ้ามีสินค้าในตะกร้า
        cart.forEach(item => { // วนลูปแต่ละรายการในตะกร้า
            totalQuantity += item.quantity; // เพิ่มจำนวนสินค้ารวม
            let newItem = document.createElement('div'); // สร้าง div ใหม่สำหรับสินค้าในตะกร้า
            newItem.classList.add('item'); // เพิ่ม class 'item' ให้สินค้าในตะกร้า
            newItem.dataset.id = item.product_id; // กำหนด id ของสินค้า

            let positionProduct = products.findIndex((value) => value.id == item.product_id); // หาตำแหน่งของสินค้าจาก id
            let info = products[positionProduct]; // ดึงข้อมูลสินค้าจาก products
            listCartHTML.appendChild(newItem); // เพิ่มสินค้าในตะกร้าลงใน listCartHTML
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">฿${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity; // แสดงจำนวนสินค้ารวมในไอคอนตะกร้า
}

// เพิ่ม event ให้กับ listCartHTML เพื่อตรวจจับการคลิกปุ่ม - และ + 
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target; // ตำแหน่งที่คลิก
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){ // ถ้าคลิกที่ปุ่ม - หรือ +
        let product_id = positionClick.parentElement.parentElement.dataset.id; // ดึง id ของสินค้า
        let type = 'minus'; // กำหนดค่า type เป็น minus โดยค่าเริ่มต้น
        if(positionClick.classList.contains('plus')){ // ถ้าคลิกที่ปุ่ม +
            type = 'plus';
        }
        changeQuantityCart(product_id, type); // เรียกฟังก์ชันเปลี่ยนจำนวนสินค้าในตะกร้า
    }
})

// ฟังก์ชันเปลี่ยนจำนวนสินค้าในตะกร้า
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id); // หาตำแหน่งของสินค้าในตะกร้า
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart]; // ดึงข้อมูลสินค้าจากตะกร้า
        switch (type) {
            case 'plus': // ถ้า type เป็น 'plus'
                cart[positionItemInCart].quantity += 1; // เพิ่มจำนวนสินค้า
                break;
            default: // ถ้า type เป็น 'minus'
                let changeQuantity = cart[positionItemInCart].quantity - 1; // ลดจำนวนสินค้า
                if (changeQuantity > 0) { // ถ้าจำนวนยังมากกว่า 0
                    cart[positionItemInCart].quantity = changeQuantity;
                } else { // ถ้าจำนวนเป็น 0 หรือต่ำกว่า
                    cart.splice(positionItemInCart, 1); // ลบสินค้าจากตะกร้า
                }
                break;
        }
    }
    addCartToHTML(); // อัพเดตตะกร้าใน HTML
    addCartToMemory(); // เก็บข้อมูลตะกร้าใน localStorage
}
