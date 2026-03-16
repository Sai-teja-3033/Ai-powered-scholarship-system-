let scholarships=[];

fetch("scholarships.json")
.then(res=>res.json())
.then(data=>scholarships=data);

function findScholarships(){

let marks=document.getElementById("marks").value;
let income=document.getElementById("income").value;
let category=document.getElementById("category").value;

let output="";

scholarships.forEach(s=>{

let score=0;

if(marks>=s.marks)
score+=50;

if(income<=s.income)
score+=30;

if(category==s.category || s.category=="Any")
score+=20;

if(score>=40){

output+=`
<div class="scholarship">

<b>${s.name}</b><br>

Eligibility: ${s.description}<br>

Deadline: ${s.deadline}<br>

<a href="${s.link}" target="_blank">
Apply Here
</a>

</div>
`;

}

});

if(output=="")
output="No scholarships matched your profile.";

document.getElementById("results").innerHTML=output;

}
