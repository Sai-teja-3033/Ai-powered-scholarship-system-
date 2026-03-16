let scholarships = [];

fetch("scholarships.json")
.then(res => res.json())
.then(data => scholarships = data);

function findScholarships(){

let marks = parseInt(document.getElementById("marks").value);
let income = parseInt(document.getElementById("income").value);
let category = document.getElementById("category").value;

let output = "";

scholarships.forEach(s => {

let eligible = true;
let score = 0;

/* Marks condition */
if(marks >= s.marks){
score += 40;
}else{
eligible = false;
}

/* Income condition */
if(income <= s.income){
score += 30;
}

/* Category condition */
if(category == s.category || s.category == "Any"){
score += 30;
}

/* Show scholarship if basic eligibility satisfied */
if(eligible){

output += `
<div class="scholarship">

<b>${s.name}</b><br>

Eligibility: ${s.description}<br>

Match Score: ${score}%<br>

Deadline: ${s.deadline}<br>

<a href="${s.link}" target="_blank">Apply Here</a>

</div>
`;

}

});

if(output === ""){
output = "No scholarships matched. Try entering higher marks or different category.";
}

document.getElementById("results").innerHTML = output;

}
