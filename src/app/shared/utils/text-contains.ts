// The generic type T is used to ensure that the return type is the same as the input type.
export function textContains<T extends string>(text: T, search: string) {
  return text.toLowerCase().includes(search.toLowerCase());
}
