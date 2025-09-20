export const defaultCodes: { [key: string]: string } = {
  javascript: `// JavaScript Example
function greetUser(name) {
  console.log("Hello, " + name + "!");
  return "Welcome to JavaScript!";
}

greetUser("Developer");`,

  python: `# Python Example
def greet_user(name):
    print(f"Hello, {name}!")
    return "Welcome to Python!"

greet_user("Developer")`,

  java: `// Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Developer!");
        System.out.println("Welcome to Java!");
    }
}`,

  cpp: `// C++ Example
#include <iostream>
#include <string>

int main() {
    std::string name = "Developer";
    std::cout << "Hello, " << name << "!" << std::endl;
    std::cout << "Welcome to C++!" << std::endl;
    return 0;
}`,

  go: `// Go Example
package main

import "fmt"

func main() {
    name := "Developer"
    fmt.Printf("Hello, %s!\\n", name)
    fmt.Println("Welcome to Go!")
}`,

  php: `<?php
// PHP Example
function greetUser($name) {
    echo "Hello, " . $name . "!\\n";
    return "Welcome to PHP!";
}

greetUser("Developer");
?>`,

  ruby: `# Ruby Example
def greet_user(name)
  puts "Hello, #{name}!"
  "Welcome to Ruby!"
end

greet_user("Developer")`,

  r: `# R Example
greet_user <- function(name) {
  cat("Hello,", name, "!\\n")
  return("Welcome to R!")
}

greet_user("Developer")`,
};
