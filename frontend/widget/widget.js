async fetchConfigFromServer() {
    const API_URL = "https://elastic-neurotic-gravitate.ngrok-free.app/api/countdown-config";
    const timerElement = this.shadowRoot.getElementById("timer");

    try {
        // THÊM THAM SỐ HEADERS VÀO ĐÂY:
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
