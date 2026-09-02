const fs = require('fs');

function fixMojibake(c) {
    c = c.replace(/ØªØ£ÙƒÙŠØ¯ Ø­Ø°Ù  ØªØ°ÙƒØ±Ø© Ø§Ù„ØµÙŠØ§Ù†Ø© Ù†Ù‡Ø§Ø¦ÙŠØ§Ù‹ØŸ/g, "تأكيد حذف تذكرة الصيانة نهائياً؟");
    c = c.replace(/Ø­Ø°Ù  Ù†Ù‡Ø§Ø¦ÙŠ/g, "حذف نهائي");
    c = c.replace(/Ù‚Ø·Ø¹ Ø§Ù„ØºÙŠØ§Ø± Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©/g, "قطع الغيار المستخدمة");
    c = c.replace(/Ø¥Ø¶Ø§Ù Ø© Ù‚Ø·Ø¹Ø©/g, "إضافة قطعة");
    c = c.replace(/Ø­Ù Ø¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª/g, "حفظ التعديلات");
    c = c.replace(/Ø¥Ø±Ø¬Ø§Ø¹ Ø¨Ø¯ÙˆÙ† Ø¥ØµÙ„Ø§Ø­/g, "إرجاع بدون إصلاح");
    c = c.replace(/Ø¥ØºÙ„Ø§Ù‚/g, "إغلاق");
    c = c.replace(/ØªØ³Ù„ÙŠÙ…/g, "تسليم");
    c = c.replace(/Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† ØªØ³Ù„ÙŠÙ… Ø§Ù„Ø¬Ù‡Ø§Ø²ØŸ/g, "هل أنت متأكد من تسليم الجهاز؟");
    c = c.replace(/Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø¥Ø±Ø¬Ø§Ø¹ Ø§Ù„Ø¬Ù‡Ø§Ø² Ø¨Ø¯ÙˆÙ† Ø¥ØµÙ„Ø§Ø­ØŸ/g, "هل أنت متأكد من إرجاع الجهاز بدون إصلاح؟");
    c = c.replace(/ØªÙ… ØªØ³Ù„ÙŠÙ… Ø§Ù„Ø¬Ù‡Ø§Ø² Ø¨Ù†Ø¬Ø§Ø­/g, "تم تسليم الجهاز بنجاح");
    c = c.replace(/ØªÙ… Ø¥Ø±Ø¬Ø§Ø¹ Ø§Ù„Ø¬Ù‡Ø§Ø² Ø¨Ù†Ø¬Ø§Ø­/g, "تم إرجاع الجهاز بنجاح");
    c = c.replace(/Ø¥Ø¶Ø§Ù Ø© ØªØ°ÙƒØ±Ø© ØµÙŠØ§Ù†Ø©/g, "إضافة تذكرة صيانة");
    c = c.replace(/Ø­Ù Ø¸/g, "حفظ");
    c = c.replace(/Ø¥Ù„ØºØ§Ø¡/g, "إلغاء");
    return c;
}

const files = [
  'src/features/maintenance/components/MaintenanceDetailDrawer.tsx',
  'src/features/maintenance/components/MaintenanceQuickCreateDrawer.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let c = fs.readFileSync(file, 'utf8');
        c = fixMojibake(c);
        fs.writeFileSync(file, c);
    }
}
