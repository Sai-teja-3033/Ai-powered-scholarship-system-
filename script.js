async function getRecommendations() {

    console.log("Button clicked");

    const marks = parseFloat(document.getElementById("marks").value);
    const income = parseFloat(document.getElementById("income").value);
    const category = document.getElementById("category").value;
    const field = document.getElementById("field").value;

    // Validation
    if (isNaN(marks) || isNaN(income)) {
        alert("Please fill all fields correctly");
        return;
    }

    try {
        const response = await fetch("scholarships.json");

        if (!response.ok) {
            throw new Error("JSON not found");
        }

        const scholarships = await response.json();

        let results = [];

        scholarships.forEach(s => {

            let score = 0;
            let reasons = [];

            // Marks check
            if (marks >= s.min_marks) {
                score += 2;
                reasons.push("✔ Marks eligible");
            } else {
                reasons.push("❌ Marks below requirement");
            }

            // Income check
            if (income <= s.max_income) {
                score += 2;
                reasons.push("✔ Income within limit");
            } else {
                reasons.push("❌ Income exceeds limit");
            }

            // Category check
            if (s.category === "Any" || s.category === category) {
                score += 1;
                reasons.push("✔ Category match");
            } else {
                reasons.push("❌ Category mismatch");
            }

            // Field check
            if (s.field === "Any" || s.field === field) {
                score += 1;
                reasons.push("✔ Field match");
            } else {
                reasons.push("❌ Field mismatch");
            }

            // Only include relevant results
            if (score >= 3) {
                results.push({ ...s, score, reasons });
            }
        });

        // Sort by highest score
        results.sort((a, b) => b.score - a.score);

        // Display results
        let html = "<h2>Recommended Scholarships</h2>";

        if (results.length === 0) {
            html += "<p>No scholarships found 😢</p>";
        } else {
            results.forEach(s => {
                html += `
                    <div class="card">
                        <h3>${s.name}</h3>
                        <p><strong>Score:</strong> ${s.score}/6</p>

                        <ul style="text-align:left;">
                            ${s.reasons.map(r => `<li>${r}</li>`).join("")}
                        </ul>

                        <a href="${s.link}" target="_blank">Apply Now</a>
                    </div>
                `;
            });
        }

        document.getElementById("results").innerHTML = html;

    } catch (error) {
        console.error("ERROR:", error);
        alert("Error loading scholarships.json");
    }
}
