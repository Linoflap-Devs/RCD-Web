
// JOHN DOE ==> John Doe
export function formattedName(name: string) {
  return name
    .toLowerCase() // convert everything to lowercase first
    .split(" ")    // split by spaces
    .map(word =>
      word
        .split(",") // handle commas in the word
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(",")
    )
    .join(" ");
}
