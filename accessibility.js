document.addEventListener('DOMContentLoaded', function() {
    // יצירת אלמנט הכפתור הצף
    const accessibilityBtn = document.createElement('div');
    accessibilityBtn.id = 'accessibility-btn';
    
    // שימוש בתמונה מהתיקייה שציינת
    accessibilityBtn.innerHTML = `
        <div style="background-color: #0A0B23; border-radius: 50% 0 0 50%; width: 55px; height: 55px; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: -2px 2px 10px rgba(0,0,0,0.3);">
            <img src="example images/accessability icon.png" alt="תפריט נגישות" style="width: 35px; height: 35px; object-fit: contain;">
        </div>
    `;

    // יצירת התפריט
    const accessibilityMenu = document.createElement('div');
    accessibilityMenu.id = 'accessibility-menu';
    accessibilityMenu.style.cssText = `
        display: none;
        position: fixed;
        top: 150px; 
        right: 20px;
        background: white;
        border: 2px solid #0A0B23;
        border-radius: 12px;
        width: 250px;
        padding: 15px;
        z-index: 9999;
        direction: rtl;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;

    accessibilityMenu.innerHTML = `
        <h3 style="margin-top:0; color:#0A0B23; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 10px; font-family: 'Heebo';">תפריט נגישות</h3>
        <ul style="list-style: none; padding: 0; font-family: 'Heebo';">
            <li style="margin-bottom: 10px;"><button onclick="toggleHighContrast()" style="width:100%; padding:10px; cursor:pointer; background:#f4f4f4; border:1px solid #ddd; border-radius:5px; font-weight:bold;">ניגודיות גבוהה</button></li>
            <li style="margin-bottom: 10px;"><button onclick="increaseFontSize()" style="width:100%; padding:10px; cursor:pointer; background:#f4f4f4; border:1px solid #ddd; border-radius:5px; font-weight:bold;">הגדלת גופן</button></li>
            <li style="margin-bottom: 10px;"><button onclick="resetAccessibility()" style="width:100%; padding:10px; cursor:pointer; background:#06c371; color:white; border:none; border-radius:5px; font-weight:bold;">איפוס הגדרות</button></li>
        </ul>
    `;

    document.body.appendChild(accessibilityBtn);
    document.body.appendChild(accessibilityMenu);

    // מיקום הכפתור בצד ימין למעלה
    accessibilityBtn.style.cssText = `
        position: fixed;
        top: 100px; 
        right: 0; 
        z-index: 10000;
    `;

    // לוגיקת פתיחה/סגירה
    accessibilityBtn.addEventListener('click', function() {
        accessibilityMenu.style.display = accessibilityMenu.style.display === 'none' ? 'block' : 'none';
    });
});

// פונקציות הנגישות
let fontSizeFactor = 1;
function increaseFontSize() {
    fontSizeFactor += 0.1;
    document.body.style.fontSize = fontSizeFactor + 'em';
}
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}
function resetAccessibility() {
    fontSizeFactor = 1;
    document.body.style.fontSize = '1em';
    document.body.classList.remove('high-contrast');
}