class WixCountdownTimer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .countdown-wrapper {
                    text-align: center;
                    padding: 15px 25px;
                    border-radius: 8px;
                    background-color: rgba(0, 0, 0, 0.8);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    display: inline-block;
                }
                #headline {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #ffffff;
                    margin: 0 0 10px 0;
                    font-family: sans-serif;
                }
                #timer {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #ff5722;
                    letter-spacing: 1px;
                    font-family: monospace;
                }
            </style>
            <div class="countdown-wrapper">
                <h3 id="headline">SỰ KIỆN SẮP BẮT ĐẦU</h3>
                <div id="timer">00d 00h 00m 00s</div>
            </div>
        `;
        this.fetchConfigFromServer();
    }

    async fetchConfigFromServer() {
        const API_URL = "https://elastic-neurotic-gravitate.ngrok-free.app/api/countdown-config";
        const timerElement = this.shadowRoot.getElementById("timer");

        try {
            // Đã thêm cấu hình headers để bỏ qua trang trung gian của ngrok bản free
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': '69420'
                }
            });
            
            const configData = await response.json();
            
            const targetDateString = configData.targetDate;
            const textColor = configData.textColor;
            
            timerElement.style.color = textColor;

            const targetDate = new Date(targetDateString).getTime();
            this.startCountdownInterval(targetDate, timerElement);

        } catch (error) {
            console.error("Lỗi kết nối Backend:", error);
            timerElement.innerHTML = "Lỗi Server Node.js!";
        }
    }

    startCountdownInterval(targetDate, displayElement) {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                displayElement.innerHTML = "SỰ KIỆN ĐÃ KẾT THÚC!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            displayElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
}

customElements.define('wix-countdown-timer', WixCountdownTimer);
