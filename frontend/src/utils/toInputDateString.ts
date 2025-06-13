export function toInputDateString(date?: string | Date): string {
  if (!date) return '';
  if (typeof date === 'string') {
    // Se já está no formato yyyy-MM-dd, retorna direto
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    // Se está no formato ISO com horário, pega só a parte da data
    const match = date.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    // Se não bater, tenta criar Date normalmente
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().substring(0, 10);
  }
  // Se for Date
  return date.toISOString().substring(0, 10);
}