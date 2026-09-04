const fs = require('fs');
let content = fs.readFileSync('src/features/finance/api/FinanceApi.ts', 'utf8');

content = content.replace(
    'const { data } = await apiClient.post<SafeTransactionResponse>(/Safe//manual-transaction, null, {\n      params: reqData\n    });',
    'const { data } = await apiClient.post<SafeTransactionResponse>(/Safe//manual-transaction, reqData);'
);

fs.writeFileSync('src/features/finance/api/FinanceApi.ts', content, 'utf8');
