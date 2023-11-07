// script.js
let db;

const request = indexedDB.open("KomentarDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('komentar')) {
        db.createObjectStore('komentar', { keyPath: 'id', autoIncrement: true });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    tampilkanData(); // Tampilkan data saat halaman dimuat
};

request.onerror = function() {
    console.log("Database gagal dibuka");
};

document.getElementById('data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    tambahData({
        nama: document.getElementById('nama').value,
        komentar: document.getElementById('komentar').value
    });
    this.reset();
});

function tambahData(data) {
    const transaction = db.transaction(['komentar'], 'readwrite');
    const store = transaction.objectStore('komentar');
    const request = store.add(data);

    request.onsuccess = function() {
        console.log('Data berhasil ditambahkan ke database');
        tampilkanData(); // Tampilkan data setelah menambahkan data
    };

    request.onerror = function() {
        console.error('Gagal menambahkan data ke database');
    };
}

function tampilkanData() {
    const tx = db.transaction('komentar', 'readonly');
    const store = tx.objectStore('komentar');
    const req = store.openCursor();
    const allData = [];

    req.onsuccess = function() {
        const cursor = req.result;
        if (cursor) {
            allData.push(cursor.value);
            cursor.continue();
        } else {
            let tableBody = '';
            allData.forEach(function(data, index) {
                tableBody += `
                    <tr>
                        <td><strong>${data.nama}</strong><br>${data.komentar}</td>
                    </tr>
                        
                `;
            });
            document.getElementById('data-table').getElementsByTagName('tbody')[0].innerHTML = tableBody;
        }
    };
}
