// Initialize saved expenses and user name from localStorage
let savedExpenses = JSON.parse(localStorage.getItem('savedExpenses')) || {};
let userName = localStorage.getItem('userName') || '';
let receivedMoney = JSON.parse(localStorage.getItem('receivedMoney')) || {};

// Language translations
const translations = {
    en: {
        title: "Monthly Billing Calculator",
        mainTitle: "Monthly Billing Calculator",
        userNameLabel: "User Name:",
        userNamePlaceholder: "Enter your name",
        saveName: "Save Name",
        changeName: "Change Name",
        monthLabel: "Select Month:",
        receivedMoneyTitle: "Money Received from Head Office",
        previousBalanceLabel: "Previous Month's Balance:",
        dateLabel: "Date:",
        amountLabel: "Amount:",
        addReceived: "Add Received Money",
        expensesTitle: "Daily Bills",
        routeLabel: "Description:",
        routePlaceholder: "Enter description",
        expenseAmount: "Amount:",
        addExpense: "Add Bill",
        totalReceived: "Total Received:",
        totalExpenses: "Total Bills:",
        currentBalance: "Current Balance:",
        exportExcel: "Export to Excel",
        exportPDF: "Export to PDF",
        noData: "No data to export for this month!",
        deleteConfirm: "Are you sure you want to delete this entry?",
        receivedFromHO: "Received from Head Office",
        dailyTotal: "Daily Total",
        balanceSummary: "Balance Summary",
        previousBalance: "Previous Month Balance",
        totalReceivedMonth: "Total Received this Month",
        totalReceivedWithBalance: "Total Received (with Previous Balance)",
        finalBalance: "Final Balance",
        addEntry: "+ Add Entry",
        lunchBill: "+ Lunch Bill",
        mobileBill: "+ Mobile Bill",
        houseRentBill: "+ House Rent Bill",
        otherBill: "+ Other",
        copyright: "\u00A9 2025 Fazly Rabbi"
    },
    bn: {
        title: "মাসিক বিলিং ক্যালকুলেটর",
        mainTitle: "মাসিক বিলিং ক্যালকুলেটর",
        userNameLabel: "ব্যবহারকারীর নাম:",
        userNamePlaceholder: "আপনার নাম লিখুন",
        saveName: "নাম সংরক্ষণ করুন",
        changeName: "নাম পরিবর্তন করুন",
        monthLabel: "মাস নির্বাচন করুন:",
        receivedMoneyTitle: "হেড অফিস থেকে প্রাপ্ত অর্থ",
        previousBalanceLabel: "পূর্ববর্তী মাসের ব্যালেন্স:",
        dateLabel: "তারিখ:",
        amountLabel: "টাকার পরিমাণ:",
        addReceived: "প্রাপ্ত অর্থ যোগ করুন",
        expensesTitle: "দৈনিক বিল",
        routeLabel: "বিবরণ:",
        routePlaceholder: "বিবরণ লিখুন",
        expenseAmount: "টাকার পরিমাণ:",
        addExpense: "বিল যোগ করুন",
        totalReceived: "মোট প্রাপ্ত:",
        totalExpenses: "মোট বিল:",
        currentBalance: "বর্তমান ব্যালেন্স:",
        exportExcel: "এক্সেল এ রপ্তানি করুন",
        exportPDF: "পিডিএফ এ রপ্তানি করুন",
        noData: "এই মাসের জন্য কোন তথ্য নেই!",
        deleteConfirm: "আপনি কি এই এন্ট্রি মুছে ফেলতে চান?",
        receivedFromHO: "হেড অফিস থেকে প্রাপ্ত",
        dailyTotal: "দৈনিক মোট",
        balanceSummary: "ব্যালেন্স সারসংক্ষেপ",
        previousBalance: "পূর্ববর্তী মাসের ব্যালেন্স",
        totalReceivedMonth: "এই মাসে মোট প্রাপ্ত",
        totalReceivedWithBalance: "মোট প্রাপ্ত (পূর্ববর্তী ব্যালেন্স সহ)",
        finalBalance: "চূড়ান্ত ব্যালেন্স",
        addEntry: "+ এন্ট্রি যোগ করুন",
        lunchBill: "+ দুপুরের খাবার বিল",
        mobileBill: "+ মোবাইল বিল",
        houseRentBill: "+ বাড়ি ভাড়া বিল",
        otherBill: "+ অন্যান্য",
        copyright: "\u00A9 ২০২৫ ফজলে রাব্বী"
    }
};

