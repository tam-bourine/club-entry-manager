/* global Logger */

const greeter = (person: string) => {
  return `Hello, ${person}!`;
};

function testGreeter() {
  const user = "Panda 🐼";
  Logger.log(greeter(user));
}
