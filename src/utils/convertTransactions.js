export function convertTransactions(transactions) {
    // Membuat objek map untuk menyimpan data yang akan digrup
    let groupedTransactions = {};

    // Mengelompokkan transaksi berdasarkan transaction_id dan transaction_category_id
    transactions.forEach((transaction, number) => {
        const key = `${transaction.transaction_id}_${transaction.transaction_category_id}`;
        if (!groupedTransactions[key]) {
            // Inisialisasi data baru jika belum ada
            groupedTransactions[key] = {
                number: number + 1,
                transaction_id: transaction.transaction_id,
                date_paid: transaction.transaction_header.date_paid,
                transaction_category_id: transaction.transaction_category_id,
                category: transaction.category.name,
                total_value_idr: parseInt(transaction.value_idr),
                description: transaction.transaction_header.description,
                code: transaction.transaction_header.code,
                rate_euro: transaction.transaction_header.rate_euro
            };
        } else {
            // Menambahkan value_idr dari transaksi yang memiliki kunci yang sama
            groupedTransactions[key].total_value_idr += parseInt(transaction.value_idr);
        }
    });

    // Mengonversi objek map menjadi array hasil yang diinginkan
    const result = Object.values(groupedTransactions);

    return result;
}