let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // Update all text content
    updatePageText();
}

function updatePageText() {
    const t = translations[currentLang];
    
    // Update page title and main heading
    document.title = t.title;
    document.querySelector('.main-title').textContent = t.mainTitle;
    
    // Update month selector
    document.querySelector('.month-label').textContent = t.monthLabel;
    
    // Update static text
    document.querySelector('label[for="userName"]').textContent = t.userNameLabel;
    document.getElementById('userName').placeholder = t.userNamePlaceholder;
    document.querySelector('.save-name-btn').textContent = userName ? t.changeName : t.saveName;
    
    // Update copyright
    document.querySelector('.copyright').textContent = t.copyright;
    
    // Money Received section
    document.querySelector('.received-funds h2').textContent = t.receivedMoneyTitle;
    document.querySelector('label[for="receivedDate"]').textContent = t.dateLabel;
    document.querySelector('label[for="receivedAmount"]').textContent = t.amountLabel;
    document.querySelector('label[for="previousBalance"]').textContent = t.previousBalanceLabel;
    document.querySelector('.add-received').textContent = t.addReceived;
    document.querySelector('.add-previous').textContent = t.previousBalanceLabel;
    
    // Expenses section
    document.querySelector('.expenses h2').textContent = t.expensesTitle;
    document.querySelector('label[for="date"]').textContent = t.dateLabel;
    document.querySelector('label[for="route"]').textContent = t.routeLabel;
    document.getElementById('route').placeholder = t.routePlaceholder;
    document.querySelector('label[for="amount"]').textContent = t.amountLabel;
    document.querySelector('.add-expense').textContent = t.addExpense;
    
    // Summary section
    document.querySelector('.total-received-label').textContent = t.totalReceived;
    document.querySelector('.total-expenses-label').textContent = t.totalExpenses;
    document.querySelector('.current-balance-label').textContent = t.currentBalance;
    
    // Export buttons
    document.querySelector('.excel-btn').textContent = t.exportExcel;
    document.querySelector('.pdf-btn').textContent = t.exportPDF;
    
    // Update dynamic content
    updateMonthlyView();
}

