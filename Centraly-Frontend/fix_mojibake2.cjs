const fs = require('fs');
let c = fs.readFileSync('src/features/maintenance/pages/MaintenancePage.tsx', 'utf8');

c = c.replace(/Ø¨Ø­Ø« Ø¨Ø§Ø³Ù… Ø§Ù„Ø¹Ù…ÙŠÙ„ Ø£Ùˆ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ .../g, "بحث باسم العميل أو رقم الهاتف...");
c = c.replace(/Ø§Ù„ÙƒÙ„/g, "الكل");
c = c.replace(/Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±/g, "قيد الانتظار");
c = c.replace(/ØªÙ… Ø§Ù„ØªØ³Ù„ÙŠÙ…/g, "تم التسليم");
c = c.replace(/Ù…Ø±ØªØ¬Ø¹/g, "مرتجع");

fs.writeFileSync('src/features/maintenance/pages/MaintenancePage.tsx', c);
