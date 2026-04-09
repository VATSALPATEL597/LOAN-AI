const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Serve frontend
app.use(express.static(__dirname));

const HF_API_KEY = "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"; // optional

app.post("/predict", async (req, res) => {
    const { income, creditScore, loanAmount } = req.body;

    try {
        // (Optional API call - ignore if not needed)
        await axios.post(
            "https://api-inference.huggingface.co/models/distilbert-base-uncased",
            { inputs: "Loan approval check" },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
            }
        );

        // 🔥 MAIN LOGIC (IMPORTANT)
        let result = "Rejected ❌";

        if (creditScore >= 650 && income >= loanAmount * 2) {
            result = "Approved ✅";
        }

        res.json({ result });

    } catch (error) {
        res.json({ result: "Approved ✅" }); // fallback
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});