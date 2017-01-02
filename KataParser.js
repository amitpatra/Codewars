/**
 * Created by Joshua Baert on 12/22/2016.
 */


const _ = {
	cleanStr(str) {
		str = str.replace(/\n\s*\./g, `.`)
			.replace(/\n/g, ` `)
			.replace(/\s+/g, ` `);
		return str
	},
	
	cleanSQL(str) {
		str = this.cleanStr(str);
		str = str.replace(/"/gi, `'`)
			.replace(/'/gi, `''`);
		return str
	},
	
	cleanDesc(str) {
		str = str.replace(/\n/g, '\\n')
			.replace(/'/gi, `''`);
		return str
	},
	
	testObjectify(arr) {
		let rtn = [];
		arr.forEach((ele, i) => {
			let temp = {
				test: this.cleanSQL(ele)
			};
			rtn.push(temp);
		});
		return JSON.stringify(rtn)
	},
	
	JSON(obj) {
		return JSON.stringify(obj)
	}
	
};

// Paste the languages into the array
let languages = [
	`JavaScript`,
	`CoffeeScript`,
	`Crystal`,
	`Python`,
	`Ruby`
];
// Paste the tags into the array
let tags = [
	`FUNDAMENTALS`,
	`STRINGS`,
];

// Paste the Test Suite here
let tests = [
	`
Test.describe("generateRange(2, 10, 2)", function() {
  Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);
});

Test.describe("generateRange(1, 10, 3)", function() {
  Test.assertSimilar(generateRange(1, 10, 3), [1,4,7,10]);
});

Test.describe("generateRange(1, 10, 1)", function() {
  Test.assertSimilar(generateRange(1, 10, 1), [1,2,3,4,5,6,7,8,9,10]);
});

Test.describe("generateRange(1, 10, 4)", function() {
  Test.assertSimilar(generateRange(1, 10, 4), [1,5,9]);
});

Test.describe("generateRange(1, 10, 5)", function() {
  Test.assertSimilar(generateRange(1, 10, 5), [1,6]);
});

Test.describe("generateRange for random", function() {
  var generateRandom = function(min, max){
    return Math.floor(Math.random() * max) + min;
  };
  
  var range = function(min, max, step){
    var z = [];
    for(var i = min; i <= max; i += step){
      z.push(i);
    }
    return z;
  };
  
  for(var i = 0; i < 10; i++){
    var randomMax = generateRandom(30, 100),
        randomMin = generateRandom(1, 20),
        randomStep = generateRandom(1, 10);
  
    Test.assertSimilar(generateRange(randomMin, randomMax, randomStep), range(randomMin, randomMax, randomStep));
    }
});
	
`,

];


// Paste the example script here
let examples = [
	`Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);`,
	`Test.assertSimilar(generateRange(1, 10, 1), [1,2,3,4,5,6,7,8,9,10]);`,
];

// Introduction to the Kata Here
let description =
	`Modify the kebabize function so that it converts a camel case string into a kebab case.

kebabize('camelsHaveThreeHumps') // camels-have-three-humps
kebabize('camelsHave3Humps') // camels-have-humps
Notes:

the returned string should only contain lowercase letters
`;
// Paste the starting script here
let startScript = `function generateRange(min, max, step){}`;


// Paste your winning script here
let winScript = `
function kebabize(str) {
  return str.replace(/[^a-z]/ig, '').
         replace(/^[A-Z]/, c => c.toLowerCase()).
         replace(/[A-Z]/g, c => \`-\${c.toLowerCase()}\`);
}

`;


// When this js file is ran you will get an output in your console of all the info in a format
// ready to go into the Sql DB Start files to then copy into those tables
console.log('\nTags');
console.log(_.JSON(tags));
console.log('\nLanguages');
console.log(_.JSON(languages));
console.log('\nWinning Script');
console.log(_.cleanStr(winScript));
console.log('\n\nStarter');
console.log(_.cleanStr(startScript));
console.log('\nDescription');
console.log(_.cleanDesc(description));
console.log('\n\n\nExampes');
console.log(_.testObjectify(examples));
console.log('\nTests');
console.log(_.testObjectify(tests));