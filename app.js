/*
Loop methods for data

const students = [
    {name:"Ali", marks:85},
    {name:"Sara", marks:92},
    {name:"Ahmed", marks:45},
    {name:"Hamza", marks:67}
];

//for...of → Print all names.
console.log("--- for...of ---");
for (const student of students) {
    console.log(student.name);
}

// forEach() → Print Name - Marks.
console.log("\n--- forEach() ---");
students.forEach(student => {
    console.log(`${student.name} : ${student.marks}`);
})

// map() → Create an array of names.
console.log("\n--- map() ---");
let newArray = students.map(student => student.name)
console.log(newArray.join(" ,"))

// filter() → Students with marks ≥ 50.
console.log("\n--- filter() ---");
const pass  = students.filter(student => student.marks>=50)
console.log(pass);

// find() → First student with marks > 90.
console.log("\n--- find() ---");
const toper = students.find(toper => toper.marks>90)
console.log(toper)

// findIndex() → Index of "Ahmed".
console.log("\n--- findIndex() ---");
var index = students.findIndex(index => index.name=="Ahmed")
console.log(index)

// reduce() → Calculate the total marks.
console.log("\n--- reduce() ---");
var marks = students.map(student=>student.marks)
var sum = marks.reduce((acc,curr)=>{
    return acc+curr;
})
console.log(`Total marks: ${sum}`)
*/