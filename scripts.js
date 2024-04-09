/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index)=>{
        button.addEventListener('click', ()=>{
            const item = {
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const exisitingItem = cartItems.find(
                (cartItem)=> cartItem.name === item.name,
            );
            if (exisitingItem){
                exisitingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI() {
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count){
            cartItemCount.textContent = count;
        }

        function updateCartItemList(){
            cartItemsList.innerHTML='';
            cartItems.forEach((item, index)=>{
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML = `
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(
                    2,
                    )}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid .fa-times"</i></button>
                </span>
                `;

                cartItemsList.append(cartItem);
            });

            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button)=>{
                button.addEventListener('click', (event)=>{
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }

        function removeItemFromCart(index){
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price* removeItem.quantity;
            updateCartUI;
        }

        function updateCartTotal(){
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }

        cartIcon.addEventListener('click', ()=>{
            sidebar.classList.toggle('open');
        });

        const closeButton = document.querySelector('.sidebar-close');
        closeButton.addEventListener('click', ()=>{
            sidebar.classList.remove('open');
        });
    });
});

