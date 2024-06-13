interface configRabbitMQ {
  user?: string;
  password?: string;
  host?: string;
  port?: string;
}

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}: configRabbitMQ): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
