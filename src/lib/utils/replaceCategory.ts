export default (category: string): string => {
  switch (category) {
    case "domain-driven-design":
      return "Domain-Driven Design";

    case "mongodb-sessions":
      return "MongoDB Sessions";

    case "phd":
      return "PhD in Computer Science";

    default:
      return category;
  }
}