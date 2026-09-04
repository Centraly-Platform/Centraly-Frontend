const fs = require('fs');

// 1. Move roundMoney to currency.ts and delete money.ts
let currencyPath = 'src/shared/utils/currency.ts';
let moneyPath = 'src/shared/utils/money.ts';

if (fs.existsSync(moneyPath)) {
    let moneyContent = fs.readFileSync(moneyPath, 'utf8');
    let roundMoneyFunc = moneyContent.match(/export function roundMoney[\s\S]*?}/);
    
    if (roundMoneyFunc) {
        let currencyContent = fs.readFileSync(currencyPath, 'utf8');
        if (!currencyContent.includes('export function roundMoney')) {
            currencyContent += '\n\n' + roundMoneyFunc[0] + '\n';
            fs.writeFileSync(currencyPath, currencyContent);
        }
    }
    fs.unlinkSync(moneyPath);
}

// 2. Update imports in components
function updateImport(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/@\/shared\/utils\/money/g, '@/shared/utils/currency');
    fs.writeFileSync(file, c);
}

updateImport('src/features/sales/utils/cartLogic.ts');
updateImport('src/features/purchases/components/purchase-invoice-form/PurchaseInvoiceSummary.tsx');

// 3. Fix SalesReturnsPage.tsx date filter
let returnsPage = 'src/features/sales/pages/SalesReturnsPage.tsx';
if (fs.existsSync(returnsPage)) {
    let c = fs.readFileSync(returnsPage, 'utf8');
    
    // Ensure imports for toUtcStartOfDayISOString, toUtcEndOfDayISOString
    if (!c.includes('toUtcStartOfDayISOString')) {
        c = "import { toUtcStartOfDayISOString, toUtcEndOfDayISOString } from '@/shared/utils/date';\n" + c;
    }
    
    // Fix the commented out date filter to pass startDate and endDate bounded to the specific dateFilter
    c = c.replace(
        /\/\/\s*date:\s*dateFilter.*?[\r\n]/g, 
        "startDate: dateFilter ? toUtcStartOfDayISOString(dateFilter) : undefined,\n      endDate: dateFilter ? toUtcEndOfDayISOString(dateFilter) : undefined,\n"
    );
    
    fs.writeFileSync(returnsPage, c);
}

console.log("Cleanup and dead filter fix applied.");
