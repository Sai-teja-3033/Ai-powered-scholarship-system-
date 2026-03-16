const scholarships = [

{
name:"National Merit Scholarship",
marks:85,
income:500000,
category:"General",
deadline:"30 April"
},

{
name:"Minority Scholarship",
marks:60,
income:400000,
category:"Minority",
deadline:"15 May"
},

{
name:"SC/ST Government Scholarship",
marks:50,
income:600000,
category:"SC",
deadline:"20 April"
},

{
name:"OBC Education Grant",
marks:65,
income:450000,
category:"OBC",
deadline:"10 May"
}

];

function findScholarships(){

let marks = document.getElementById("marks").value;
let income = document.getElementById("income").value;
let category = document.getElementById("category").value;

let output = "";

scholarships.forEach(s => {

let score = 0;

if(marks >= s.marks)
score += 50;

if(income <= s.income)
score += 30;

if(category == s.category)
score += 20;

if(score > 0){

output += `
<div class="scholarship">
<b>${s.name}</b><br>
Match Score: ${score}%<br>
Deadline: ${s.deadline}
</div>
`;

}

});

if(output == "")
output = "No scholarships matched your profile.";

document.getElementById("results").innerHTML = output;

}
