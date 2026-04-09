// 🔐 Simple Login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple dummy login
    if (username === "admin" && password === "1234") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("appBox").style.display = "block";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid login ❌";
    }
}

// 💰 Loan Check
async function checkLoan() {
    const income = document.getElementById("income").value;
    const creditScore = document.getElementById("creditScore").value;
    const loanAmount = document.getElementById("loanAmount").value;

    if (!income || !creditScore || !loanAmount) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                income: Number(income),
                creditScore: Number(creditScore),
                loanAmount: Number(loanAmount),
            }),
        });

        const data = await response.json();

        document.getElementById("result").innerText = data.result;

    } catch (error) {
        document.getElementById("result").innerText = "Server Error ❌";
    }
}