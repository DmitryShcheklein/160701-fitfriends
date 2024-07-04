export const groupErrors = (messages: string[]): Record<string, string[]> => {
  const groups: Record<string, string[]> = {};

  messages.forEach((message) => {
    const [key] = message.split(' ', 1);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(message);
  });

  return groups;
};