// Set up initial state
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const monthInput = document.getElementById('monthYear');
    monthInput.value = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    monthInput.addEventListener('change', updateMonthlyView);
    
    const dateInput = document.getElementById('date');
    dateInput.value = today.toISOString().split('T')[0];
    dateInput.min = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-01`;
    dateInput.max = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    // Set saved user name if exists
    const userNameInput = document.getElementById('userName');
    if (userName) {
        userNameInput.value = userName;
        userNameInput.disabled = true;
        document.querySelector('.save-name-btn').textContent = translations[currentLang].changeName;
    }

    updateMonthlyView();
    changeLanguage('en'); // Set default language
});

function addNewEntry() {
    const entriesDiv = document.getElementById('expenseEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'expense-entry';
    newEntry.innerHTML = `
        <div class="expense-item">
            <label for="route">${translations[currentLang].routeLabel}</label>
            <input type="text" class="route" placeholder="${translations[currentLang].routePlaceholder}">
            <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}">
            <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
        </div>
    `;
    entriesDiv.appendChild(newEntry);
    updateTotal();
}

function addLunchBill() {
    const entriesDiv = document.getElementById('expenseEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'expense-entry';
    newEntry.innerHTML = `
        <div class="expense-item">
            <label for="route">${translations[currentLang].routeLabel}</label>
            <input type="text" class="route" value="Lunch" readonly>
            <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}" value="200">
            <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
        </div>
    `;
    entriesDiv.appendChild(newEntry);
    updateTotal();
}

function addMobileBill() {
    const entriesDiv = document.getElementById('expenseEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'expense-entry';
    newEntry.innerHTML = `
        <div class="expense-item">
            <label for="route">${translations[currentLang].routeLabel}</label>
            <input type="text" class="route" value="Mobile Bill" readonly>
            <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}">
            <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
        </div>
    `;
    entriesDiv.appendChild(newEntry);
    updateTotal();
}

function addRentBill() {
    const entriesDiv = document.getElementById('expenseEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'expense-entry';
    newEntry.innerHTML = `
        <div class="expense-item">
            <label for="route">${translations[currentLang].routeLabel}</label>
            <input type="text" class="route" value="House Rent Bill" readonly>
            <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}">
            <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
        </div>
    `;
    entriesDiv.appendChild(newEntry);
    updateTotal();
}

function addOtherBill() {
    const entriesDiv = document.getElementById('expenseEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'expense-entry';
    newEntry.innerHTML = `
        <div class="expense-item">
            <label for="route">${translations[currentLang].routeLabel}</label>
            <input type="text" class="route" placeholder="${translations[currentLang].routePlaceholder}">
            <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}">
            <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
        </div>
    `;
    entriesDiv.appendChild(newEntry);
    updateTotal();
}

function removeEntry(button) {
    button.closest('.expense-entry').remove();
    updateTotal();
}

function updateTotal() {
    const amounts = Array.from(document.querySelectorAll('.amount'))
        .map(input => parseFloat(input.value) || 0);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function getCurrentMonth() {
    return document.getElementById('monthYear').value;
}

function addReceivedMoney() {
    const date = document.getElementById('receivedDate').value;
    const amount = parseFloat(document.getElementById('receivedAmount').value);
    const selectedMonth = getCurrentMonth();

    if (!date || isNaN(amount) || amount <= 0) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    if (date.substring(0, 7) !== selectedMonth) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    if (!receivedMoney[selectedMonth]) {
        receivedMoney[selectedMonth] = [];
    }

    receivedMoney[selectedMonth].push({
        date: date,
        amount: amount
    });

    localStorage.setItem('receivedMoney', JSON.stringify(receivedMoney));
    document.getElementById('receivedAmount').value = '';
    updateMonthlyView();
}

function addPreviousBalance() {
    const balance = parseFloat(document.getElementById('previousBalance').value);
    const selectedMonth = getCurrentMonth();
    
    if (!balance || isNaN(balance)) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    // Get first day of the selected month
    const [year, month] = selectedMonth.split('-');
    const firstDay = `${selectedMonth}-01`;

    if (!receivedMoney[selectedMonth]) {
        receivedMoney[selectedMonth] = [];
    }

    // Add previous balance as first entry of the month
    receivedMoney[selectedMonth].unshift({
        date: firstDay,
        amount: balance,
        isPreviousBalance: true // Flag to identify this as previous balance
    });

    // Save to localStorage
    localStorage.setItem('receivedMoney', JSON.stringify(receivedMoney));
    
    // Clear input
    document.getElementById('previousBalance').value = '';
    
    // Update display
    updateMonthlyView();
}

function updateReceivedMoneyHistory() {
    const selectedMonth = getCurrentMonth();
    const monthData = receivedMoney[selectedMonth] || [];
    const historyDiv = document.getElementById('receivedHistory');
    
    historyDiv.innerHTML = '';
    
    monthData.sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'received-item';
            if (item.isPreviousBalance) {
                itemDiv.className += ' previous-balance-item';
            }
            itemDiv.innerHTML = `
                <div class="received-details">
                    <span class="received-date">${item.isPreviousBalance ? translations[currentLang].previousBalance : new Date(item.date).toLocaleDateString()}</span>
                    <span class="received-amount">৳${item.amount.toFixed(2)}</span>
                </div>
                <button onclick="deleteReceivedMoney(${index})" class="delete-received">×</button>
            `;
            historyDiv.appendChild(itemDiv);
        });

    updateBalanceSummary();
}

function deleteReceivedMoney(index) {
    if (!confirm(translations[currentLang].deleteConfirm)) {
        return;
    }

    const selectedMonth = getCurrentMonth();
    if (receivedMoney[selectedMonth]) {
        receivedMoney[selectedMonth].splice(index, 1);
        if (receivedMoney[selectedMonth].length === 0) {
            delete receivedMoney[selectedMonth];
        }
        localStorage.setItem('receivedMoney', JSON.stringify(receivedMoney));
        updateMonthlyView();
    }
}

function updateBalanceSummary() {
    const selectedMonth = getCurrentMonth();
    
    // Calculate total received
    const totalReceived = (receivedMoney[selectedMonth] || [])
        .reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate total expenses
    const monthData = savedExpenses[selectedMonth] || {};
    const totalExpenses = Object.values(monthData)
        .reduce((sum, day) => sum + day.total, 0);
    
    // Calculate balance
    const balance = totalReceived - totalExpenses;
    
    // Update display
    document.getElementById('totalReceived').textContent = `৳${totalReceived.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `৳${totalExpenses.toFixed(2)}`;
    document.getElementById('currentBalance').textContent = `৳${balance.toFixed(2)}`;
    
    // Add color coding for balance
    const balanceElement = document.getElementById('currentBalance');
    if (balance < 0) {
        balanceElement.className = 'negative-balance';
    } else if (balance > 0) {
        balanceElement.className = 'positive-balance';
    } else {
        balanceElement.className = '';
    }
}

