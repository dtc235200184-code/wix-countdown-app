const API_URL = "http://localhost:5000/api/countdown-config";

document.getElementById("save-btn").addEventListener("click", async () => {
    const inputDate = document.getElementById("target-date").value;
    const inputColor = document.getElementById("text-color").value;
    const statusMsg = document.getElementById("status-msg");

    if (!inputDate) {
        statusMsg.style.color = "red";
        statusMsg.innerHTML = "Vui lòng chọn ngày giờ!";
        return;
    }

    const formattedDate = inputDate.replace("T", " ") + ":00";

    const payload = {
        newDate: formattedDate,
        newTextColor: inputColor
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        statusMsg.style.color = "green";
        statusMsg.innerHTML = result.message;

    } catch (error) {
        console.error("Lỗi:", error);
        statusMsg.style.color = "red";
        statusMsg.innerHTML = "Không kết nối được Server Backend!";
    }
});