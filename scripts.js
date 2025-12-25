// HOME PAGE

// Reviews carousel
document.addEventListener("DOMContentLoaded", function() {
    // --- 1. לוגיקת קרוסלה אינסופית ---
    const progGrid = document.getElementById('productsGrid');
    const nextProgBtn = document.getElementById('nextProg');
    const prevProgBtn = document.getElementById('prevProg');

    if (nextProgBtn && progGrid) {
        nextProgBtn.addEventListener('click', () => {
            progGrid.appendChild(progGrid.firstElementChild);
        });
    }

    if (prevProgBtn && progGrid) {
        prevProgBtn.addEventListener('click', () => {
            progGrid.prepend(progGrid.lastElementChild);
        });
    }

    // --- 2. לוגיקת ביקורות ---
    const testimonials = [
        { text: "התלמידים חזרו מהסדנה עם מוטיבציה גבוהה, ביטחון עצמי וחשיבה יזמית מפותחת.", rating: 5 },
        { text: "תוכנית חינוכית מעשירה שמשלבת חינוך פיננסי עם כלים מעשיים מעולם היזמות.", rating: 4 },
        { text: "ראינו שינוי אמיתי בגישה של התלמידים לאחריות אישית וניהול כסף.", rating: 5 },
        { text: "יום ההאקתון היה חוויה לימודית יוצאת דופן ששילבה יצירתיות ועבודת צוות.", rating: 4 },
        { text: "FutureWize מחברת בין עולם הסטארטאפים לבין הכיתה בצורה נגישה ומעוררת השראה.", rating: 5 },
        { text: "הצוות מקצועי, נעים ומעורר השראה – התלמידים היו מעורבים לאורך כל הדרך.", rating: 5 }
    ];

    let startIndex = 0;
    const testGrid = document.getElementById("testimonialsGrid");

    function renderTestimonials() {
        if (!testGrid) return; 
        testGrid.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            const index = (startIndex + i) % testimonials.length;
            const t = testimonials[index];
            const card = document.createElement("div");
            card.className = "testimonial-card";
            const fullStars = "★".repeat(t.rating);
            const emptyStars = "☆".repeat(5 - t.rating);
            card.innerHTML = `
                <p>"${t.text}"</p>
                <div class="stars" style="color: #f1c40f; font-size: 22px;">${fullStars}${emptyStars}</div>
            `;
            testGrid.appendChild(card);
        }
    }
    const nextTestBtn = document.getElementById("nextBtn");
    const prevTestBtn = document.getElementById("prevBtn");
    if (nextTestBtn) nextTestBtn.addEventListener("click", () => { startIndex = (startIndex + 1) % testimonials.length; renderTestimonials(); });
    if (prevTestBtn) prevTestBtn.addEventListener("click", () => { startIndex = (startIndex - 1 + testimonials.length) % testimonials.length; renderTestimonials(); });
    renderTestimonials();
});

// LOG IN WELCOME
document.addEventListener("DOMContentLoaded", () => {

    const username = localStorage.getItem("username");

    const welcome = document.getElementById("welcomeUser");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (!welcome || !logoutBtn || !loginBtn || !registerBtn) return;

    if (username) {
        // Welcome message with permanent waving hand
        welcome.innerHTML = `שלום, ${username} <span class="wave-emoji">👋</span>`;
        welcome.style.display = "inline-block";

        logoutBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
    } else {
        welcome.style.display = "none";
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
    }
});

// LOG OUT
function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}


// PRODUCTS PAGE

