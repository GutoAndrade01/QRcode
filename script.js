document.addEventListener("DOMContentLoaded", function () {
    const gerarQRCodeBtn = document.getElementById("gerarQRCode");
    const imprimirQRCodeBtn = document.getElementById("imprimirQRCode");
    const limparQRCodeBtn = document.getElementById("limparQRCode");
    const textoInput = document.getElementById("texto");
    const qrcodeDiv = document.getElementById("qrcode");
    const quantidadeQRCodeInput = document.getElementById("quantidadeQRCode");
    const quantidadeFolhasInput = document.getElementById("quantidadeFolhas");

    let qrCodes = [];
    let quantidadeQRCode = 1;
    let quantidadeFolhas = 1;

    function gerarQRCode() {
        qrCodes = [];
        qrcodeDiv.innerHTML = ""; // Limpa o conteúdo anterior

        const texto = textoInput.value;

        if (texto.trim() !== "") {
            for (let i = 0; i < quantidadeQRCode; i++) {
                const qrCodeContainer = document.createElement("div");
                qrCodeContainer.style.display = "inline-block";
                qrCodeContainer.style.marginRight = "25px"; // Espaço entre os QR Codes
                qrcodeDiv.appendChild(qrCodeContainer);

                const qrCode = new QRCode(qrCodeContainer, {
                    text: texto,
                    width: 128,
                    height: 128
                });
                qrCodes.push(qrCode);
            }
        }
    }

    function imprimirQRCode() {
        if (qrCodes.length > 0) {
            const qrCodeDataUrls = qrCodes.map(function (qrCode) {
                return qrCode._el.querySelector("img").src;
            });

            const janela = window.open('', '', 'width=600,height=600');
            janela.document.open();
            janela.document.write('<html><head><title>QR Codes</title></head><body>');

            for (let i = 0; i < quantidadeFolhas; i++) {
                for (let j = 0; j < qrCodeDataUrls.length; j++) {
                    janela.document.write('<div style="margin: 20px; display: inline-block;">');
                    janela.document.write('<img src="' + qrCodeDataUrls[j] + '" alt="QR Code">');
                    janela.document.write('</div>');
                }
            }

            janela.document.write('</body></html>');
            janela.document.close();
            janela.print();
            janela.close();
        }
    }

    function limparQRCode() {
        qrCodes = [];
        qrcodeDiv.innerHTML = ""; // Limpa o conteúdo do elemento qrcodeDiv
        textoInput.value = ""; // Limpa o valor do input
    }

    gerarQRCodeBtn.addEventListener("click", function () {
        quantidadeQRCode = parseInt(quantidadeQRCodeInput.value);
        quantidadeFolhas = parseInt(quantidadeFolhasInput.value);

        if (!quantidadeQRCode || quantidadeQRCode <= 0) {
            alert("Digite uma quantidade válida de QR Codes.");
            return;
        }

        if (!quantidadeFolhas || quantidadeFolhas <= 0) {
            alert("Digite uma quantidade válida de folhas.");
            return;
        }

        limparQRCode(); // Limpa os QR Codes anteriores antes de gerar novos
        gerarQRCode();
    });

    imprimirQRCodeBtn.addEventListener("click", function () {
        imprimirQRCode();
    });

    limparQRCodeBtn.addEventListener("click", function () {
        limparQRCode();
    });
});
