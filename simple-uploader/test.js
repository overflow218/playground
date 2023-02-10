// // Synchronous
// [1, 2, 3, 4].forEach(function (i) {
//   console.log(i);
// });

// Asynchronous
function asyncForEach(array, cb) {
  array.forEach(function () {
    setTimeout(cb, 0);
  });
}
// asyncForEach([1, 2, 3, 4], function (i) {
//   console.log(i);
// });

// setTimeout(() => console.log(1), 4);
// setTimeout(() => console.log(2), 3);
// setTimeout(() => console.log(3), 2);
// setTimeout(() => console.log(4), 1);

const main = async () => {
  //   const ho = await fetch("http://naver.com", {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });
  //   console.log("hoho");
  //   console.log(ho);
  setTimeout(() => console.log("hoho"), 0);
  console.log("1");
  console.log("2");
  console.log("3");
  console.log("4");
};

// main();
// console.log("end!!");

async function foo() {
  console.log("hi");
  return 1;
}

async function bar() {
  const result = await foo();
  console.log(result);
}

bar();
console.log("lo");
