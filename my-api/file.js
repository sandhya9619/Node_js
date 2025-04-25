 const fs =require("fs");

// sync.. call
//  fs.writeFileSync('./text.txt', 'Hello world!');



// async.. call
// fs.writeFile('./text.js', 'Hello world! async', (err) => {

//   console.log('The file has been saved!');
// });



// const result =  fs.readFileSync('./text.txt', 'utf-8')
// console.log(result);

// fs.readFileSync('./text.txt', 'utf-8', (err, data) => {
// if (err) {
//   console.log(err);
// } else {
//   console.log(data);
// }
// });



// fs.appendFileSync('./text.txt', new Date().getDate().toLocaleString());
// fs.appendFileSync('./text.txt', `heyy there\n`);