document.addEventListener("DOMContentLoaded", function() {
    
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const cardContent = card.querySelector(".card-content");
        const originalHTML = cardContent.innerHTML;
        const infoHTML = (cardContent.dataset.info || "").replaceAll("\n", "<br>");
        const programName = cardContent.dataset.name || "תוכנית";
        let isExpanded = false;

        cardContent.addEventListener("click", function(e) {
            if (!e.target.classList.contains("more-info-btn")) return;
            e.preventDefault();

            if (!isExpanded) {
                // תוכן מורחב
                cardContent.innerHTML = `
                    <div class="info-scroll">
                        <p style="text-align:right;">${infoHTML}</p>
                    </div>
                    <div class="card-actions" style="margin-top:10px; display:flex; gap:10px; justify-content:center;">
                        <button class="more-info-btn" type="button">חזרה</button>
                        <button class="add-to-cart-btn" type="button" data-name="${programName}">הוסף לעגלה</button>
                    </div>
                `;

                // חיבור אירוע לכפתור "הוסף לעגלה"
                const addBtn = cardContent.querySelector(".add-to-cart-btn");
                addBtn.addEventListener("click", (ev) => {
                    ev.stopPropagation(); // לא להרחיב את הכרטיס במקרה של לחיצה
                    addToCart(programName);
                });

                isExpanded = true;

            } else {
                cardContent.innerHTML = originalHTML;
                isExpanded = false;
            }
        });

    });

    // פונקציית הוספה לסל
    function addToCart(name) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(name);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`התוכנית "${name}" נוספה לעגלה בהצלחה!`);
    }

    // --- פילטרים ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            productCards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

});




// GALLERY PAGE
document.addEventListener("DOMContentLoaded", () => {
    const imagePaths = [
        "images/image1.jpeg",
        "images/image2.jpeg",
        "images/image3.jpeg",
        "images/image4.jpeg",
        "images/image5.jpeg",
        "images/image6.jpeg"
    ];

    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    let currentIndex = 0;

    // פונקציה ליצירת תמונה בגלריה
    function createImage(src, alt) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.classList.add("carousel-img");
        return img;
    }

    // טוען את כל התמונות
    imagePaths.forEach((path, i) => {
        const img = createImage(path, `תמונה ${i + 1}`);
        if (i === 0) img.classList.add("active"); // התמונה הראשונה פעילה
        carousel.appendChild(img);
    });

    const slides = carousel.querySelectorAll("img");

    // פונקציה להצגת תמונה לפי אינדקס
    function showSlide(index) {
        slides.forEach(img => img.classList.remove("active"));
        slides[index].classList.add("active");
    }

    // מאזינים לכפתורים
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });
});



// CONTACT PAGE

    // --- ולידציות טופס צור קשר ---
    const contactForm = document.getElementById("contactForm");
if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const charCounter = document.getElementById("charCounter");
    const fileStatusContainer = document.getElementById("file-status-container");

    // מונה תווים להודעה
    messageInput.setAttribute("maxlength", "500");
    messageInput.addEventListener("input", () => {
        const currentLength = messageInput.value.length;
        charCounter.textContent = `${currentLength}/500`;
        charCounter.style.color = currentLength >= 480 ? "red" : "#666";
    });

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // תמיד מונע שליחה אוטומטית

        let isValid = true;
        let errors = [];

        // בדיקת שם
        if (!/^[a-zA-Zא-ת\s]+$/.test(nameInput.value)) {
            isValid = false;
            errors.push("השם המלא חייב להיות מורכב מאותיות בלבד.");
        }

        // בדיקת אימייל
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            errors.push("אנא הזן כתובת אימייל תקינה המכילה '@' (לדוגמה: name@gmail.com)");
        }

        // בדיקת טלפון
        if (phoneInput.value && !/^0\d{9}$/.test(phoneInput.value)) {
            isValid = false;
            errors.push("מספר הטלפון חייב להתחיל ב-0 ולהכיל 10 ספרות בלבד.");
        }

        if (!isValid) {
            alert("חלו שגיאות במילוי הטופס:\n\n• " + errors.join("\n• "));
            return;
        }

        // אם הכל תקין
        alert(`תודה ${nameInput.value}, פנייתך התקבלה בהצלחה!`);
        contactForm.reset();
        charCounter.textContent = "0/500";
        fileStatusContainer.style.display = "none";
    });
}