function saveDaily() {
    const date = document.getElementById('date').value;
    const selectedMonth = getCurrentMonth();
    
    if (!date) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    if (date.substring(0, 7) !== selectedMonth) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    const expenses = Array.from(document.querySelectorAll('.expense-entry')).map(entry => ({
        route: entry.querySelector('.route').value,
        amount: parseFloat(entry.querySelector('.amount').value) || 0
    }));

    if (!savedExpenses[selectedMonth]) {
        savedExpenses[selectedMonth] = {};
    }

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    savedExpenses[selectedMonth][date] = {
        expenses: expenses,
        total: total
    };

    localStorage.setItem('savedExpenses', JSON.stringify(savedExpenses));
    updateMonthlyView();
    clearForm();
    alert(translations[currentLang].deleteConfirm);
}

function clearForm() {
    document.getElementById('expenseEntries').innerHTML = `
        <div class="expense-entry">
            <div class="expense-item">
                <label for="route">${translations[currentLang].routeLabel}</label>
                <input type="text" class="route" placeholder="${translations[currentLang].routePlaceholder}">
                <input type="number" class="amount" placeholder="${translations[currentLang].expenseAmount}">
                <button type="button" class="remove-entry" onclick="removeEntry(this)">×</button>
            </div>
        </div>
    `;
    updateTotal();
}

