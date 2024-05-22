document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let url = document.getElementById('urlInput').value;
    if (url) {
        generateQRCode(url);
    }
});

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = '';
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'none';

    let qrCodeImage = new Image();
    qrCodeImage.crossOrigin = 'Anonymous';
    qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;

    qrCodeImage.onload = function() {
        qrCodeContainer.appendChild(qrCodeImage);
        drawCanvas(qrCodeImage);
        downloadBtn.style.display = 'block';
        downloadBtn.addEventListener('click', function() {
            downloadQRCode();
        });
    };
}

function drawCanvas(img) {
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function downloadQRCode() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrCode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}