// CART PAGE

document.addEventListener("DOMContentLoaded", function() {

    const cartItemsEl = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");

    const prices = {
        "סדנת יזמות – כיתתית": 2000,
        "סדנת חינוך פיננסי – כיתתית": 2000,
        "סדנת יזמות – שכבתית": 6000,
        "סדנת חינוך פיננסי – שכבתית": 6000,
        "תחרות חדשנות / האקתון": 10000
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let selectedItems = [...cart];

    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = "<p class='empty-cart'>העגלה ריקה</p>";
            totalPriceEl.textContent = "₪0";
            return;
        }

        cart.forEach((item, index) => {
            const price = prices[item] || 0;
            const isChecked = selectedItems.includes(item);
            if (isChecked) total += price;

            cartItemsEl.innerHTML += `
                <div class="cart-row">
                    <input type="checkbox" ${isChecked ? "checked" : ""} onchange="toggleItem('${item}')">
                    <span class="cart-item-name">${item}</span>
                    <span class="cart-price">₪${price.toLocaleString()}</span>
                    <button class="remove-btn" onclick="removeItem(${index})">✕</button>
                </div>
            `;
        });

        totalPriceEl.textContent = `₪${total.toLocaleString()}`;
    }

    window.toggleItem = function(item) {
        if (selectedItems.includes(item)) {
            selectedItems = selectedItems.filter(i => i !== item);
        } else {
            selectedItems.push(item);
        }
        renderCart();
    }

    window.removeItem = function(index) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        selectedItems = selectedItems.filter(i => i !== removedItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.contactRepresentative = function() {
        if (selectedItems.length === 0) {
            alert("לא נבחרו תכניות לפנייה");
            return;
        }

        let message = `שלום,\n\nאני מעוניין/ת לקבל פרטים ולתאם תשלום עבור התכניות הבאות:\n\n`;
        let total = 0;

        selectedItems.forEach(item => {
            const price = prices[item] || 0;
            total += price;
            message += `- ${item} (₪${price.toLocaleString()})\n`;
        });

        message += `\nסה״כ משוער: ₪${total.toLocaleString()}\n\nתודה!`;

        window.location.href = `mailto:info@futurewize.co.il?subject=פנייה להזמנת סדנאות&body=${encodeURIComponent(message)}`;
    }

    renderCart();

});



// REGISTER PAGE

// Validates user input in registration form
document.getElementById("registerForm").addEventListener("submit", function (event) {

  // Prevent default form submission behavior
  event.preventDefault();

  // Retrieve input elements
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  // Clear any previous validation error messages
  [fullname, email, phone, password, password2].forEach(input => {
    input.setCustomValidity("");
  });

  // Full name can only contain letters & spaces
  const nameRegex = /^[\p{L} ]+$/u;
    if (!nameRegex.test(fullname.value)) {
        fullname.setCustomValidity("שדה זה יכול להכיל רק אותיות ורווחים");
        fullname.reportValidity();
        return;
    }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    email.setCustomValidity("אנא הזן כתובת אימייל תקינה (לדוגמה: name@gmail.com)");
    email.reportValidity();
    return;
  }

 
  // Phone number validation: must start with 0 and contain 10 digits
  const phoneRegex = /^0\d{9}$/;

  if (!phoneRegex.test(phone.value)) {
    phone.setCustomValidity(
      "מספר טלפון חייב להתחיל ב-0 ולהכיל 10 ספרות בלבד"
    );
    phone.reportValidity();
    return;
  }


  // Ensure password and confirmation match
  if (password.value !== password2.value) {
    password2.setCustomValidity("הסיסמאות אינן תואמות");
    password2.reportValidity();
    return;
  }

 
  // Save username locally and redirect to homepage
  alert("ההרשמה בוצעה בהצלחה!");
  localStorage.setItem("username", fullname.value);
  window.location.href = "index.html";
});

