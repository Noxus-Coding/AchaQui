
type SessaoExpiradaListener = () => void;

const listeners = new Set<SessaoExpiradaListener>();

export function observarSessaoExpirada(
  listener: SessaoExpiradaListener
): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notificarSessaoExpirada(): void {
  for (const listener of listeners) {
    listener();
  }
}