function updateMonthlyView() {
    const selectedMonth = getCurrentMonth();
    const monthData = savedExpenses[selectedMonth] || {};
    const savedEntriesDiv = document.querySelector('.saved-entries');
    savedEntriesDiv.innerHTML = '';

    // Update monthly stats
    const totalDays = Object.keys(monthData).length;
    const monthlyTotal = Object.values(monthData).reduce((sum, day) => sum + day.total, 0);
    
    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('monthlyTotal').textContent = `৳${monthlyTotal.toFixed(2)}`;

    // Update daily entries
    Object.entries(monthData)
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .forEach(([date, data]) => {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'saved-day';
            dateDiv.innerHTML = `
                <div class="day-header">
                    <h3>${new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</h3>
                    <button onclick="deleteDay('${date}')" class="delete-day">Delete</button>
                </div>
                <div class="saved-routes">
                    ${data.expenses.map(exp => `
                        <div class="saved-route">
                            <span>${exp.route}</span>
                            <span>৳${exp.amount}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="saved-total">Total: ৳${data.total}</div>
            `;
            savedEntriesDiv.appendChild(dateDiv);
        });

    // Update date input constraints
    const dateInput = document.getElementById('date');
    const [year, month] = selectedMonth.split('-');
    dateInput.min = `${selectedMonth}-01`;
    dateInput.max = new Date(year, month, 0).toISOString().split('T')[0];

    updateReceivedMoneyHistory();
}

function deleteDay(date) {
    if (confirm(translations[currentLang].deleteConfirm)) {
        const selectedMonth = getCurrentMonth();
        if (savedExpenses[selectedMonth]) {
            delete savedExpenses[selectedMonth][date];
            if (Object.keys(savedExpenses[selectedMonth]).length === 0) {
                delete savedExpenses[selectedMonth];
            }
            localStorage.setItem('savedExpenses', JSON.stringify(savedExpenses));
            updateMonthlyView();
        }
    }
}

function clearMonth() {
    const selectedMonth = getCurrentMonth();
    if (confirm(`${translations[currentLang].deleteConfirm} ${selectedMonth}? ${translations[currentLang].deleteConfirm}`)) {
        delete savedExpenses[selectedMonth];
        localStorage.setItem('savedExpenses', JSON.stringify(savedExpenses));
        updateMonthlyView();
        clearForm();
    }
}

function saveUserName() {
    const userNameInput = document.getElementById('userName');
    const saveButton = document.querySelector('.save-name-btn');
    
    if (userNameInput.disabled) {
        // Enable editing
        userNameInput.disabled = false;
        saveButton.textContent = translations[currentLang].saveName;
        return;
    }

    const name = userNameInput.value.trim();
    if (!name) {
        alert(translations[currentLang].deleteConfirm);
        return;
    }

    userName = name;
    localStorage.setItem('userName', userName);
    userNameInput.disabled = true;
    saveButton.textContent = translations[currentLang].changeName;
    alert(translations[currentLang].deleteConfirm);
}

function exportToExcel() {
    const selectedMonth = getCurrentMonth();
    const monthData = savedExpenses[selectedMonth];
    const monthlyReceived = receivedMoney[selectedMonth] || [];
    
    if (!monthData && !monthlyReceived.length) {
        alert(translations[currentLang].noData);
        return;
    }

    const wsData = [
        [translations[currentLang].userNameLabel, userName],
        [translations[currentLang].monthLabel, new Date(selectedMonth + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })],
        [''],
        [translations[currentLang].receivedMoneyTitle],
    ];

    // Add previous balance if exists
    const previousBalance = monthlyReceived.find(item => item.isPreviousBalance);
    if (previousBalance) {
        wsData.push([translations[currentLang].previousBalanceLabel, previousBalance.amount]);
        wsData.push(['']);
    }

    // Add received money entries
    wsData.push([translations[currentLang].dateLabel, translations[currentLang].amountLabel]);
    monthlyReceived
        .filter(item => !item.isPreviousBalance) // Exclude previous balance as it's already shown
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(item => {
            wsData.push([
                new Date(item.date).toLocaleDateString(),
                item.amount
            ]);
        });

    // Add total received
    const totalReceived = monthlyReceived.reduce((sum, item) => sum + item.amount, 0);
    wsData.push(['', translations[currentLang].totalReceived, totalReceived]);
    wsData.push(['', '', '']);

    // Add expenses
    wsData.push([translations[currentLang].expensesTitle]);
    wsData.push([translations[currentLang].dateLabel, translations[currentLang].routeLabel, translations[currentLang].expenseAmount]);

    if (monthData) {
        Object.entries(monthData)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .forEach(([date, data]) => {
                data.expenses.forEach(exp => {
                    wsData.push([
                        new Date(date).toLocaleDateString(),
                        exp.route,
                        exp.amount
                    ]);
                });
                wsData.push(['', translations[currentLang].dailyTotal, data.total]);
                wsData.push(['', '', '']);
            });

        // Add monthly summary
        const monthlyTotal = Object.values(monthData).reduce((sum, day) => sum + day.total, 0);
        wsData.push([translations[currentLang].balanceSummary]);
        wsData.push([translations[currentLang].totalReceivedMonth, totalReceived - (previousBalance ? previousBalance.amount : 0)]);
        wsData.push([translations[currentLang].totalReceivedWithBalance, totalReceived]);
        wsData.push([translations[currentLang].totalExpenses, monthlyTotal]);
        wsData.push([translations[currentLang].finalBalance, totalReceived - monthlyTotal]);
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Monthly Expenses');

    // Export to Excel file
    const fileName = `${userName}_Travel_Expenses_${selectedMonth}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

function exportToPDF() {
    const selectedMonth = getCurrentMonth();
    const monthData = savedExpenses[selectedMonth];
    const monthlyReceived = receivedMoney[selectedMonth] || [];
    
    if (!monthData && !monthlyReceived.length) {
        alert(translations[currentLang].noData);
        return;
    }

    // Create PDF content
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.backgroundColor = 'white';
    document.body.appendChild(element);

    // Get current date and time
    const now = new Date();
    const exportDateTime = now.toLocaleString();

    let content = `
        <h2 style="text-align: center; color: #2c3e50;">${translations[currentLang].userNameLabel} ${userName}</h2>
        <div style="margin: 10px 0; text-align: center;">
            <p><strong>${translations[currentLang].monthLabel}:</strong> ${new Date(selectedMonth + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            <p><strong>${translations[currentLang].exportDateTime}:</strong> ${exportDateTime}</p>
        </div>
        <hr>
    `;

    // Add received money section
    content += `<h3 style="color: #2c3e50; margin-top: 20px;">${translations[currentLang].receivedMoneyTitle}</h3>`;
    
    // Add previous balance if exists
    const previousBalance = monthlyReceived.find(item => item.isPreviousBalance);
    if (previousBalance) {
        content += `
            <div style="background-color: #f8f9fa; padding: 10px; margin: 10px 0;">
                <strong>${translations[currentLang].previousBalanceLabel}:</strong> ৳${previousBalance.amount.toFixed(2)}
            </div>
        `;
    }

    // Add received money table
    content += `
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${translations[currentLang].dateLabel}</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${translations[currentLang].amountLabel}</th>
            </tr>
    `;

    monthlyReceived
        .filter(item => !item.isPreviousBalance)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(item => {
            content += `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${new Date(item.date).toLocaleDateString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">৳${item.amount.toFixed(2)}</td>
                </tr>
            `;
        });

    const totalReceived = monthlyReceived.reduce((sum, item) => sum + item.amount, 0);
    content += `
        <tr style="background-color: #f5f5f5;">
            <td colspan="1" style="border: 1px solid #ddd; padding: 8px;"><strong>${translations[currentLang].totalReceived}:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>৳${totalReceived.toFixed(2)}</strong></td>
        </tr>
        </table>
        <hr style="margin: 20px 0;">
    `;

    // Add expenses section
    if (monthData) {
        content += `<h3 style="color: #2c3e50;">${translations[currentLang].expensesTitle}</h3>`;
        content += `
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                <tr style="background-color: #f5f5f5;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${translations[currentLang].dateLabel}</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${translations[currentLang].routeLabel}</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${translations[currentLang].expenseAmount}</th>
                </tr>
        `;

        Object.entries(monthData)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .forEach(([date, data]) => {
                data.expenses.forEach(exp => {
                    content += `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${new Date(date).toLocaleDateString()}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${exp.route}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">৳${exp.amount.toFixed(2)}</td>
                        </tr>
                    `;
                });
                content += `
                    <tr style="background-color: #f9f9f9;">
                        <td colspan="2" style="border: 1px solid #ddd; padding: 8px;">${translations[currentLang].dailyTotal}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">৳${data.total.toFixed(2)}</td>
                    </tr>
                `;
            });

        const monthlyTotal = Object.values(monthData).reduce((sum, day) => sum + day.total, 0);
        content += `
            <tr style="background-color: #f5f5f5;">
                <td colspan="2" style="border: 1px solid #ddd; padding: 8px;"><strong>${translations[currentLang].totalExpenses}:</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>৳${monthlyTotal.toFixed(2)}</strong></td>
            </tr>
            </table>
            <hr style="margin: 20px 0;">
        `;

        // Add summary section
        content += `
            <h3 style="color: #2c3e50;">${translations[currentLang].balanceSummary}</h3>
            <div style="margin: 10px 0; padding: 10px; background-color: #f8f9fa;">
                ${previousBalance ? `<p><strong>${translations[currentLang].previousBalanceLabel}:</strong> ৳${previousBalance.amount.toFixed(2)}</p>` : ''}
                <p><strong>${translations[currentLang].totalReceivedMonth}:</strong> ৳${(totalReceived - (previousBalance ? previousBalance.amount : 0)).toFixed(2)}</p>
                <p><strong>${translations[currentLang].totalReceivedWithBalance}:</strong> ৳${totalReceived.toFixed(2)}</p>
                <p><strong>${translations[currentLang].totalExpenses}:</strong> ৳${monthlyTotal.toFixed(2)}</p>
                <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <strong>${translations[currentLang].finalBalance}:</strong> ৳${(totalReceived - monthlyTotal).toFixed(2)}
                </p>
            </div>
        `;
    }

    element.innerHTML = content;

    // PDF options
    const opt = {
        margin: 10,
        filename: `${userName}_Travel_Expenses_${selectedMonth}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().from(element).set(opt).save().then(() => {
        document.body.removeChild(element);
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateMonthlyView();
    document.querySelectorAll('.amount').forEach(input => {
        input.addEventListener('input', updateTotal);
    });
});

// Add export buttons to the UI
document.addEventListener('DOMContentLoaded', () => {
    const exportDiv = document.createElement('div');
    exportDiv.className = 'export-buttons';
    exportDiv.innerHTML = `
        <button onclick="exportToExcel()" class="export-btn excel-btn">${translations[currentLang].exportExcel}</button>
        <button onclick="exportToPDF()" class="export-btn pdf-btn">${translations[currentLang].exportPDF}</button>
    `;
    document.querySelector('.container').appendChild(exportDiv);
});

// Add event listeners for language buttons
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        changeLanguage(lang);
        
        // Update active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Add subtle animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});
